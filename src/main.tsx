import "dreamland/dev";
import "./index.css";
import { Button, Icon, NavList, NavListButton, Styles } from "m3-dreamland";
import iconHome from "@ktibow/iconset-material-symbols/home";
import iconCalender from "@ktibow/iconset-material-symbols/calendar-today";
import { dark, light} from "./style";
import { CalendarObject} from "./calendar";

const App: Component<{}, {}> = function () {
    let content = css`
        padding: 1em;
    `;

    let header = css`
        font-size: large;
        padding-left: 0.5em;
    `;
    return (
        <div>
            <Styles dark={dark} light={light} />
            <NavList type="bar">
                <Button type="filled" ><Icon icon={iconHome}/> <span class={header}>Home</span></Button>
                <Button type="text" ><Icon icon={iconCalender}/> <span class={header}>Calender</span></Button>
            </NavList>
            <div class={content}>
                Hello! This is the placeholder site for FRC Team 2480.
        <CalendarObject/>
            </div>
        </div>
    );
};

window.addEventListener("load", () => {
    document.getElementById("app")!.replaceWith(<App />);
});
