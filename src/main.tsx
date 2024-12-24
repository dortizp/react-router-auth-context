import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login, { action as loginAction } from "./routes/Login";
import { loader as loginLoader } from "./routes/Login";
import Notes from "./routes/Notes";
import { loader as notesLoader } from "./routes/Notes";
import { authProvider } from "./auth";
import { redirect } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Notes />,
    loader: notesLoader,
    children: [
      {
        path: "trashNotes",
        element: <h1>Trash Notes</h1>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
    loader: loginLoader,
  },
  {
    path: "/logout",
    action() {
      // authProvider.logout();
      return redirect("/login");
    },
  },
]);
createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
