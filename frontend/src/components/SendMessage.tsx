import { FormEvent, useState } from "react";
import { sendMessage } from "../features/messagesSlice.ts";
import {
  Alert,
  Box,
  Container,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../app/hooks.ts";
import Send from "@mui/icons-material/Send";

const SendMessage = () => {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!author || !message) {
      setErrorMessage("Both fields are required!");
      setOpen(true);
      return;
    }
    dispatch(sendMessage({ author, message }));
    setAuthor("");
    setMessage("");
  };
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6" gutterBottom>
          Send a message
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <TextField
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            fullWidth
            multiline
            rows={4}
          />
          <Send
            type="submit"
            sx={{ mt: 2, cursor: "pointer" }}
            color="primary"
            onClick={handleSubmit}
          >
            Send
          </Send>
        </Box>
      </Paper>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SendMessage;
