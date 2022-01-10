import { UUID } from "./common";

export interface Word {
  id: UUID;
  text: string;
  revise: boolean;
  last_revised: Date | null;
  created_time: Date | null;
  updated_time: Date | null;
}

export interface WordFilterFormData {
  query: string;
}

export interface WordFormData {
  id?: UUID;
  text: string;
  revise: boolean;
  last_revised?: Date | null;
  created_time?: Date | null;
  updated_time?: Date | null;
}

export type WordSortByKey = "alphabet" | "history";

export type WordViewLayout = "list" | "grid";

export interface WordFilterOptions {
  sortBy: WordSortByKey;
  page: number;
  rowsPerPage: number;
  formData: WordFilterFormData;
}
