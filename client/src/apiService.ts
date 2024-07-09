import axios from 'axios';

// Base URL for API
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export interface journalEntry {
    id?: number;
    title: string;
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;
    content: string;
    images: string[]
}

// Function to retrieve all journal entries
export const getJournalEntries = (): Promise<journalEntry[]> => {
    return api.get<journalEntry[]>('/journal-entries').then(response => response.data);
};

// Function to retrieve all journal entries
export const createJournalEntries = (entryData: journalEntry): Promise<journalEntry> => {
    return api.post<journalEntry>('/journal-entries', entryData).then(response => response.data);
};

