export default function ResourceDisclaimerPage() {
  return (
    <div className="resource-disclaimer-page section-padding">
      <div className="container resource-disclaimer-container">
        <header className="topic-page-header">
          <span className="week-badge">About CPS Learning Resources</span>
          <h1 className="topic-page-title">Resource Disclaimer</h1>
          <p className="topic-page-desc">
            How to understand the sources, accuracy and intended use of educational resources shared on CPS.
          </p>
        </header>

        <div className="resource-disclaimer-sections">
          <section className="resource-disclaimer-section">
            <h2>Source of information</h2>
            <p>
              Some interview questions and company experiences come from student feedback, reported experiences,
              word of mouth and peer discussions. Other learning materials may link to publicly accessible
              educational platforms and third-party sources. CPS may not independently verify every report or resource.
            </p>
          </section>

          <section className="resource-disclaimer-section">
            <h2>No guarantee of interview questions</h2>
            <p>
              A question listed on CPS is not a promise that it will appear in an interview or online assessment.
              Hiring processes, question patterns and difficulty can change. Company tags describe reported
              associations or preparation relevance; they are not official confirmation or endorsement. Use these
              materials as a preparation guide, not a prediction of future interviews.
            </p>
          </section>

          <section className="resource-disclaimer-section">
            <h2>Third-party resources and ownership</h2>
            <p>
              LeetCode and other external platforms retain ownership of their respective content, names, trademarks
              and materials. CPS is an independent student community resource and does not claim ownership of
              third-party questions, editorials, videos or other external materials. CPS retains its own rights in
              original content it creates. External links lead to third-party websites, whose content and availability
              may change without notice.
            </p>
          </section>

          <section className="resource-disclaimer-section">
            <h2>Accuracy and responsibility</h2>
            <p>
              CPS aims to keep shared resources useful, but cannot guarantee their accuracy, completeness,
              availability or continued relevance. Please independently verify information when needed and use your
              own judgment when making decisions based on these materials.
            </p>
          </section>

          <section className="resource-disclaimer-section">
            <h2>Educational purpose</h2>
            <p>
              CPS resources support competitive programming, data structures and algorithms preparation, placement
              and internship preparation, peer learning and educational collaboration.
            </p>
          </section>

          <section className="resource-disclaimer-section">
            <h2>Corrections and contributions</h2>
            <p>
              If you notice incorrect problem details, a broken link, an inaccurate company association, outdated
              information or other content that needs attention, please report it to a CPS administrator or through
              the CPS contribution channels used by your student community.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
