import { number, string } from "joi";
import { UUID } from "./common";

export interface Translation {
  en?: string | null;
  ta?: string | null;
  hi?: string | null;
}

export interface Word {
  id: UUID;
  text: string;
  image_url: string;
  category: string;
  translation: Translation;
  tags: string[];
  deleted: boolean;
  created_time: Date;
  updated_time: Date;
}

export interface WordCategory {
  id: number;
  name: string;
}

export interface WordFilterOptions {
  query: string;
  category: string;
}

export interface WordFormData {
  id?: UUID;
  text: string;
  image_url: string;
  category: string;
  translation: Translation;
  tags: string[];
  deleted: boolean;
}

export type WordSortByKey = "alphabet" | "history";
