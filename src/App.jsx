import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import HomePage from "./pages/HomePage";
import TopicOfTheWeekPage from "./components/TopicOfTheWeekPage";
import OASheetPage from "./pages/OASheetPage";
import ResourcesPage from "./pages/ResourcesPage";
import EventsPage from "./pages/EventsPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/totw" element={<TopicOfTheWeekPage />} />
          <Route path="/topic-of-the-week" element={<Navigate to="/totw" replace />} />
          <Route path="/sheet" element={<OASheetPage />} />
          <Route path="/sheets" element={<Navigate to="/sheet" replace />} />
          <Route path="/oa-sheet" element={<Navigate to="/sheet" replace />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
