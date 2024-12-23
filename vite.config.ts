import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import * as path from "path";
import "vitest/config"

export default defineConfig({
    base: "/Mindbox-todo-app/",
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            },
        },
    },
    plugins: [react(), svgrPlugin({
        include: "**/*.svg",
        svgrOptions: {
            exportType: "default",
        },
    }),],
    resolve: {
        alias: [{find: "@", replacement: path.resolve(__dirname, "src")}],
    },
    test: {
        environment: "jsdom",
        globals: true,
    },
})
