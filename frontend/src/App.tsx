import MessageList from "./components/MessageList.tsx";
import SendMessage from "./components/SendMessage.tsx";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import WhatsApp from "@mui/icons-material/WhatsApp";

const App = () => {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography
            onClick={handleRefresh}
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            ChatApp
          </Typography>
          <WhatsApp onClick={handleRefresh} sx={{ cursor: "pointer" }} />
        </Toolbar>
      </AppBar>
      <MessageList />
      <SendMessage />
    </Container>
  );
};

export default App;
