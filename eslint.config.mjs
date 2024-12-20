import react from "eslint-plugin-react";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    files: ["src/backend/**/*.ts", "src/common/*.ts"],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      typescript,
    },
  },
  {
    files: ["src/frontend/**/*.tsx?"],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      react,
      typescript,
    },
  },
];
