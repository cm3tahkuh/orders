import { OrderTable } from "../../../widgets/OrderTable/OrderTable";
import { useOrders } from "../../../features/orders/useOrder";

const OrderTablePage = () => {
  const { data, handleDeleteOrder, handleStatusChange } = useOrders();

  return (
    <section>
      <OrderTable
        data={data}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteOrder}
      />
    </section>
  );
};

export default OrderTablePage

