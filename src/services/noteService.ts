import axios from 'axios';
import type { NewNote, Note } from '../types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api/';
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

// GET

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(page: number, search: string): Promise<NotesHttpResponse> {
  const response = await axios.get<NotesHttpResponse>('notes/', {
    params: {
      ...(search !== '' && { search: search }),
      page,
      perPage: 12,
    },
  });
  return response.data;
}

// POST

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await axios.post<Note>('notes/', newNote);
  return response.data;
}

// DELETE

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(`notes/${noteId}`);
  return response.data;
}
