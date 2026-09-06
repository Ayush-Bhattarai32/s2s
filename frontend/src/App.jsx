import { Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Team from "./components/Team";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Review from "./components/Review";
import Gallery from "./components/Gallery";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import Admin from "./components/Admin";
import ProtectedAdmin from "./components/ProtectedAdmin";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Team />
      <Services />
      <Testimonials />
      <Review />
      <Gallery />
      <Registration />
      <Footer />
    </>
  );
}

function App() {
  return (
    
     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/admin" element={<AdminLogin />} />
  <Route
    path="/admin/dashboard"
    element={
      <ProtectedAdmin>
        <Admin />
      </ProtectedAdmin>
    }
  />
</Routes>
  
  );
}

export default App;