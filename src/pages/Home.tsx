import { Fab, Button, Paper } from "@material-ui/core";
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
  WordViewLayout,
} from "../types/word";
import WordFilterDialog from "../views/WordFilterDrawer";
import PageTitle from "../components/common/PageTitle";
import AddWordDialog from "../views/AddWordDialog";
import EditWordDialog from "../views/EditWordDialog";
import WordSortingMenu from "../components/WordSortingMenu";
import Pagination from "@material-ui/lab/Pagination";
import { calcTotalPage, createPaginationRange } from "../helper/pagination";
import WordList from "../components/WordList";
import WordGrid from "../components/WordGrid";
import WordViewToggleButtonGroup from "../components/WordViewToggleButtonGroup";
import toast from "react-hot-toast";
import DeleteDialog from "../components/common/DeleteDialog";

const StyledHome = styled(Layout)`
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
    <Fab color="primary" aria-label="add" className="add-btn" onClick={onClick}>
      <AddIcon />
    </Fab>
  );
};

const Home: React.FunctionComponent = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filterOptions, setFilterOptions] = useState<WordFilterOptions>({
    sortBy: "history",
    page: 1,
    rowsPerPage: 20,
    formData: {
      query: "",
      category: "",
    },
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [openAddWordDialog, setOpenAddWordDialog] = useState(false);
  const [openEditWordDialog, setOpenEditWordDialog] = useState(false);
  const [openDeleteWordDialog, setOpenDeleteWordDialog] = useState(false);
  const [wordToEdit, setWordToEdit] = useState<Word | null>(null);
  const [wordToDelete, setWordToDelete] = useState<Word | null>(null);
  const [viewLayout, setViewLayout] = useState<WordViewLayout>("grid");
  const totalPage = calcTotalPage({ ...filterOptions, count: totalCount });

  const fetchWords = async () => {
    const range = createPaginationRange({
      ...filterOptions,
      count: totalCount,
    });

    const query = supabase
      .from<Word>("words")
      .select("*", { count: "exact" })
      .eq("deleted", false)
      .range(range.from, range.to);

    if (filterOptions.sortBy === "alphabet") {
      query.order("text", { ascending: true });
    } else if (filterOptions.sortBy === "history") {
      query.order("updated_time", { ascending: false });
    }

    if (filterOptions.formData.category) {
      query.eq("category", filterOptions.formData.category);
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

  const handleDeleteSelection = (word: Word) => {
    setWordToDelete(word);
    setOpenDeleteWordDialog(true);
  };

  const handleDelete = async (word: Word) => {
    const { data, error } = await supabase
      .from<Word>("words")
      .update({ deleted: true })
      .eq("id", word.id);
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      setWordToDelete(null);
      setOpenDeleteWordDialog(false);

      toast.success(`Word "${word.text}" deleted`);
      fetchWords();
    }
  };

  const handleDeleteCancel = () => {
    setWordToDelete(null);
    setOpenDeleteWordDialog(false);
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
    setFilterOptions((state) => ({ ...state, sortBy, page: 1 }));
  };

  return (
    <StyledHome>
      <div className="flex justify-between mb-5">
        <PageTitle>Words</PageTitle>
        <div className="flex items-center">
          <WordViewToggleButtonGroup
            value={viewLayout}
            onChange={setViewLayout}
          />
        </div>
      </div>
      <div className="flex md:justify-end items-center mb-5 flex-wrap">
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
      {viewLayout === "list" && (
        <Paper className="mb-5">
          <WordList
            words={words}
            onEdit={handleEditSelection}
            onDelete={handleDeleteSelection}
          />
        </Paper>
      )}
      {viewLayout === "grid" && (
        <WordGrid
          words={words}
          onEdit={handleEditSelection}
          onDelete={handleDeleteSelection}
          className="mb-5"
        />
      )}
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
      <WordFilterDialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        value={filterOptions.formData}
        onSearch={handleSearch}
      />
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
      {openDeleteWordDialog && wordToDelete && (
        <DeleteDialog
          open={openDeleteWordDialog}
          title="Delete Word"
          description={`Are you sure? you want to delete the word "${wordToDelete.text}".`}
          value={wordToDelete}
          onCancel={handleDeleteCancel}
          onDelete={handleDelete}
        />
      )}
    </StyledHome>
  );
};

export default Home;
