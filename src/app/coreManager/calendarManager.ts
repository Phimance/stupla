import ical from 'ical.js';
import {fetchCalendarData} from "@/app/coreAPI/calendarAPI";

export interface Vorlesung {
    summary: any;
    id: string;
    title: string;
    description: string;
    location: string;
    startTime: Date;
    endTime: Date;
    lecturer: string;
}

export const getVorlesungen = async (slug: string): Promise<Vorlesung[]> => {
    try {
        const rawData = await fetchCalendarData(slug);
        const jcalData = ical.parse(rawData);
        const vcalendar = new ical.Component(jcalData);
        const vevents = vcalendar.getAllSubcomponents('vevent');

        return vevents.map((event) => {
            const item = new ical.Event(event);

            // Extracting the lecturer from the LOCATION or DESCRIPTION string
            // In your data, location looks like "B 027 PC\, Herr Grimm"
            const locationParts = item.location.split(', ');
            const lastdesc = item.description.split(" ").splice(-1)[0]
            const room = locationParts[0] || "Unbekannt";
            const lecturer = locationParts[1] || lastdesc || "Unbekannt";

            return {
                summary: item.summary,
                id: item.uid,
                title: item.summary,
                description: item.description,
                location: room,
                lecturer: lecturer,
                startTime: item.startDate.toJSDate(),
                endTime: item.endDate.toJSDate(),
            };
        }).sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

    } catch (error) {
        console.error("Fehler beim Parsen des Kalenders:", error);
        return [];
    }
};

export const getKlausuren = (vorlesungen: Vorlesung[]): Vorlesung[] => {
    const now = new Date();

    return vorlesungen.filter((kurs) => {
        // 1. Check if it's actually an exam
        const isExam = kurs.description.toLowerCase().includes("klausur") ||
            kurs.title.toLowerCase().includes("klausur");

        // 2. Check if the end time (or start time) is in the future
        // We use endTime here so that an exam currently in progress doesn't vanish instantly
        const isFuture = new Date(kurs.endTime) >= now;

        return isExam && isFuture;
    });
};