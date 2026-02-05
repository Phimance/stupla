import {KURSE} from "@/app/coreElements/kurse";

export const fetchCalendarData = async (slug: string) => {
    const course = KURSE.find(k => k.slug === slug);

    if (!course) {
        throw new Error("Kurs nicht gefunden");
    }

    try {
        // Fetch from the local public path
        const response = await fetch(course.link);

        if (!response.ok) {
            throw new Error(`Datei nicht gefunden: ${response.statusText}`);
        }

        return await response.text();
    } catch (error) {
        console.error("Local Fetch Error:", error);
        throw error;
    }
};