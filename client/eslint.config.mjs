import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { rules } from "./.eslintrc.cjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // any 타입 허용
      "@typescript-eslint/no-unused-vars": "off", // 사용하지 않는 변수 허용
      "react/no-unescaped-entities": "off", // 이스케이프되지 않은 문자 허용
      "@typescript-eslint/no-empty-interface": "off", // 빈 인터페이스 허용
      "@typescript-eslint/no-empty-function": "off", // 빈 함수 허용
      "@typescript-eslint/no-non-null-assertion": "off", // non-null 단언 허용
      "@typescript-eslint/ban-types": "off", // 특정 타입 사용 제한 해제
      "@typescript-eslint/no-inferrable-types": "off", // 타입 추론 가능한 경우 명시적 타입 선언 허용
    },
  },
];

export default eslintConfig;
