import { useEffect, useState } from "react";
import supabase from "../lib/supabase-client";
import { WordCategory } from "../types";

export default function useWordCategories() {
  const [categories, setCategories] = useState<WordCategory[]>([]);
  useEffect(() => {
    const fetchWordCategories = async () => {
      const { data } = await supabase
        .from<WordCategory>("word_categories")
        .select();

      if (data) {
        setCategories(data);
      }
    };
    fetchWordCategories();
  }, []);

  return categories;
}
