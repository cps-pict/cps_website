import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import IntroSection from "./components/IntroSection";
import WeeklyTopicSection from "./components/WeeklyTopicSection";
import EventsSection from "./components/EventsSection";
import QuickAccessSection from "./components/QuickAccessSection";
import AnnouncementsSection from "./components/AnnouncementsSection";
import AchievementsSection from "./components/AchievementsSection";
import TopicOfTheWeekPage from "./components/TopicOfTheWeekPage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("home");

  // Synchronize hash routing on mount and hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "topic-of-the-week") {
        setCurrentView("topic-of-the-week");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setCurrentView("home");
        if (hash && hash !== "home") {
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleNavigate = (view, hash) => {
    if (view === "topic-of-the-week") {
      setCurrentView("topic-of-the-week");
      window.history.pushState(null, "", "#topic-of-the-week");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentView("home");
      window.history.pushState(null, "", hash || "#home");
      if (hash && hash !== "#home") {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {currentView === "home" ? (
        <main className="app-main">
          <HeroSection
            onExploreTopic={() => handleNavigate("topic-of-the-week", "#topic-of-the-week")}
            onExploreResources={() => handleNavigate("home", "#resources")}
          />
          <IntroSection />
          <WeeklyTopicSection
            onExploreTopic={() => handleNavigate("topic-of-the-week", "#topic-of-the-week")}
          />
          <EventsSection />
          <QuickAccessSection
            onExploreTopic={() => handleNavigate("topic-of-the-week", "#topic-of-the-week")}
          />
          <AnnouncementsSection />
          <AchievementsSection />
        </main>
      ) : (
        <main className="app-main">
          <TopicOfTheWeekPage onBackToHome={() => handleNavigate("home", "#home")} />
        </main>
      )}

      <Footer onNavigate={handleNavigate} />
    </>
  );
}

export default App;
