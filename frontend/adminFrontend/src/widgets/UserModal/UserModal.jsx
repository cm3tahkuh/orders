import {
  Modal,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import {IMaskInput} from 'react-imask';
import React from "react";
import { userRoleMap } from "../../entities/user/user";


const UserModal = ({ open, onClose, user, onEdit }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [currentUser, setCurrentUser] = useState(user);

  // console.log(currentUser);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentUser((prev) => {
      const [key, nestedKey] = name.split(".");

      if (nestedKey) {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            [nestedKey]: value,
          },
        };
      }

      return {
        ...prev,
        [key]: value,
      };
    });
  };



    const PhoneMask = React.forwardRef(function PhoneMask(props, ref) {
      return (
        <IMaskInput
        {...props}
        mask="(#00) 000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        overwrite
      />
      );
    });
    

  return (
    <Paper>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography
            variant="h6"
            component="h2"
            textAlign={"center"}
            fontSize={24}
            fontWeight={600}
          >
            Изменить данные пользователя
          </Typography>
          {currentUser && (
            <>
              <TextField
                label="Имя"
                name="firstName"
                value={currentUser.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Фамилия"
                name="lastName"
                value={currentUser.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Телефон"
                name="phone"
                value={currentUser.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{
                  inputComponent: PhoneMask, 
                }}
              />
              <TextField
                label="Логин"
                name="user.userName"
                value={currentUser.user.userName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Пароль"
                name="user.password"
                value={currentUser.user.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Typography>Роль</Typography>
              <Select
                value={currentUser.user.role}
                name="user.role"
                onChange={handleChange}
              >
                {Object.entries(userRoleMap).map(([key, value]) => (
                  <MenuItem key={key} value={Number(key)}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
          <Box display={"flex"} marginTop={2} justifyContent={"space-between"}>
            <Button variant="outlined" color="error" onClick={() => onClose()}>
              Закрыть
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                onEdit(currentUser);
                alert("Данные пользователя успешно изменены!");
                onClose();
              }}
            >
              Сохранить
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};

export default UserModal;
