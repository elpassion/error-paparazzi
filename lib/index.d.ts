import { LaunchOptions } from "puppeteer";
export interface IScreenshotOptions {
    launchOptions: LaunchOptions;
}
export declare const screenshot: ({ launchOptions }?: IScreenshotOptions) => Promise<void>;
export declare const takeScreenshotOnTestError: (options?: IScreenshotOptions) => void;
//# sourceMappingURL=index.d.ts.map