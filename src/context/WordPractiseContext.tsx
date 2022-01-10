import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import Mic from "@material-ui/icons/Mic";
import VolumeUp from "@material-ui/icons/VolumeUp";
import React, { useCallback, useContext, useRef, useState } from "react";
import { pronounceWord } from "../helper/pronounce";
import StopIcon from "@material-ui/icons/Stop";
import DeleteIcon from "@material-ui/icons/Delete";

export interface WordPractiseContextValue {
  show: (text: string) => void;
}
export const WordPractiseContext =
  React.createContext<WordPractiseContextValue>({
    show: () => {},
  });

export const useWordPractise = () => useContext(WordPractiseContext);

export const WordPractiseProvider: React.FC = ({ children }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const audioChunkRef = useRef<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const show = useCallback((newText: string) => {
    setText(newText);
    setOpen(true);
    recorderRef.current = null;
    audioChunkRef.current = [];
    setAudioUrl(null);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    setText("");
    recorderRef.current = null;
    audioChunkRef.current = [];
    setAudioUrl(null);
  }, []);

  const startRecording = () => {
    setAudioUrl(null);
    audioChunkRef.current = [];
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);

      recorder.addEventListener("dataavailable", (e) => {
        audioChunkRef.current.push(e.data);
      });

      recorder.start(1000);
      recorderRef.current = recorder;

      setRecording(true);
    });
  };

  const stopRecording = () => {
    const recorder = recorderRef.current;
    if (recorder?.state === "recording") {
      recorder.stop();
      const blob = new Blob(audioChunkRef.current, {
        type: "audio/ogg; codecs=opus",
      });
      const url = window.URL.createObjectURL(blob);
      setAudioUrl(url);
      setRecording(false);
    }
  };

  const clearAudio = () => {
    if (audioUrl) {
      window.URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  return (
    <WordPractiseContext.Provider value={{ show }}>
      {children}
      <Dialog open={open} onClose={hide} maxWidth="sm" fullWidth>
        <DialogTitle>
          Practise word
          <IconButton className="absolute right-2 top-2" onClick={hide}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent className="pb-5">
          <TextField
            id="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            multiline
            variant="outlined"
            label="Text"
            fullWidth
            rows={5}
          />
          {audioUrl && (
            <div className="flex my-5">
              <audio src={audioUrl} controls />
              <IconButton onClick={() => clearAudio()}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </DialogContent>
        <DialogActions className="justify-between">
          <IconButton onClick={() => pronounceWord(text)}>
            <VolumeUp />
          </IconButton>
          {!recording && (
            <Button
              startIcon={<Mic />}
              variant="outlined"
              onClick={startRecording}
            >
              Practise
            </Button>
          )}
          {recording && (
            <Button
              startIcon={<StopIcon />}
              variant="outlined"
              onClick={stopRecording}
            >
              Stop
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </WordPractiseContext.Provider>
  );
};
