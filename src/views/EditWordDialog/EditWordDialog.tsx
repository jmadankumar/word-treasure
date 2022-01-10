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

const StyledEditWordDialog = styled(Dialog)``;

export interface EditWordDialogProps {
  word: Word;
  open: boolean;
  onSave?: () => void;
  onClose?: () => void;
}
const EditWordDialog: React.FunctionComponent<EditWordDialogProps> = ({
  word,
  open,
  onSave,
  onClose,
}) => {
  const [wordFormData] = useState<WordFormData>({
    ...word,
  });

  const handleSave = async (formData: WordFormData) => {
    delete formData.id;

    const { data: wordData } = await supabase
      .from<Word>("words")
      .select("*")
      .eq("text", formData.text);

    if (wordData && wordData.length > 0 && wordData[0].id !== wordFormData.id) {
      toast.error("Word Exist");
      return;
    }

    const { data, error } = await supabase
      .from<Word>("words")
      .update({ ...formData, updated_time: new Date() })
      .match({ id: word.id });
    if (data) {
      toast.success("Word updated");
      onSave?.();
    }

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <StyledEditWordDialog
      fullScreen
      open={open}
      TransitionComponent={Transition}
    >
      <WordForm
        type="edit"
        word={wordFormData}
        onSave={handleSave}
        onClose={onClose}
      />
    </StyledEditWordDialog>
  );
};

export default EditWordDialog;
