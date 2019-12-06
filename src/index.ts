import isCi from "is-ci";
import open from "open";
import tmp from "tmp";
import pupetter from "puppeteer";

const screenshot = async () => {
  const browser = await pupetter.launch({
    defaultViewport: { width: 375, height: 812 }
  });
  const page = await browser.newPage();
  await page.setContent(document.documentElement.outerHTML);
  const path = tmp.fileSync({ postfix: ".png" }).name;
  await page.screenshot({ path });
  await open(path, { wait: false });
};

export const takeScreenshotOnError = () => {
  const makeScreenshotOnFail = (fn: any) => async () => {
    try {
      await fn();
    } catch (e) {
      if (!isCi) await screenshot();
      throw e;
    }
  };

  const wrapApply = (target: jest.It, that: any, args: Parameters<jest.It>) => {
    args[1] = makeScreenshotOnFail(args[1]);
    target.apply(that, args);
  };

  test = new Proxy(test, { apply: wrapApply });
  test.only = new Proxy(test.only, { apply: wrapApply });
  test.each = new Proxy(test.each, {
    apply: (target, that, args) =>
      new Proxy(target.apply(that, args), { apply: wrapApply })
  });
};
