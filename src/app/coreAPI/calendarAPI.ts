"use server";

import { KURSE } from "@/app/coreElements/kurse";
import fs from 'fs';
import path from 'path';

export const fetchCalendarData = async (slug: string): Promise<string> => {
    const course = KURSE.find(k => k.slug === slug);

    if (!course) {
        throw new Error("Kurs nicht gefunden");
    }

    try {
        // Construct the absolute path:
        // process.cwd() is /var/www/stupla/
        // course.link is /calendars/calendar-PIA23.ics
        // We join them with 'public' to get the full path
        const filePath = path.join(process.cwd(), 'public', course.link);

        // Read the file directly from the SSD
        const data = fs.readFileSync(filePath, 'utf-8');
        return data;
    } catch (error) {
        console.error(`Error reading local file for ${slug}:`, error);

        // Safety Fallback: If the local file is missing, fetch from the original source
        // This ensures the site doesn't break if the sync script fails
        const remoteUrl = `https://gera.dhge.de/basti/calendar-${course.title}.ics`;
        const response = await fetch(remoteUrl);

        if (!response.ok) throw new Error("Calendar data unreachable.");
        return await response.text();
    }
};