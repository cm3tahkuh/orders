import {
  Container,
  createTheme,
  Typography,
  ThemeProvider,
  Box,
  Paper
} from "@mui/material";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ["Cascadia Code", "sans-serif"].join(","),
      textTransform: "none",
      fontSize: 16,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Paper elevation={5} sx={{padding: 3, marginTop: 5}}>
        <Typography display={"flex"} justifyContent={"center"}>админ-панель</Typography>
        </Paper>
        

      </Container>
    </ThemeProvider>
  );
}

export default App;
