import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import LandingPage from "./screens/landingpage/LandingPage";
import SignUpScreen from "./screens/signup/SignUpScreen";
import MyNotes from "./screens/mynotes/MyNotes";
import LoginScreen from "./screens/login/LoginScreen";
import CreateNote from "./screens/createnote/CreateNote";
import UpdateNote from "./screens/updatenote/UpdateNote";
import ProtectedRoute from "./screens/ProtectedRoutes";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { useState } from "react";
import ProfileScreen from "./screens/profile/ProfileScreen";

function App() {
  const [search ,setSearch] = useState("")
      
       
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header setSearch={setSearch} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/mynotes"
              element={
                  <MyNotes search={search} />
                // <ProtectedRoute>
                // </ProtectedRoute>
              }
            />
            <Route path="/mynotes/createnote" element={<CreateNote />} />
            <Route path="/note/:id" element={<UpdateNote />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
