import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage/HomePage";
import UserTable from "../components/pages/UserPage/UserTable";
import UserPage from "../components/pages/UserPage/UserPage";
import BlogPostTable from "../components/pages/BlogPostPage/BlogPostTable";
import BlogPostPage from "../components/pages/BlogPostPage/BlogPostPage";
import UserHomePage from "../components/pages/HomePage/UserHomePage";
import BlogPostPublicPage from "../components/pages/BlogPostPage/BlogPostPublicPage";
import Register from "../components/pages/RegisterPage/RegisterPage";
import BlogPostsPublicPage from "../components/pages/BlogPostPage/BlogPostsPublicPage";
import SingleUser from "../components/pages/UserPage/SingleUser";
import authorities from "../config/Authorities";
import AdminTable from "../components/pages/AdminPage/AdminTable";
import AdminPage from "../components/pages/AdminPage/AdminPage";
/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {

  const handleBackHome = () => {
      window.location.href = "/";
  };

  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      {/* Alle (default) User haben auf diese Endpunkte zugriff */}
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/blogs"} element={<BlogPostsPublicPage />} />
      <Route path={"/blog/:blogPostId"} element={<BlogPostPublicPage />} />

      {/* Nur eingeloggte User haben auf diese Endpunkte zugriff */}
      <Route
        path={"/home"}
        element={
          <PrivateRoute authorities={[
            { id: authorities.DEFAULT, name: authorities.DEFAULT }
          ]} element={<UserHomePage />}></PrivateRoute>
        }
      />
      <Route
        path={"/dashboard/:userId"}
        element={
          <PrivateRoute authorities={[
            { id: authorities.BLOG_MODIFY_BY_ID, name: authorities.BLOG_MODIFY_BY_ID }
          ]} element={<BlogPostTable />}></PrivateRoute>
        }
      />
      <Route
        path={"/blogadd"}
        element={
          <PrivateRoute authorities={[
            { id: authorities.BLOG_CREATE, name: authorities.BLOG_CREATE }
          ]} element={<BlogPostPage />}></PrivateRoute>
        }
      />
      <Route
        path={"/blogedit/:blogPostId"}
        element={
          <PrivateRoute authorities={[
            { id: authorities.BLOG_MODIFY_BY_ID, name: authorities.BLOG_MODIFY_BY_ID },
            { id: authorities.BLOG_DELETE_BY_ID, name: authorities.BLOG_DELETE_BY_ID }
          ]} element={<BlogPostPage />}></PrivateRoute>
        }
      />
      <Route
        path={"/user/:userId"}
        element={<PrivateRoute authorities={[
          { id: authorities.USER_READ_BY_ID, name: authorities.USER_READ_BY_ID }
        ]} element={<SingleUser />} />}
      />
      <Route
        path="/useredit/:userId"
        element={
          <PrivateRoute authorities={[
            { id: authorities.USER_MODIFY_SELF, name: authorities.USER_MODIFY_SELF }
          ]} element={<UserPage />}></PrivateRoute>
        }
      />

      {/* Nur Admins haben auf diese Endpunkte zugriff */}
      <Route
        path={"/admin"}
        element={
          <PrivateRoute authorities={[
            { id: authorities.USER_MODIFY, name: authorities.USER_MODIFY }
          ]}
            element={<AdminTable />}></PrivateRoute>
        }
      />
      <Route
        path={"/adminedit/:blogPostId"}
        element={
          <PrivateRoute authorities={[
            { id: authorities.USER_MODIFY, name: authorities.USER_MODIFY }
          ]}
            element={<AdminPage />}></PrivateRoute>
        }
      />
      <Route
        path={"/users"}
        element={<PrivateRoute authorities={[
          { id: authorities.USER_MODIFY, name: authorities.USER_MODIFY }
        ]} element={<UserTable />} />}
      />
      <Route
        path="/useredit"
        element={
          <PrivateRoute authorities={[
            { id: authorities.USER_MODIFY, name: authorities.USER_MODIFY }
          ]} element={<UserPage />}></PrivateRoute>
        }
      />

      <Route path="*" element={
        <div>
          <div>Not Found</div>
          <button onClick={handleBackHome}>Back Home</button>
        </div>
      } />
    </Routes>
  );
};

export default Router;
