export interface Course {
    title: string;
    slug: string; // Used in the URL
    link: string; // The actual schedule link
}

// src/app/core/kurse.ts
export const KURSE = [
    { title: "PIA23", slug: "pia23", link: "/calendars/calendar-PIA23.ics" },
    { title: "PIB23", slug: "pib23", link: "/calendars/calendar-PIB23.ics" },
    { title: "PIC23", slug: "pic23", link: "/calendars/calendar-PIC23.ics" },
    { title: "WI23", slug: "wi23", link: "/calendars/calendar-WI23.ics" },
    { title: "PIA24", slug: "pia24", link: "/calendars/calendar-PIA24.ics" },
    { title: "PIB24", slug: "pib24", link: "/calendars/calendar-PIB24.ics" },
];