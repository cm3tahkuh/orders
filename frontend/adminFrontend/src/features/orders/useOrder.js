import { useState, useEffect } from "react";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getOrderById,
  deleteEmployeeInOrderId,
  getEmployeesForAddToOrderId,
  setEmployeeToOrder,
  getOrdersByUserId,
} from "../../entities/order/order";
import { useAuth } from "../auth/context/useAuth";

export const useOrders = () => {
  const [data, setData] = useState([]);
  const [dataEmployees, setDataEmployees] = useState([]);
  const [dataAvailableEmployees, setDataAvailableEmployees] = useState([]);
  const { user } = useAuth();

  console.log(data);
  // const loadOrdersByUserId = async (userId) => {
  //   const employeeOrders = await getOrdersByUserId(userId);
  //   setData(employeeOrders);
  // };
  useEffect(() => {
    const loadData = async () => {
      const orders = await getOrders();
      setData(orders);
    };

    // const loadOrdersByUserId = async () => {
    //   const generalUserId = localStorage.getItem("userData");

    //   const userId = JSON.parse(generalUserId);

    //   console.log(userId.id)
    //   const employeeOrders = await getOrdersByUserId(userId.id);
    //   setData(employeeOrders);
    // };

    // loadOrdersByUserId();

  
      loadData();

  }, []);

  const handleLoadEmployeesById = async (orderId) => {
    const order = await getOrderById(orderId);
    setDataEmployees(order.employees);
  };

  const handleLoadEmployeesForAddToOrder = async (orderId) => {
    const employees = await getEmployeesForAddToOrderId(orderId);
    setDataAvailableEmployees(employees);
  };

  const handleAddEmployeeToOrder = async (orderId, employeeId) => {
    const employee = await setEmployeeToOrder(orderId, employeeId);
    setDataAvailableEmployees((prevData) =>
      prevData.filter((employee) => employee.id !== employeeId)
    );
    handleLoadEmployeesById(orderId);
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

  const handleDeleteEmployeeInOrder = async (orderId, employeeId) => {
    const deleteEmployee = await deleteEmployeeInOrderId(orderId, employeeId);

    setDataEmployees((prevDataEmployees) =>
      prevDataEmployees.filter((employee) => employee.id !== employeeId)
    );
  };

  return {
    data,
    dataEmployees,
    dataAvailableEmployees,
    handleStatusChange,
    handleDeleteOrder,
    handleAddEmployeeToOrder,
    handleLoadEmployeesById,
    handleLoadEmployeesForAddToOrder,
    handleDeleteEmployeeInOrder,
  };
};
