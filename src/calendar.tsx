import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

export const CalendarObject: Component<{}, {}> = function () {
    this.mount = () => {
        console.log("Creating Calendar.");
        let calendar = new Calendar(this.root as HTMLElement, {
            plugins: [dayGridPlugin],
        });
        calendar.render();
    };
    return <div></div>;
};
