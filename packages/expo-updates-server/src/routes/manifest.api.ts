import { json } from "@hattip/response";
import type { RequestContext } from "rakkasjs";

// https://github.com/expo/custom-expo-updates-server/blob/a20aa7b45698b2c5c43b994983e7252038eb0afd/expo-updates-server/pages/api/manifest.ts

export async function get(ctx: RequestContext) {
  if (ctx.request.headers.get("expo-expect-signature") !== null) {
    return json(
      { message: `"expo-expect-signature" not supported` },
      { status: 400 }
    );
  }

  const platform = ctx.request.headers.get("expo-platform");
  if (platform !== "android") {
    return json(
      { message: `"expo-platform = ${platform}" not supported` },
      { status: 400 }
    );
  }

  const runtimeVersion = ctx.request.headers.get("expo-runtime-version");
  if (!runtimeVersion) {
    return json(
      { message: `"expo-runtime-version" is required` },
      { status: 400 }
    );
  }

  const manifest = getManifest(runtimeVersion, platform);
  if (!manifest) {
    return json(
      {
        message:
          `manifest not found for ` +
          JSON.stringify({ runtimeVersion, platform }),
      },
      { status: 404 }
    );
  }

  return new Response(manifest, {
    headers: {
      "content-type": "application/json",
      "expo-protocol-version": "0",
      "expo-sfv-version": "0",
    },
  });
}

// https://vitejs.dev/guide/features.html#glob-import
const MANIFESTS = import.meta.glob("../manifests/*.json", {
  eager: true,
  as: "raw",
});

function getManifest(
  runtimeVersion: string,
  platform: string
): string | undefined {
  return MANIFESTS[`../manifests/${runtimeVersion}-${platform}.json`];
}
