"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_ci_1 = __importDefault(require("is-ci"));
const open_1 = __importDefault(require("open"));
const tmp_1 = __importDefault(require("tmp"));
const puppeteer_1 = __importDefault(require("puppeteer"));
exports.screenshot = async ({ launchOptions } = { launchOptions: {} }) => {
    const browser = await puppeteer_1.default.launch(launchOptions);
    const page = await browser.newPage();
    await page.setContent(document.documentElement.outerHTML);
    const path = tmp_1.default.fileSync({ postfix: ".png" }).name;
    await page.screenshot({ path });
    await open_1.default(path, { wait: false });
};
exports.takeScreenshotOnTestError = (options = { launchOptions: {} }) => {
    const wrapTestToMakeScreenshotOnError = (fn) => async () => {
        try {
            await fn();
        }
        catch (e) {
            if (!is_ci_1.default)
                await exports.screenshot(options);
            throw e;
        }
    };
    const wrapApply = (target, that, args) => {
        args[1] = wrapTestToMakeScreenshotOnError(args[1]);
        target.apply(that, args);
    };
    test = new Proxy(test, { apply: wrapApply });
    test.only = new Proxy(test.only, { apply: wrapApply });
    test.each = new Proxy(test.each, {
        apply: (target, that, args) => new Proxy(target.apply(that, args), { apply: wrapApply })
    });
};
//# sourceMappingURL=index.js.map