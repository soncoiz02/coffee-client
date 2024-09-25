import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import IngredientDiary from "../pages/admin/ingredients/sections/diary/IngredientDiary";
import IngredientEditableGrid from "../pages/admin/ingredients/sections/grid/IngredientEditableGrid";

const ProductPage = lazy(() => import("../pages/admin/product"))
const ProductForm = lazy(() => import("../pages/admin/product/ProductForm"))
const AuthLayout = lazy(() => import("../layouts/AuthLayout"))
const MainLayout = lazy(() => import("../layouts/MainLayout"))
const AdminLayout = lazy(() => import("../layouts/admin"))
const IngredientGrid = lazy(() => import("../pages/admin/ingredients/sections/grid/IngredientEditableGrid"))
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
              path: 'form/:productCode',
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
              element: <IngredientEditableGrid />
            },
            {
              path: 'diary',
              element: <IngredientDiary />
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