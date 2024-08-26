import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { AuthLayout, MainLayout } from '../layouts/index';
import ProductPage from "../pages/admin/product";

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: 'product-list',
          element: <ProductPage />
        }
      ]
    },
    {
      path: "/auth",
      element: <AuthLayout />
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Routers;