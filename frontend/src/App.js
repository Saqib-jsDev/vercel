import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import LandingPage from "./screens/landingpage/LandingPage";
import SignUpScreen from "./screens/signup/SignUpScreen";
import MyNotes from "./screens/mynotes/MyNotes";
import LoginScreen from "./screens/login/LoginScreen";
import ProtectedRoute from "./screens/ProtectedRoutes";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/mynotes"
              element={
                <ProtectedRoute>
                  <MyNotes />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
