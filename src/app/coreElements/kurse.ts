export interface Course {
    title: string;
    slug: string; // Used in the URL
    link: string; // The actual schedule link
}

export const KURSE = [
    { title: "PIA23", slug: "pia23", link: "/calendars/calendar-PIA23.ics" },
    { title: "PIB23", slug: "pib23", link: "/calendars/calendar-PIB23.ics" },
    { title: "PIC23", slug: "pic23", link: "/calendars/calendar-PIC23.ics" },
    { title: "WI23", slug: "wi23", link: "/calendars/calendar-WI23.ics" },
    { title: "DM23", slug: "dm23", link: "/calendars/calendar.ics"},
    { title: "MOE24", slug: "moe24", link: "/calendars/calendar-MOE24.ics"},
];