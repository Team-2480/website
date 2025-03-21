import { Button, Icon, NavList, Styles, CardClickable } from "m3-dreamland";
import iconHome from "@ktibow/iconset-material-symbols/home";
import iconCalender from "@ktibow/iconset-material-symbols/calendar-today";
import iconLinks from "@ktibow/iconset-material-symbols/link";
import { dark } from "./style.tsx";
import { IconifyIcon } from "@iconify/types";
import { marked } from 'marked';
//https://marked.js.org/#usage

//Util Functions
async function loadMarkdown(url: string, htmlID: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        let markdownText = await response.text();
        let htmlContent = await marked.parse(markdownText);
        const contentElement = document.getElementById(htmlID)
        if (contentElement) {
            contentElement.innerHTML = htmlContent; // Inject parsed HTML
        }

    } catch (error) {
        //FIX: typescript hates using error without error type, so no error code.
        // console.error(error.message);
        console.error("error retrieving file at", url);
    }
}

// App
export const App: Component<
    { $ssr: Function },
    {
        selector: number;
        buttons: Array<{
            icon: IconifyIcon;
            name: string;
            route: string;
        }>;
        views: Array<HTMLElement>;
    }
> = function () {
    let content = css`
        padding: 1em;
    `;

    let header = css`
        font-size: large;
        padding-left: 0.5em;
    `;

    this.views = [<HomePage />, <GoogleCalander />, <ImportantLinks />];
    this.buttons = [
        {
            icon: iconHome,
            name: "Home",
            route: "#home",
        },
        {
            icon: iconCalender,
            name: "Calendar",
            route: "#calendar",
        },
        {
            icon: iconLinks,
            name: "Important Links",
            route: "#links",
        },
    ];
    this.selector = 0;

    // Function to handle routing and change the selected view based on the URL hash
    const updateRoute = () => {
        const hash = window.location.hash;
        switch (hash) {
            case "#home":
                this.selector = 0;
                break;
            case "#calendar":
                this.selector = 1;
                break;
            case "#links":
                this.selector = 2;
                break;
            default:
                this.selector = 0;
                break;
        }
    };

    // Initialize the route based on the current URL
    updateRoute();

    // Listen for hash changes
    window.addEventListener("hashchange", updateRoute);

    return (
        <div>
            <Styles dark={dark} light={dark} />
            {this.$ssr(() => {
                let ret = <div></div>;
                this.buttons.map((value, index) => {
                    ret.appendChild(
                        <Button
                            type={index == this.selector ? "filled" : "text"}
                            on:click={() => {
                                this.selector = index; //idk if this is still needed
                                window.location.hash = value.route; // Change hash on click
                            }}
                        >
                            <Icon icon={value.icon} />
                            <span class={header}>{value.name}</span>
                        </Button>,
                    );
                });
                return ret;
            })}
            <NavList type="bar">
                {use(this.selector, () =>
                    this.buttons.map((value, index) => {
                        return (
                            <Button
                                type={
                                    index == this.selector ? "filled" : "outlined"
                                }
                                on:click={() => {
                                    // this.selector = index; //idk if this is still needed
                                    window.location.hash = value.route; // Change hash on click
                                }}
                            >
                                <Icon icon={value.icon} />
                                <span class={header + " outfit-regular"}>{value.name}</span>
                            </Button>
                        );
                    }),
                )}
            </NavList>
            <div class={content}>
                {this.$ssr(() => {
                    let ret = <div></div>;
                    this.views.map((a) => ret.appendChild(a));
                    return ret;
                })}
                {use(this.selector, () =>
                    this.views.map((value, index) => {
                        return (
                            <span
                                style={{
                                    display:
                                        index == this.selector
                                            ? "inline"
                                            : "none",
                                }}
                            >
                                {value}
                            </span>
                        );
                    }),
                )}
            </div>
        </div>
    );
};

const HomePage: Component<{}, {}> = function () {
    let header = css`
        margin-bottom: 20px;
        margin-top: 20px;
        line-height: 1em;
    `;
    let sponsor = css`
        filter: drop-shadow(3px 0px 0.4vw white) drop-shadow(-3px 0px 0.4vw white) drop-shadow(0px 3px 0.4vw white) drop-shadow(0px -3px 0.4vw white);
        border-radius: 10px;
        width: 10vw;
        aspect-ratio: 1;
    `;
    let sponsors = css`
        display: flex;
        & > span {
            margin: 10px;
        }
    `;

    return (
        <div class="outfit-regular">
            <h1 class={header}>IronPaws - FRC Team 2480 </h1>
            <h2 class={header}>About us</h2>
            IronPaws is the FIRST Robotics team of Roosevelt High and Hiawatha
            Collegiate High School.
            Questions? contact the team at contact@team2480.org
            <div id="content"></div>
            <h2 class={header}>Our Sponsors</h2>
            <div class={sponsors}>
                <CardClickable type="filled">
                    <img src="bslogo.svg" class={sponsor} />
                </CardClickable>
                <CardClickable type="filled">
                    <img src="stcloud.svg" class={sponsor} />
                </CardClickable>
                <CardClickable type="filled">
                    <img src="MRRF_Logo.jpg" class={sponsor} />
                </CardClickable>
            </div>
        </div>
    );

};
const GoogleCalander: Component<{}, {}> = function () {
    let container = css`
        display: flex;
        justify-content: center;
        align-items: center;
        filter:saturate(0%) invert(100%) contrast(100%);
    `;
    return (
        <div class={container}>
            <iframe
                src="https://calendar.google.com/calendar/embed?src=team20480%40gmail.com&ctz=America%2FChicago&showTitle=0"
                style="border: 0; border-radius: 10px;"
                width="800"
                height="600"
                frameborder="0"
                scrolling="no"
                loading="lazy"
            ></iframe>
        </div>
    );
};
const ImportantLinks: Component<{}, {}> = function () {
    // it also possible to tell marked to add the classes we want in css
    // see https://marked.js.org/using_pro#renderer 
    // its easiest to customize css in the default classes, no fancy class names
    // are needed
    let contentStyle = css`
        h1 {
            margin-bottom: 20px;
            margin-top: 20px;
            line-height: 1em;
        }
        ul {
            margin-left:20px;
        }
        a {
        color: #6b75ff
        }
        `
    // Placeholder div where parsed HTML will be inserted
    const htmlID = "markdown-content"
    let contentDiv = <div id={htmlID} class={contentStyle} >some content has failed to load ...oops</div>;
    const url = "https://raw.githubusercontent.com/Team-2480/teamManual/refs/heads/main/Resources.md"
    // Call the loadMarkdown function to load content
    loadMarkdown(url, htmlID);

    return (
        <div class="outfit-regular">
            {contentDiv}
        </div>
    );
};
