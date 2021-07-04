import { UUID } from "./common";

export interface Translation {
  ta?: string | null;
  hi?: string | null;
}

export interface Word {
  id: UUID;
  text: string;
  description: string | null;
  image_url: string;
  category: string;
  topic: string | null;
  translation: Translation;
  tags: string[];
  deleted: boolean;
  created_time: Date | null;
  updated_time: Date | null;
}

export interface WordCategory {
  id: number;
  name: string;
}

export interface WordFilterFormData {
  query: string;
  category: string;
}

export interface WordFormData {
  id?: UUID;
  text: string;
  description: string | null;
  topic: string | null;
  image_url: string;
  category: string;
  translation: Translation;
  tags: string[];
  deleted: boolean;
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
