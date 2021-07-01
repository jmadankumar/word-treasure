import { Fab, List, Button, Paper, Tabs, Tab } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { useEffect } from "react";
import supabase from "../lib/supabase-client";
import { Word, WordSortByKey } from "../types/word";
import WordFilterDialog from "../views/WordFilterDrawer";
import PageTitle from "../components/common/PageTitle";
import AddWordDialog from "../views/AddWordDialog";
import EditWordDialog from "../views/EditWordDialog";
import WordItem from "../components/WordItem";

const StyledHome = styled(Layout)`
  .add-btn {
    position: fixed;
    right: 1rem;
    bottom: 64px;
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
  const [filterOpen, setFilterOpen] = useState(false);
  const [openAddWordDialog, setOpenAddWordDialog] = useState(false);
  const [openEditWordDialog, setOpenEditWordDialog] = useState(false);
  const [wordToEdit, setWordToEdit] = useState<Word | null>(null);
  const [wordToDelete, setWordToDelete] = useState<Word | null>(null);
  const [sortBy, setSortBy] = useState<WordSortByKey>("history");

  const fetchWords = async () => {
    const query = supabase.from<Word>("words").select();

    if (sortBy === "alphabet") {
      query.order("text", { ascending: true });
    } else if (sortBy === "history") {
      query.order("updated_time", { ascending: false });
    }

    const { data } = await query;

    if (data) {
      setWords(data);
    }
  };

  useEffect(() => {
    fetchWords();
  }, [sortBy]);

  const handleSave = () => {
    fetchWords();
    setOpenAddWordDialog(false);
  };

  const handleUpdate = () => {
    fetchWords();
    setOpenEditWordDialog(false);
  };

  const handleEdit = (word: Word) => {
    setWordToEdit(word);
    setOpenEditWordDialog(true);
  };

  const handleDelete = (word: Word) => {
    setWordToDelete(word);
  };

  return (
    <StyledHome>
      <div className="flex justify-between">
        <PageTitle>Words</PageTitle>
        <div>
          <Button onClick={() => setFilterOpen(true)}>Filter</Button>
        </div>
      </div>
      <div className="flex items-center mb-5">
        <div className="mr-3">Sort By</div>
        <Tabs
          value={sortBy}
          className="flex-grow"
          onChange={(event, value) => setSortBy(value)}
        >
          <Tab value="alphabet" label="A-Z" />
          <Tab value="history" label="Recently Added" />
        </Tabs>
      </div>

      <Paper>
        <List disablePadding>
          {words.map((word) => (
            <WordItem
              word={word}
              key={word.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </List>
      </Paper>

      <AddButton onClick={() => setOpenAddWordDialog(true)} />
      <WordFilterDialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
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
    </StyledHome>
  );
};

export default Home;
