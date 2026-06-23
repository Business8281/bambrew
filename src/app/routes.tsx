import { createBrowserRouter, Outlet } from "react-router";
import HomePage from "../imports/HomePage";
import AboutUs from "../imports/AboutUs";
import Impacts from "../imports/Impacts";
import Products from "../imports/Products";
import ProductsDescription from "../imports/ProductsDescription";
import { ResponsiveLayout } from "./components/ResponsiveLayout";

function Root() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { 
        index: true, 
        element: <ResponsiveLayout height={8598}><HomePage /></ResponsiveLayout> 
      },
      { 
        path: "about", 
        element: <ResponsiveLayout height={7048}><AboutUs /></ResponsiveLayout> 
      },
      { 
        path: "impacts", 
        element: <ResponsiveLayout height={6768}><Impacts /></ResponsiveLayout> 
      },
      { 
        path: "products", 
        element: <ResponsiveLayout height={8438}><Products /></ResponsiveLayout> 
      },
      { 
        path: "products/:id", 
        element: <ResponsiveLayout height={4189}><ProductsDescription /></ResponsiveLayout> 
      },
    ],
  },
]);