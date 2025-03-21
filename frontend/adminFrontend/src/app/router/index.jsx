import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../../shared/ui/main-layout";
import OrderTablePage from '../../pages/order-table-page/ui/index'
import { Login } from "../../pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "orders",
        element: <OrderTablePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
