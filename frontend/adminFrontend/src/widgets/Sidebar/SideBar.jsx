import {
  Typography,
  Drawer,
  Box,
  Button,
  List,
  Divider,
  ListItemButton,
  ListSubheader,
} from "@mui/material";
import { useState } from "react";
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/context/useAuth";

const SideBar = () => {
  const [open, toggleDrawer] = useState(false);

  const { user } = useAuth();

  return (
    <Box>
      <Button
        sx={{
          position: "fixed",
          zIndex: "10000",
          left: 0,
          bottom: 0,
          padding: 4,
        }}
        onClick={() => toggleDrawer((prev) => !prev)}
      >
        <ListIcon sx={{ fontSize: "60px" }} color="secondary" />
      </Button>
      <Drawer open={open} onClose={() => toggleDrawer((prev) => !prev)}>
        <List
          sx={{
            width: "300px",
            flexShrink: 0,
          }}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <Typography
                textAlign={"center"}
                fontWeight={600}
                letterSpacing={-1}
                fontSize={32}
                padding={2}
              >
                Админ-панель
              </Typography>
            </ListSubheader>
          }
        ></List>

        <List>
          <Link to="/orders" style={{ color: "black", textDecoration: "none" }}>
            <ListItemButton>
              <Typography variant="h2">Таблица заявок</Typography>
            </ListItemButton>
          </Link>

          <Divider />
          { user && user.role !== 2 && (
            <>
              <Link
                to="/registeremployee"
                style={{ color: "black", textDecoration: "none" }}
              >
                <ListItemButton>
                  <Typography variant="h2">
                    Регистрация пользователей
                  </Typography>
                </ListItemButton>
              </Link>
              <Divider />
              <Link
                to="/managementorders"
                style={{ color: "black", textDecoration: "none" }}
              >
                <ListItemButton>
                  <Typography variant="h2">
                    Система управления заявками
                  </Typography>
                </ListItemButton>
              </Link>
              <Divider />
            </>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
