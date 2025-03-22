import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../../shared/ui/main-layout";
import OrderTablePage from "../../pages/order-table-page/OrderTablePage";
import { Login } from "../../pages/Login/Login";
import RegisterEmployee from "../../pages/RegisterEmployee/RegisterEmployee";

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
      {
        path: "registeremployee",
        element: <RegisterEmployee />,
      },
    ],
  },
]);
