import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage/HomePage";
import UserTable from "../components/pages/UserPage/UserTable";
import UserPage from "../components/pages/UserPage/UserPage";
import BlogPostTable from "../components/pages/BlogPostPage/BlogPostTable";
import BlogPostPage from "../components/pages/BlogPostPage/BlogPostPage";
import AdminPage from "../components/pages/AdminPage/AdminPage";
import UserHomePage from "../components/pages/HomePage/UserHomePage";
import BlogPostPublicPage from "../components/pages/BlogPostPage/BlogPostPublicPage";

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />

      <Route
        path={"/home"}
        element={
          <PrivateRoute authorities={[]} element={<UserHomePage />}></PrivateRoute>
        }
      />

      <Route
        path={"/blogs"}
        element={
          <PrivateRoute authorities={[]} element={<BlogPostPublicPage />}></PrivateRoute>
        }
      />
      <Route
        path={"/blogposts"}
        element={
          <PrivateRoute authorities={[]} element={<BlogPostTable />}></PrivateRoute>
        }
      />
      <Route
        path={"/blogpostedit"}
        element={
          <PrivateRoute authorities={[]} element={<BlogPostPage />}></PrivateRoute>
        }
      />

      <Route
        path={"/admin"}
        element={
          <PrivateRoute authorities={[]} element={<AdminPage />}></PrivateRoute>
        }
      />

      <Route
        path={"/users"}
        element={<PrivateRoute authorities={[]} element={<UserTable />} />}
      />
      <Route
        path="/useredit"
        element={
          <PrivateRoute authorities={[]} element={<UserPage />}></PrivateRoute>
        }
      />
      <Route
        path="/useredit/:userId"
        element={
          <PrivateRoute authorities={[]} element={<UserPage />}></PrivateRoute>
        }
      />

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;
