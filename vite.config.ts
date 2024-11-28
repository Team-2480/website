import { defineConfig } from "vite";
import { dreamlandPlugin } from "vite-plugin-dreamland";
import { renderToString } from "./ssr.js";

import { App } from "./src/main.tsx";


export default defineConfig({
    plugins: [
        dreamlandPlugin(),
        {
            name: "ssr",
            transformIndexHtml(html) {
                return html.replace(
                    /<div id="app"><\/div>/,
                    `${renderToString(App, {}, [])}
                      <script>
                      window.addEventListener("load", () => {
                          document.getElementById("ssr-root").remove();
                      });
                      </script>
                      <div id="app"></div>`,
                );
            },
        },
    ],
    base: "./",
});
