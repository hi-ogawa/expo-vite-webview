import assert from "assert";
import fs from "fs";
import path from "path";
import undici from "undici";
import { z } from "zod";

// schema of metadata.json generated by `expo export`
// https://github.com/expo/expo/blob/3e798f65625c2269bdf4baf620426c20fa28545a/packages/@expo/cli/src/export/createMetadataJson.ts

const FILE_METADATA_SCHEMA = z.object({
  bundle: z.string(),
  assets: z.array(
    z.object({
      path: z.string(),
      ext: z.string(),
    })
  ),
});

const EXPORT_METADATA_SCHEMA = z.object({
  version: z.number().refine((v) => v === 0),
  bundler: z.string().refine((v) => v === "metro"),
  fileMetadata: z.object({
    android: FILE_METADATA_SCHEMA,
    ios: FILE_METADATA_SCHEMA.optional(),
  }),
});

// https://docs.expo.dev/technical-specs/expo-updates-0/

type Manifest = {
  id: string;
  createdAt: string;
  runtimeVersion: string;
  launchAsset: Asset;
  assets: Asset[];
  metadata: { [key: string]: string };
  extra: { [key: string]: any };
};

type Asset = {
  hash?: string;
  key: string;
  contentType: string;
  fileExtension?: string;
  url: string;
};

//
// main
//

async function main() {
  const [exportDir, runtimeVersion] = process.argv.slice(2);
  assert.ok(exportDir);
  assert.ok(runtimeVersion);

  //
  // parse metadata.json
  //

  const metadataPath = path.join(exportDir, "metadata.json");
  assert.ok(exportDir && fs.existsSync(metadataPath));

  const metadataRaw = await fs.promises.readFile(metadataPath, "utf-8");
  const metadata = EXPORT_METADATA_SCHEMA.parse(JSON.parse(metadataRaw));
  const fileStat = await fs.promises.stat(metadataPath);

  //
  // convert manifest.json for each platform
  //
  const createdAt = fileStat.birthtime.toISOString();
  const createdAtEscaped = createdAt.slice(0, 19).replaceAll(/\W/g, "-");
  const tag = `expo-updates--${runtimeVersion}--${createdAtEscaped}`;
  const baseUrl = `https://rawcdn.githack.com/hi-ogawa/expo-vite-webview/${tag}/packages/expo/release`;

  for (const [platform, fileMetadata] of Object.entries(
    metadata.fileMetadata
  )) {
    if (!fileMetadata) {
      continue;
    }
    const { bundle, assets } = fileMetadata;

    const manifest: Manifest = {
      id: `manifest--${runtimeVersion}--${platform}--${createdAt}`,
      createdAt,
      runtimeVersion,
      metadata: {},
      extra: {},
      launchAsset: {
        key: bundle,
        url: `${baseUrl}/${bundle}`,
        contentType: "application/javascript",
      },
      assets: [],
    };

    for (const asset of assets) {
      manifest.assets.push({
        key: asset.path,
        url: `${baseUrl}/${asset.path}`,
        contentType: await extensionToContentType(asset.ext),
        fileExtension: "." + asset.ext,
      });
    }

    const manifestPath = path.join(
      __dirname,
      `../manifests/${runtimeVersion}-${platform}.json`
    );
    const manifestRaw = JSON.stringify(manifest, null, 2) + "\n";
    await fs.promises.writeFile(manifestPath, manifestRaw);
  }
}

async function extensionToContentType(extension: string): Promise<string> {
  // https://github.com/hi-ogawa/mime-types
  const url = `https://cdn.jsdelivr.net/gh/hi-ogawa/mime-types/extensions/${extension}`;
  const res = await undici.fetch(url);
  assert.ok(res.ok);
  return (await res.text()).trim();
}

if (require.main === module) {
  main();
}