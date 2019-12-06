# error-paparazzi

## Usage

### Make all your `test`s create and open a screenshot automatically after failing:

```ts
import { takeScreenshotOnTestError } from "@error-paparazzi/jest";

takeScreenshotOnTestError();

test("failing test", () => {
  expect(true).toBe(false);
});
```

### Wrap single test in `paparazzi`:

```ts
import { paparazzi } from "@error-paparazzi/jest";

test("failing test", paparazzi(() => {
  expect(true).toBe(false);
}));
```

### Explicitly trigger a screenshot whenever you want to:

```ts
import { screenshot } from "@error-paparazzi/jest";

test("failing test", () => {
  await screenshot();
  expect(true).toBe(false);
});
```
