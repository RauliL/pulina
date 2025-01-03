import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "istanbul",
    },
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
