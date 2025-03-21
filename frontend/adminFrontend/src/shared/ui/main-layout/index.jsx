import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "../../../widgets/Header/Header";

export const MainLayout = () => {
  return (
    <main>
      <Container maxWidth="xl">
        <Header />
        <Outlet />
      </Container>
    </main>
  );
};
