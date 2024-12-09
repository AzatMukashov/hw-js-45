import { fetchMessages } from "../features/messagesSlice.ts";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const MessageList = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.messages.messages);
  const messageStatus = useAppSelector((state) => state.messages.status);
  useEffect(() => {
    if (messageStatus === "idle") {
      dispatch(fetchMessages());
    }
  }, [dispatch, messageStatus]);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>
      <List>
        {messages.map((msg) => (
          <div key={msg.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={<Typography variant="h6">{msg.author}</Typography>}
                secondary={
                  <>
                    <Typography
                      variant="body2"
                      component="span"
                      color="text.primary"
                    >
                      {msg.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      {dayjs(msg.datetime).format("DD.MM.YYYY HH:mm")}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default MessageList;
