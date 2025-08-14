import axios from "axios";
import type { NewNote, Note } from "../types/note";

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;

// GET

interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  currentPage: number,
  searchQuery: string
): Promise<NoteHttpResponse> {
  const response = await axios.get<NoteHttpResponse>("/notes", {
    params: {
      search: searchQuery,
      page: currentPage,
      perPage: 12,
    },
  });
  return response.data;
}

// CREATE

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await axios.post<Note>("/notes", newNote);
  return response.data;
}

// DELETE

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
}
