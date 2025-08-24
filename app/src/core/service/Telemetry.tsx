import { FeatureFlags } from "@/core/service/FeatureFlags";
import { getDeviceId } from "@/utils/otherApi";
import { fetch } from "@tauri-apps/plugin-http";
import { Settings } from "./Settings";

export namespace Telemetry {
  let deviceId = "";

  export async function event(event: string, data: any = {}) {
    if (!FeatureFlags.TELEMETRY) return;
    if (!Settings.telemetry) return;
    if (!deviceId) {
      deviceId = await getDeviceId();
    }
    try {
      await fetch(import.meta.env.LR_API_BASE_URL + "/api/telemetry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event,
          user: deviceId,
          data,
        }),
      });
    } catch (e) {
      console.warn(e);
    }
  }
}
