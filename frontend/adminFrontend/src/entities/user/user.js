export const userRoleMap = {
  0: "Главный администратор",
  1: "Администратор",
  2: "Сотрудник",
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch("http://localhost:5295/api/Auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Не удалось авторизоваться.");
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    throw new Error(error || "Произошла ошибка при авторизации.");
  }
};

export const logoutUser = async (username) => {
  try {
    const response = await fetch(
      `http://localhost:5295/api/Auth/logout?name=${username}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    const responseData = await response.json();

    console.log(responseData);

    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};

export const registerUser = async (user) => {
  const {
    id,
    firstName,
    lastName,
    phone,
    user: { userName, password, role },
  } = user;

  try {
    const response = await fetch(`http://localhost:5295/api/Employee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        user: {
          userName: userName,
          password: password,
          role: role,
        },
      }),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch("http://localhost:5295/api/Employee");

    const responseData = await response.json();

    return responseData;
  } catch {
    throw new Error(error);
  }
};

export const deleteUserById = async (id) => {
  try {
    const response = await fetch("http://localhost:5295/api/Employee", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: `"${id}"`,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserById = async (user) => {
  const {
    id,
    firstName,
    lastName,
    phone,
    user: { userName, password, role },
  } = user;

  try {
    const response = await fetch(`http://localhost:5295/api/Employee/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        user: {
          userName: userName,
          password: password,
          role: role,
        },
      }),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};
