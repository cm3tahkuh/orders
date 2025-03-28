export const orderStatusMap = {
  0: "Новая",
  1: "В процессе",
  2: "Выполнена",
  3: "Отменена",
};

export const getOrders = async () => {
  const response = await fetch("http://localhost:5295/api/Order");
  const responseData = await response.json();
  return responseData;
};

export const getOrdersByUserId = async (userId) => {
  const response = await fetch(
    `http://localhost:5295/api/Order/getOrdersByUserId/${userId}`
  );
  const responseData = await response.json();
  return responseData;
};

export const setEmployeeToOrder = async (orderId, employeeId) => {
  const response = await fetch(
    `http://localhost:5295/api/Order/${orderId}/assign`,
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: `["${employeeId}"]`,
    }
  );

  const responseData = await response.json();
  return responseData;
};

export const getEmployeesForAddToOrderId = async (orderId) => {
  const response = await fetch(
    `http://localhost:5295/api/Order/getEmployeesForAddToOrder/${orderId}`
  );
  const responseData = await response.json();
  return responseData;
};

export const getOrderById = async (orderId) => {
  const response = await fetch(
    `http://localhost:5295/api/Order/getOneOrder/${orderId}`
  );
  const responseData = await response.json();
  return responseData;
};

export const updateOrderStatus = async (orderId, newStatus) => {
  const response = await fetch(
    `http://localhost:5295/api/Order/${orderId}?status=${newStatus}`,
    { method: "PUT", headers: { "Content-type": "application/json" } }
  );
  const result = await response.json();
  return result;
};

export const deleteOrder = async (deleteId) => {
  const response = await fetch(`http://localhost:5295/api/Order/${deleteId}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
  });
  return response.json();
};

export const deleteEmployeeInOrderId = async (orderId, employeeId) => {
  const response = await fetch(
    `http://localhost:5295/deleteEmployeeInOrderId?orderId=${orderId}&employeeId=${employeeId}`,
    {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    }
  );

  return response.json();
};
