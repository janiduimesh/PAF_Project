import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import My_Uploads from "./pages/My_Uploads";
import ForgotPassword from "./pages/ForgotPassword";
import Recipies from "./pages/Recipies";
import FullRecipies from "./pages/Full_Recipies";
import MyRecipies from "./pages/My_Recipies";
import UpdateRecipie from "./pages/Update_Recipie";
import InsertRecipies from "./pages/Insert_Recipies";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";

// Components
import OAuthSuccess from "./components/OAuthSuccess";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPasswordConfirm />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        {/* 🔐 Protected Routes (require token via PrivateRoute) */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipes" element={<Recipies />} />
          <Route path="/my-uploads" element={<My_Uploads />} />
          <Route path="/fullrecipies/:id" element={<FullRecipies />} />
          <Route path="/myrecipies" element={<MyRecipies />} />
          <Route path="/insertrecipie" element={<InsertRecipies />}/>
          <Route path="/updaterecipie/:id" element={<UpdateRecipie />}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
