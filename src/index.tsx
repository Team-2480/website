import { App } from "./main";
import "dreamland/dev";
import "./index.css"

window.addEventListener("load", () => {
    document.getElementById("app")!.replaceWith(<App />);
});
