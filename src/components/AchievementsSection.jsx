import { cpsAchievements } from "../data/achievements";

export default function AchievementsSection() {
  return (
    <section className="achievements-section section-padding" id="achievements">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">Verified Milestones</div>
          <h2 className="section-title">CPS Achievements & Community Impact</h2>
          <p className="section-subtitle">
            A verified tradition of competitive programming excellence, alumni mentorship, and student-driven contest culture at PICT.
          </p>
        </div>

        {/* Milestones Grid (No fabricated metrics) */}
        <div className="achievements-grid">
          {cpsAchievements.map((item) => (
            <article key={item.id} className="achievement-card">
              <span className="achievement-badge">{item.badge}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
