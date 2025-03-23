import { useState, useEffect } from "react";
import {
  getAllUsers,
  deleteUserById,
  updateUserById,
} from "../../entities/user/user";

export const useUsers = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setData(users);
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    const result = window.confirm(
      "Вы уверены что хотите удалить этого пользователя?"
    );

    if (result) {
      const data = await deleteUserById(id);
      setData((prevData) => prevData.filter((user) => user.id !== id));
    }
  };

  const handleEditUser = async (user) => {
    const {
      id,
      firstName,
      lastName,
      phone,
      user: { userName, password, role },
    } = user;

    const editedUser = await updateUserById(user);

    setData((prevData) =>
      prevData.map((existingUser) =>
        existingUser.id === id
          ? {
              ...existingUser,
              firstName: firstName,
              lastName: lastName,
              phone: phone,
              user: {
                userName: userName,
                password: password,
                role: role,
              },
            }
          : existingUser
      )
    );
  };

  return { data, handleDeleteUser, handleEditUser };
};
