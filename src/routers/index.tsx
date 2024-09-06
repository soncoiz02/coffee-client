import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

const ProductPage = lazy(() => import("../pages/admin/product"))
const ProductForm = lazy(() => import("../pages/admin/product/ProductForm"))
const AuthLayout = lazy(() => import("../layouts/AuthLayout"))
const MainLayout = lazy(() => import("../layouts/MainLayout"))
const AdminLayout = lazy(() => import("../layouts/admin"))
const IngredientGrid = lazy(() => import("../pages/admin/ingredients/IngredientGrid"))
const ListIngredients = lazy(() => import("../pages/admin/ingredients"))

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
          path: 'product',
          children: [
            {
              path: '',
              element: <ProductPage />,
              index: true
            },
            {
              path: 'form',
              element: <ProductForm />
            },
            {
              path: 'form/:id',
              element: <ProductForm />
            }
          ]
        },
        {
          path: 'ingredient',
          children: [
            {
              path: '',
              element: <ListIngredients />,
              index: true
            },
            {
              path: 'grid',
              element: <IngredientGrid />
            }
          ]
        }
      ]
    },
    {
      path: "/auth",
      element: <AuthLayout />
    },
    {
      path: "*",
      element: <Navigate to="/" replace />
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
};

export default Routers;