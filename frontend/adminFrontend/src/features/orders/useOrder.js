import { useState, useEffect } from "react";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getOrderById,
} from "../../entities/order/order";

export const useOrders = () => {
  const [data, setData] = useState([]);
  const [dataEmployees, setDataEmployees] = useState([]);


  useEffect(() => {
    const loadData = async () => {
      const orders = await getOrders();
      setData(orders);
    };
    loadData();
  }, []);

  const handleLoadEmployeesById = async (orderId) => {
    const order = await getOrderById(orderId);
    setDataEmployees(order.employees);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const updatedOrder = await updateOrderStatus(orderId, newStatus);
    setData((prevData) =>
      prevData.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    return updatedOrder;
  };

  const handleDeleteOrder = async (orderId) => {
    const result = window.confirm("Вы уверены, что хотите удалить заявку?");
    if (result) {
      const data = await deleteOrder(orderId);
      setData((prevData) => prevData.filter((order) => order.id !== orderId));
    }
  };

  return {
    data,
    dataEmployees,
    handleStatusChange,
    handleDeleteOrder,
    handleLoadEmployeesById,
  };
};
