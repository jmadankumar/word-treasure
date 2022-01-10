import React from "react";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import { useForm, Controller } from "react-hook-form";
import { WordFormData } from "../../types";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { joiResolver } from "@hookform/resolvers/joi";
import { wordSchema } from "../../validation/word-schema";

export interface WordFormProps {
  type: "new" | "edit";
  word: WordFormData;
  onSave?: (formData: WordFormData) => void;
  onClose?: () => void;
}
const WordForm: React.FunctionComponent<WordFormProps> = ({
  type,
  word,
  onSave,
  onClose,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WordFormData>({
    defaultValues: word,
    mode: "onSubmit",
    resolver: joiResolver(wordSchema),
  });

  const onSubmit = handleSubmit(async (wordFormdData) => {
    onSave?.(wordFormdData);
  });

  return (
    <form onSubmit={onSubmit}>
      <AppBar position="relative">
        <Toolbar>
          <IconButton color="inherit">
            <CloseIcon onClick={onClose} />
          </IconButton>
          <Typography className="font-bold flex-grow ml-2">
            {type === "new" ? "Add New Word" : "Edit Word"}
          </Typography>
          <Button color="inherit" type="submit">
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <div className="p-8">
        <FormGroup className="mb-5">
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="text"
                variant="outlined"
                label="Text"
                error={!!errors.text}
                helperText={errors.text?.message}
              />
            )}
          />
        </FormGroup>
        <FormGroup className="mb-5">
          <Controller
            name="revise"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Revise"
              />
            )}
          />
        </FormGroup>
      </div>
    </form>
  );
};

export default WordForm;
