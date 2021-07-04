import React from "react";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useForm, Controller } from "react-hook-form";
import { WordFormData } from "../../types";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useWordCategories from "../../hooks/useWordCategories";
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
  const categories = useWordCategories();
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
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  placeholder="Category"
                  label="Category"
                  {...field}
                >
                  {categories.map((category) => (
                    <MenuItem value={category.name} key={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </FormGroup>
        <FormGroup className="mb-5">
          <Controller
            name="topic"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="text"
                variant="outlined"
                label="Topic"
                error={!!errors.topic}
                helperText={errors.topic?.message}
              />
            )}
          />
        </FormGroup>
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
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="text"
                variant="outlined"
                label="Description"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </FormGroup>
        <FormGroup className="mb-8">
          <Controller
            name="image_url"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="text"
                variant="outlined"
                label="Image Url"
                error={!!errors.image_url}
                helperText={errors.image_url?.message}
              />
            )}
          />
        </FormGroup>
        <FormGroup className="mb-5">
          <div className="text-lg font-bold">Translation</div>
        </FormGroup>
        <FormGroup className="mb-5">
          <Controller
            name="translation.ta"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="text"
                variant="outlined"
                label="Tamil"
                error={!!errors.translation?.ta}
                helperText={errors.translation?.ta?.message}
              />
            )}
          />
        </FormGroup>
        <FormGroup className="mb-5">
          <Controller
            name="translation.hi"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="text"
                variant="outlined"
                label="Hindi"
                error={!!errors.translation?.hi}
                helperText={errors.translation?.hi?.message}
              />
            )}
          />
        </FormGroup>
      </div>
    </form>
  );
};

export default WordForm;
