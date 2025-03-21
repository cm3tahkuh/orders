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
