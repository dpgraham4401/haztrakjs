"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// vite.config.ts
var path_1 = require("path");
var vite_1 = require("vite");
var vite_plugin_dts_1 = require("vite-plugin-dts");
// https://vitejs.dev/guide/build.html#library-mode
exports.default = (0, vite_1.defineConfig)({
    build: {
        lib: {
            entry: (0, path_1.resolve)(__dirname, 'src/index.ts'),
            name: 'emanifest-lib',
            fileName: 'emanifest-lib',
        },
    },
    plugins: [
        (0, vite_plugin_dts_1.default)({
            rollupTypes: true,
        }),
    ],
});
