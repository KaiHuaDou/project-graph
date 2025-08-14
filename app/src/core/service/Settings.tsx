import { LazyStore } from "@tauri-apps/plugin-store";
import { useEffect, useState } from "react";
import z from "zod";

export const settingsSchema = z.object({
  language: z.union([z.literal("en"), z.literal("zh_CN"), z.literal("zh_TW")]).default("zh_CN"),
  isClassroomMode: z.boolean().default(false),
  windowBackgroundAlpha: z.number().min(0).max(1).default(0.9),
  isRenderCenterPointer: z.boolean().default(false),
  showBackgroundHorizontalLines: z.boolean().default(true),
  showBackgroundVerticalLines: z.boolean().default(true),
  showBackgroundDots: z.boolean().default(false),
  showBackgroundCartesian: z.boolean().default(true),
  enableTagTextNodesBigDisplay: z.boolean().default(true),
  showTextNodeBorder: z.boolean().default(true),
  lineStyle: z.union([z.literal("straight"), z.literal("bezier"), z.literal("vertical")]).default("straight"),
  sectionBitTitleRenderType: z.union([z.literal("none"), z.literal("top"), z.literal("cover")]).default("cover"),
  nodeDetailsPanel: z.union([z.literal("small"), z.literal("vditor")]).default("vditor"),
  alwaysShowDetails: z.boolean().default(false),
  entityDetailsFontSize: z.number().min(18).max(36).int().default(18),
  entityDetailsLinesLimit: z.number().min(1).max(200).int().default(4),
  entityDetailsWidthLimit: z.number().min(200).max(2000).int().default(200),
  showDebug: z.boolean().default(false),
  protectingPrivacy: z.boolean().default(false),
  windowCollapsingWidth: z.number().min(50).max(2000).int().default(300),
  windowCollapsingHeight: z.number().min(25).max(2000).int().default(300),
  limitCameraInCycleSpace: z.boolean().default(false),
  cameraCycleSpaceSizeX: z.number().min(1000).max(10000).int().default(1000),
  cameraCycleSpaceSizeY: z.number().min(1000).max(10000).int().default(1000),
  historySize: z.number().min(1).max(1000).default(20),
  autoRefreshStageByMouseAction: z.boolean().default(true),
  isPauseRenderWhenManipulateOvertime: z.boolean().default(true),
  renderOverTimeWhenNoManipulateTime: z.number().min(1).max(10).int().default(5),
  ignoreTextNodeTextRenderLessThanCameraScale: z.number().min(0.01).max(0.3).default(0.065),
  cacheTextBitmap: z.boolean().default(true),
  textCacheSize: z.number().default(100),
  textScalingBehavior: z
    .union([z.literal("temp"), z.literal("nearestCache"), z.literal("cacheEveryTick")])
    .default("temp"),
  antialiasing: z
    .union([z.literal("disabled"), z.literal("low"), z.literal("medium"), z.literal("high")])
    .default("low"),
  compatibilityMode: z.boolean().default(false),
  isEnableEntityCollision: z.boolean().default(false),
  autoNamerTemplate: z.string().default("..."),
  autoNamerSectionTemplate: z.string().default("Section_{{i}}"),
  autoSaveWhenClose: z.boolean().default(false),
  autoSave: z.boolean().default(true),
  autoSaveInterval: z.number().min(1).max(60).int().default(10),
  autoBackup: z.boolean().default(true),
  autoBackupInterval: z.number().min(60).max(6000).int().default(600),
  autoBackupLimitCount: z.number().min(1).max(500).int().default(10),
  autoBackupDraftPath: z.string().default(""),
  aiApiBaseUrl: z.string().default("https://generativelanguage.googleapis.com/v1beta/openai/"),
  aiApiKey: z.string().default(""),
  aiModel: z.string().default("gemini-2.5-flash"),
  aiShowTokenCount: z.boolean().default(false),
  mouseRightDragBackground: z.union([z.literal("cut"), z.literal("moveCamera")]).default("cut"),
  enableDragAutoAlign: z.boolean().default(true),
  mouseWheelMode: z
    .union([z.literal("zoom"), z.literal("move"), z.literal("moveX"), z.literal("none")])
    .default("zoom"),
  mouseWheelWithShiftMode: z
    .union([z.literal("zoom"), z.literal("move"), z.literal("moveX"), z.literal("none")])
    .default("moveX"),
  mouseWheelWithCtrlMode: z
    .union([z.literal("zoom"), z.literal("move"), z.literal("moveX"), z.literal("none")])
    .default("move"),
  mouseWheelWithAltMode: z
    .union([z.literal("zoom"), z.literal("move"), z.literal("moveX"), z.literal("none")])
    .default("none"),
  doubleClickMiddleMouseButton: z.union([z.literal("adjustCamera"), z.literal("none")]).default("adjustCamera"),
  mouseSideWheelMode: z
    .union([
      z.literal("zoom"),
      z.literal("move"),
      z.literal("moveX"),
      z.literal("none"),
      z.literal("cameraMoveToMouse"),
      z.literal("adjustWindowOpacity"),
      z.literal("adjustPenStrokeWidth"),
    ])
    .default("cameraMoveToMouse"),
  macMouseWheelIsSmoothed: z.boolean().default(false),
  enableWindowsTouchPad: z.boolean().default(true),
  macTrackpadAndMouseWheelDifference: z
    .union([z.literal("trackpadIntAndWheelFloat"), z.literal("tarckpadFloatAndWheelInt")])
    .default("trackpadIntAndWheelFloat"),
  macTrackpadScaleSensitivity: z.number().min(0).max(1).multipleOf(0.001).default(0.5),
  allowMoveCameraByWSAD: z.boolean().default(false),
  cameraFollowsSelectedNodeOnArrowKeys: z.boolean().default(false),
  cameraKeyboardMoveReverse: z.boolean().default(false),
  moveAmplitude: z.number().min(0).max(10).default(2),
  moveFriction: z.number().min(0).max(1).default(0.1),
  scaleExponent: z.number().min(0).max(1).default(0.11),
  cameraResetViewPaddingRate: z.number().min(1).max(2).default(1.5),
  scaleCameraByMouseLocation: z.boolean().default(true),
  cameraKeyboardScaleRate: z.number().min(0).max(3).default(0.2),
  rectangleSelectWhenRight: z.union([z.literal("intersect"), z.literal("contain")]).default("intersect"),
  rectangleSelectWhenLeft: z.union([z.literal("intersect"), z.literal("contain")]).default("contain"),
  textNodeStartEditMode: z
    .union([
      z.literal("enter"),
      z.literal("ctrlEnter"),
      z.literal("altEnter"),
      z.literal("shiftEnter"),
      z.literal("space"),
    ])
    .default("enter"),
  textNodeContentLineBreak: z
    .union([z.literal("enter"), z.literal("ctrlEnter"), z.literal("altEnter"), z.literal("shiftEnter")])
    .default("shiftEnter"),
  textNodeExitEditMode: z
    .union([z.literal("enter"), z.literal("ctrlEnter"), z.literal("altEnter"), z.literal("shiftEnter")])
    .default("enter"),
  textNodeSelectAllWhenStartEditByMouseClick: z.boolean().default(true),
  textNodeSelectAllWhenStartEditByKeyboard: z.boolean().default(false),
  allowAddCycleEdge: z.boolean().default(false),
  autoLayoutWhenTreeGenerate: z.boolean().default(true),
  gamepadDeadzone: z.number().min(0).max(1).default(0.1),
  showGrid: z.boolean().default(true),
  maxFps: z.number().default(60),
  maxFpsUnfocused: z.number().default(30),
  effectsPerferences: z.record(z.boolean()).default({}),
  autoFillNodeColor: z.tuple([z.number(), z.number(), z.number(), z.number()]).default([0, 0, 0, 0]),
  autoFillNodeColorEnable: z.boolean().default(true),
  autoFillPenStrokeColor: z.tuple([z.number(), z.number(), z.number(), z.number()]).default([0, 0, 0, 0]),
  autoFillPenStrokeColorEnable: z.boolean().default(true),
  autoFillEdgeColor: z.tuple([z.number(), z.number(), z.number(), z.number()]).default([0, 0, 0, 0]),
  autoOpenPath: z.string().default(""), // 废弃
  generateTextNodeByStringTabCount: z.number().default(4),
  enableCollision: z.boolean().default(true),
  enableDragAlignToGrid: z.boolean().default(false),
  mouseLeftMode: z
    .union([z.literal("selectAndMove"), z.literal("draw"), z.literal("connectAndCut")])
    .default("selectAndMove"),
  soundEnabled: z.boolean().default(true),
  cuttingLineStartSoundFile: z.string().default(""),
  connectLineStartSoundFile: z.string().default(""),
  connectFindTargetSoundFile: z.string().default(""),
  cuttingLineReleaseSoundFile: z.string().default(""),
  alignAndAttachSoundFile: z.string().default(""),
  uiButtonEnterSoundFile: z.string().default(""),
  uiButtonClickSoundFile: z.string().default(""),
  uiSwitchButtonOnSoundFile: z.string().default(""),
  uiSwitchButtonOffSoundFile: z.string().default(""),
  githubToken: z.string().default(""),
  githubUser: z.string().default(""),
  theme: z.string().default("dark"),
});

export type Settings = z.infer<typeof settingsSchema>;

const store = new LazyStore("settings.json");
await store.init();

const listeners: Record<string, ((value: any) => void)[]> = {};

export const Settings = new Proxy<
  Settings & {
    watch: (key: keyof Settings, callback: (value: any) => void) => () => void;
    use: <T extends keyof Settings>(key: T) => [Settings[T], (newValue: Settings[T]) => void];
  }
>(
  {
    ...settingsSchema.parse({}),
    watch: () => () => {},
    use: () => [undefined as any, () => {}],
  },
  {
    set: (target, key, value, receiver) => {
      if (typeof key === "symbol") {
        throw new Error(`不能设置symbol属性: ${String(key)}`);
      }
      if (!(key in target)) {
        throw new Error(`没有这个设置项: ${key}`);
      }
      store.set(key, value);
      return Reflect.set(target, key, value, receiver);
    },
    get: (target, key, receiver) => {
      switch (key) {
        case "watch": {
          return (key: keyof Settings, callback: (value: any) => void) => {
            if (!listeners[key]) {
              listeners[key] = [];
            }
            listeners[key].push(callback);
            callback(target[key]);
            return () => {
              listeners[key] = listeners[key].filter((cb) => cb !== callback);
            };
          };
        }
        case "use": {
          return <T extends keyof Settings>(key: T) => {
            const [value, setValue] = useState(target[key]);
            useEffect(() => {
              if (!listeners[key]) {
                listeners[key] = [];
              }
              listeners[key].push(setValue);
              return () => {
                listeners[key] = listeners[key].filter((cb) => cb !== setValue);
              };
            }, []);
            return [
              value,
              (newValue: Settings[T]) => {
                store.set(key, newValue);
                listeners[key].forEach((cb) => cb(newValue));
              },
            ];
          };
        }
        default: {
          return Reflect.get(target, key, receiver);
        }
      }
    },
  },
);
