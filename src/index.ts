import isCi from "is-ci";
import open from "open";
import tmp from "tmp";
import pupetter, { LaunchOptions } from "puppeteer";

export interface IScreenshotOptions {
  launchOptions: LaunchOptions;
}

export const takeScreenshot = async (
  { launchOptions }: IScreenshotOptions = { launchOptions: {} }
) => {
  const browser = await pupetter.launch(launchOptions);
  const page = await browser.newPage();
  await page.setContent(document.documentElement.outerHTML);
  const path = tmp.fileSync({ postfix: ".png" }).name;
  await page.screenshot({ path });
  await open(path, { wait: false });
};

export const paparazzi = (
  fn: any,
  options: IScreenshotOptions = { launchOptions: {} }
) => async () => {
  try {
    await fn();
  } catch (e) {
    if (!isCi) await takeScreenshot(options);
    throw e;
  }
};

export const takeScreenshotOnTestError = (
  options: IScreenshotOptions = { launchOptions: {} }
) => {
  const wrapApply = (target: jest.It, that: any, args: Parameters<jest.It>) => {
    args[1] = paparazzi(args[1], options);
    target.apply(that, args);
  };

  test = new Proxy(test, { apply: wrapApply });
  test.only = new Proxy(test.only, { apply: wrapApply });
  test.each = new Proxy(test.each, {
    apply: (target, that, args) =>
      new Proxy(target.apply(that, args), { apply: wrapApply })
  });
};
