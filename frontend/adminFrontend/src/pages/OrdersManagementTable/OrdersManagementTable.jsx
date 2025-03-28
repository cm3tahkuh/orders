import OrderCard from "../../widgets/OrderCard/OrderCard";
import { Typography } from "@mui/material";
import { useAuth } from "../../features/auth/context/useAuth";
import { useOrders } from "../../features/orders/useOrder";

const OrdersManagementTable = () => {
  const { user } = useAuth();

  const {
    data,
    dataEmployees,
    dataAvailableEmployees,
    handleLoadEmployeesById,
    handleLoadEmployeesForAddToOrder,
    handleDeleteEmployeeInOrder,
    handleAddEmployeeToOrder
  } = useOrders();

  if (!user) {
    return <Typography variant="h6">Вы не авторизованы.</Typography>;
  }

  if (user.role === 2) {
    return <Typography variant="h6">Доступ запрещен.</Typography>;
  }

  return (
    <div>
      <OrderCard
        data={data}
        dataEmployees={dataEmployees}
        dataAvailableEmployees={dataAvailableEmployees}
        addEmployeeToOrder={handleAddEmployeeToOrder}
        getEmployeesByOrderId={handleLoadEmployeesById}
        getEmployeesForAddToOrder={handleLoadEmployeesForAddToOrder}
        DeleteEmployeeInOrder={handleDeleteEmployeeInOrder}
      />
    </div>
  );
};

export default OrdersManagementTable;
