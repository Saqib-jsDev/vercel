import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import LandingPage from "./screens/landingpage/LandingPage";
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import MyNotes from "./screens/MyNotes";

function App() {
  return (

    <BrowserRouter className="App">
      <Header />
      <Routes >
        <Route path='/' element={<LandingPage />} />
        <Route path="/mynotes" element={<MyNotes />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
