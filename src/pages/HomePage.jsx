import HeroSection from "../components/HeroSection";
import IntroSection from "../components/IntroSection";
import WeeklyTopicSection from "../components/WeeklyTopicSection";
import QuickAccessSection from "../components/QuickAccessSection";
import EventsSection from "../components/EventsSection";
import AnnouncementsSection from "../components/AnnouncementsSection";
import AchievementsSection from "../components/AchievementsSection";

export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <IntroSection />
      <WeeklyTopicSection />
      <QuickAccessSection />
      <EventsSection />
      <AnnouncementsSection />
      <AchievementsSection />
    </div>
  );
}

