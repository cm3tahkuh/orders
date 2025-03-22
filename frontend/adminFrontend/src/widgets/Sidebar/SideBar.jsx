import {
  Typography,
  Drawer,
  Box,
  Button,
  List,
  Divider,
  ListItemButton,
  ListSubheader
} from "@mui/material";
import { useState } from "react";
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [open, toggleDrawer] = useState(false);

  return (
    <Box>
      <Button onClick={() => toggleDrawer(true)}>
        <ListIcon />
      </Button>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
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
        >

        </List>
          
        <List>
          <ListItemButton>
            <Link
              to="/login"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Typography variant="h2">Таблица заявок</Typography>
            </Link>
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <Link
              to="/registeremployee"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Typography variant="h2">Регистрация пользователей</Typography>
            </Link>
          </ListItemButton>
          <Divider />
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
