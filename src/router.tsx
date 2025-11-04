import { createBrowserRouter, redirect } from "react-router-dom";
import DynamicPage, { dynamicLoader } from "./screens/DynamicPage";
import IntelDetail, { intelDetailLoader } from "./screens/IntelDetail";
import NotFound from "./screens/NotFound";


export const router = createBrowserRouter([
{ path: "/", loader: () => redirect("/intel-updates") },
{ path: ":page", loader: dynamicLoader, element: <DynamicPage />, errorElement: <NotFound /> },
{ path: "intel/:id", loader: intelDetailLoader, element: <IntelDetail />, errorElement: <NotFound /> },
{ path: "*", element: <NotFound /> },
]);