import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript")];

eslintConfig.rules = {
  "no-restricted-imports": "off",
  "@typescript-eslint/no-restricted-imports": [
    "error",
    {
      patterns: ["@/components/ui/*"],
      message: "⚠️  Use os componentes de '@/components/core' (wrappers), não a versão gerada do shadcn.",
    },
  ],
};

export default eslintConfig;
