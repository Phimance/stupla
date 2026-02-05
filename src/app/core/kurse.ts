export interface Course {
    title: string;
    slug: string; // Used in the URL
    link: string; // The actual schedule link
}

export const KURSE: Course[] = [
    { title: "PIA23", slug: "pia23", link: "https://gera.dhge.de/basti/calendar-PIA23.ics" },
    { title: "PIB23", slug: "pib23", link: "https://gera.dhge.de/basti/calendar-PIB23.ics" },
    { title: "PIC23", slug: "pic23", link: "https://gera.dhge.de/basti/calendar-PIC23.ics" },
    { title: "PIA24",  slug: "pia24",  link: "https://gera.dhge.de/basti/calendar-PIA24.ics"  },
    { title: "PIB24",  slug: "pib24",  link: "https://gera.dhge.de/basti/calendar-PIB24.ics"  },
    { title: "WI24",  slug: "wi24",  link: "https://gera.dhge.de/basti/calendar-WI24.ics"  },
];