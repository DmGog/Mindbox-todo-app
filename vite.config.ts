import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import svgrPlugin from "vite-plugin-svgr";
import * as path from "path";
// https://vite.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            },
        },
    },
    plugins: [
        react(),
        svgrPlugin({
            include: "**/*.svg",
            svgrOptions: {
                exportType: "default",
            },
        }),
    ],
    resolve: {
        alias: [{find: "@", replacement: path.resolve(__dirname, "src")}],
    },
});
