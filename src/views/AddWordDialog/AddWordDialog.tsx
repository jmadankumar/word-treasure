import React, { useState } from "react";
import styled from "styled-components";
import { Word, WordFormData } from "../../types";
import { Dialog, Slide } from "@material-ui/core";
import supabase from "../../lib/supabase-client";
import toast from "react-hot-toast";
import WordForm from "../../components/WordForm";
import { TransitionProps } from "@material-ui/core/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledAddWordDialog = styled(Dialog)``;

export interface AddWordDialogProps {
  open: boolean;
  onSave?: () => void;
  onClose?: () => void;
}
const AddWordDialog: React.FunctionComponent<AddWordDialogProps> = ({
  open,
  onSave,
  onClose,
}) => {
  const [wordFormData] = useState<WordFormData>({
    text: "",
    revise: false,
  });

  const handleSave = async (newWordFormData: WordFormData) => {
    const { data: wordData } = await supabase
      .from<Word>("words")
      .select("*")
      .eq("text", newWordFormData.text);

    if (wordData?.length === 0) {
      const { data, error } = await supabase
        .from<Word>("words")
        .insert([newWordFormData]);
      if (data) {
        toast.success("New Word added");
        onSave?.();
      }

      if (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Word Exist");
    }
  };

  return (
    <StyledAddWordDialog
      fullScreen
      open={open}
      TransitionComponent={Transition}
    >
      <WordForm
        type="new"
        word={wordFormData}
        onSave={handleSave}
        onClose={onClose}
      />
    </StyledAddWordDialog>
  );
};

export default AddWordDialog;
