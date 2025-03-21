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
