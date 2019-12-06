import { LaunchOptions } from "puppeteer";
export interface IScreenshotOptions {
    launchOptions: LaunchOptions;
}
export declare const takeScreenshot: ({ launchOptions }?: IScreenshotOptions) => Promise<void>;
export declare const paparazzi: (fn: any, options?: IScreenshotOptions) => () => Promise<void>;
export declare const takeScreenshotOnTestError: (options?: IScreenshotOptions) => void;
//# sourceMappingURL=index.d.ts.map