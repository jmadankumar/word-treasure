import { Fab, Button, Paper, Chip } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useState } from "react";
import { useEffect } from "react";
import supabase from "../lib/supabase-client";
import {
  Word,
  WordFilterFormData,
  WordFilterOptions,
  WordSortByKey,
} from "../types/word";
import WordFilterDialog from "../views/WordFilterDrawer";
import PageTitle from "../components/common/PageTitle";
import Container from "../components/common/Container";
import AddWordDialog from "../views/AddWordDialog";
import EditWordDialog from "../views/EditWordDialog";
import WordSortingMenu from "../components/WordSortingMenu";
import Pagination from "@material-ui/lab/Pagination";
import { calcTotalPage, createPaginationRange } from "../helper/pagination";
import WordList from "../components/WordList";
import { useWordPreference } from "../context/WordsPreferenceContext";
import { useWordPractise } from "../context/WordPractiseContext";

const StyledWordPage = styled(Layout)`
  .add-btn {
    position: fixed;
    right: 16px;
    bottom: 16px;
  }
`;
export interface AddButtonProps {
  onClick?: () => void;
}

const AddButton: React.FunctionComponent<AddButtonProps> = ({ onClick }) => {
  return (
    <Fab
      color="secondary"
      aria-label="add"
      className="add-btn"
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  );
};

const WordPage: React.FunctionComponent = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const { sortBy, setSortBy } = useWordPreference();
  const [filterOptions, setFilterOptions] = useState<WordFilterOptions>({
    sortBy: sortBy,
    page: 1,
    rowsPerPage: 20,
    formData: {
      query: "",
    },
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [openAddWordDialog, setOpenAddWordDialog] = useState(false);
  const [openEditWordDialog, setOpenEditWordDialog] = useState(false);
  const [wordToEdit, setWordToEdit] = useState<Word | null>(null);
  const totalPage = calcTotalPage({ ...filterOptions, count: totalCount });
  const isFilterDataAvailable = Object.values(filterOptions.formData).some(
    (val) => !!val
  );
  const { show } = useWordPractise();

  const fetchWords = async () => {
    const range = createPaginationRange({
      ...filterOptions,
      count: totalCount,
    });

    const query = supabase
      .from<Word>("words")
      .select("*", { count: "exact" })
      .range(range.from, range.to);

    if (filterOptions.sortBy === "alphabet") {
      query.order("text", { ascending: true });
    } else if (filterOptions.sortBy === "history") {
      query.order("created_time", { ascending: false });
    }

    if (filterOptions.formData.query) {
      query.ilike("text", `%${filterOptions.formData.query}%`);
    }

    const { data, count } = await query;

    if (data) {
      setWords(data);
      setTotalCount(count ?? 0);
    }
  };

  useEffect(() => {
    fetchWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions]);

  const handleSave = () => {
    fetchWords();
    setOpenAddWordDialog(false);
  };

  const handleEditSelection = (word: Word) => {
    setWordToEdit(word);
    setOpenEditWordDialog(true);
  };

  const handleUpdate = () => {
    fetchWords();
    setOpenEditWordDialog(false);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setFilterOptions((state) => ({ ...state, page: value }));
  };

  const handleSearch = (formData: WordFilterFormData) => {
    setFilterOptions((state) => ({
      ...state,
      formData: { ...formData },
      page: 1,
    }));
    setFilterOpen(false);
  };

  const handleSortingOrderChange = (sortBy: WordSortByKey) => {
    setSortBy(sortBy);
    setFilterOptions((state) => ({ ...state, sortBy, page: 1 }));
  };

  const clearFilterFormData = (name?: string) => {
    if (name) {
      setFilterOptions((options) => ({
        ...options,
        formData: { ...options.formData, [name]: "" },
        page: 1,
      }));
    } else {
      setFilterOptions((options) => ({
        ...options,
        formData: { query: "", category: "" },
        page: 1,
      }));
    }
  };

  return (
    <StyledWordPage>
      <Container>
        <div className="flex mb-5">
          <PageTitle>Words</PageTitle>
        </div>
        <div className="flex lg:justify-between items-center mb-5 flex-wrap">
          <div className="w-full lg:w-1/2 flex order-last lg:order-first mt-4 lg:mt-0">
            {filterOptions.formData.query && (
              <div className="mr-4">
                <span className="font-medium mr-1">Query:</span>
                <Chip
                  label={filterOptions.formData.query}
                  onDelete={() => clearFilterFormData("query")}
                />
              </div>
            )}

            {isFilterDataAvailable && (
              <Button
                color="secondary"
                onClick={() => clearFilterFormData()}
                startIcon={<FilterListIcon />}
                className="inline-flex ml-2"
              >
                Clear All
              </Button>
            )}
          </div>
          <div className="w-full lg:w-1/2 flex flex-wrap lg:justify-end">
            <Button
              color="primary"
              onClick={() => setFilterOpen(true)}
              startIcon={<FilterListIcon />}
              className="inline-flex"
            >
              Filter
            </Button>
            <WordSortingMenu
              sortBy={filterOptions.sortBy}
              onChange={handleSortingOrderChange}
            />
          </div>
        </div>

        <Paper className="mb-5">
          <WordList
            words={words}
            onEdit={handleEditSelection}
            onPractice={(word) => show(word.text)}
          />
        </Paper>

        {totalPage > 0 && (
          <Paper>
            <div className="flex justify-center p-3">
              <Pagination
                count={totalPage}
                variant="outlined"
                shape="rounded"
                page={filterOptions.page}
                onChange={handlePageChange}
              />
            </div>
          </Paper>
        )}
        {totalPage === 0 && (
          <div className="flex justify-center p-16 bg-gray-200">
            No words. Please add new words and expand your confidents.
          </div>
        )}

        <AddButton onClick={() => setOpenAddWordDialog(true)} />
        {filterOptions.formData && filterOpen && (
          <WordFilterDialog
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            value={filterOptions.formData}
            onSearch={handleSearch}
          />
        )}
        {openAddWordDialog && (
          <AddWordDialog
            open={openAddWordDialog}
            onClose={() => setOpenAddWordDialog(false)}
            onSave={handleSave}
          />
        )}
        {openEditWordDialog && wordToEdit && (
          <EditWordDialog
            word={wordToEdit}
            open={openEditWordDialog}
            onClose={() => setOpenEditWordDialog(false)}
            onSave={handleUpdate}
          />
        )}
      </Container>
    </StyledWordPage>
  );
};

export default WordPage;
