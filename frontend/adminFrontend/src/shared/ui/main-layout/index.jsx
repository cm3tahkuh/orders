import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "../../../widgets/Header/Header";
import SideBar from "../../../widgets/Sidebar/SideBar";

export const MainLayout = () => {
  return (
    <main>
      <Container maxWidth="xl">
        <SideBar/>
        <Header />
        <Outlet />
      </Container>
    </main>
  );
};
