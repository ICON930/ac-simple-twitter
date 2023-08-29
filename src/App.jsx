import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage/AdminLoginPage.jsx";
import AdminMainPage from "./pages/AdminMainPage/AdminMainPage.jsx";
import AdminUserPage from "./pages/AdminUserPage/AdminUserPage.jsx";
import MainPage from "./pages/MainPage/MainPage";
import UserPage from "./pages/UserPage/UserPage";
import SettingPage from "./pages/SettingPage/SettingPage";
import ReplyTweetPage from "./pages/ReplyTweetPage/ReplyTweetPage";
import FollowerPage from "./pages/FollowerPage/FollowerPage";
import { AuthProvider } from "./contexts/AuthContext.jsx";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="admin/login" element={<AdminLoginPage />} />
            <Route path="admin/main" element={<AdminMainPage />} />
            <Route path="admin/users" element={<AdminUserPage />} />
            <Route path="main" element={<MainPage />} />
            <Route path="user">
              <Route path=":id" element={<UserPage />} />
            </Route>        
            {/* :tab = "reply" or "like" */}
            <Route path="setting" element={<SettingPage />} />
            <Route path="tweets/:tweetid" element={<ReplyTweetPage />} />
            <Route path="follower" element={<FollowerPage />} />
            <Route path="following" element={<FollowerPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
