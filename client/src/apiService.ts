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
    images: string[];
}

// Function to retrieve all journal entries
export const getJournalEntries = (): Promise<journalEntry[]> => {
    return api.get<journalEntry[]>('/journal-entries').then(response => response.data);
};

// Function to retrieve all journal entries
export const createJournalEntry = (entry: journalEntry): Promise<journalEntry> => {
    return api.post<journalEntry>('/journal-entries', entry).then(response => response.data);
};

// To update existing entries
export const updateJournalEntry = async (id:number, entry: journalEntry): Promise<journalEntry> => {
    const response = await api.put<journalEntry>(`/journal-entries/${id}`, entry);
    return response.data;
}

// TO delete existing entry
export const deleteJournalEntry = async (id:number): Promise<void> => {
    await api.delete(`/journal-entries/${id}`);
}
