import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FeatureGate from "./components/FeatureGate";

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
      <AuthProvider>
        <ScrollToTop />
        <Navbar />

        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <FeatureGate feature="home" pageName="Homepage">
                  <HomePage />
                </FeatureGate>
              }
            />
            <Route
              path="/totw"
              element={
                <FeatureGate feature="totw" pageName="Topic of the Week">
                  <TopicOfTheWeekPage />
                </FeatureGate>
              }
            />
            <Route path="/topic-of-the-week" element={<Navigate to="/totw" replace />} />
            <Route
              path="/sheet"
              element={
                <FeatureGate feature="sheet" pageName="Must-Try OA Sheet">
                  <OASheetPage />
                </FeatureGate>
              }
            />
            <Route path="/sheets" element={<Navigate to="/sheet" replace />} />
            <Route path="/oa-sheet" element={<Navigate to="/sheet" replace />} />
            <Route
              path="/resources"
              element={
                <FeatureGate feature="resources" pageName="Learning Resources">
                  <ResourcesPage />
                </FeatureGate>
              }
            />
            <Route
              path="/events"
              element={
                <FeatureGate feature="events" pageName="Events & Sessions">
                  <EventsPage />
                </FeatureGate>
              }
            />
            <Route
              path="/about"
              element={
                <FeatureGate feature="about" pageName="About CPS">
                  <AboutPage />
                </FeatureGate>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
