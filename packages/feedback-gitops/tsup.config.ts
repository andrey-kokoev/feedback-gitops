import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/lib.ts" },
  format: ["esm"],
  target: "es2022",
  dts: true,
  clean: true,
  sourcemap: true,
});
