import ical from 'ical.js';
import {fetchCalendarData} from "@/app/coreAPI/calendarAPI";

export interface Vorlesung {
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
            const room = locationParts[0] || "Unbekannt";
            const lecturer = locationParts[1] || "Unbekannt";

            return {
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