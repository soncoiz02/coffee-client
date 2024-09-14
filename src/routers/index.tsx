import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import IngredientDiary from "../pages/admin/ingredients/sections/diary/IngredientDiary";

const ProductPage = lazy(() => import("../pages/admin/product"))
const ProductForm = lazy(() => import("../pages/admin/product/ProductForm"))
const AuthLayout = lazy(() => import("../layouts/AuthLayout"))
const MainLayout = lazy(() => import("../layouts/MainLayout"))
const AdminLayout = lazy(() => import("../layouts/admin"))
const IngredientGrid = lazy(() => import("../pages/admin/ingredients/sections/grid/IngredientGrid"))
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