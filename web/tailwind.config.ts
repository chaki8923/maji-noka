import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  plugins: [
    require('flowbite/plugin'),
  ],
};
export default config;
