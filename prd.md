## P RODUCT REQUIREMENTS DOCUMENT ( PRD)

## C PS — Competitive Programming S ociety, PICT

D ocument Version: 1.0

P roduct: CPS Website & Learning Platform

O rganization: Competitive Programming Society, Pune Institute of Computer Technology

S tatus: Proposed

P roduct Owner: CPS Core Team

## 1 . Product Overview

## 1 .1 Introduction

T he Competitive Programming Society (CPS) at Pune Institute of Computer Technology a ims to build a centralized digital platform for competitive programming enthusiasts at PICT.

T he platform will serve as a learning resource, problem-solving hub, and community portal w here students can discover algorithmic concepts, access curated problem sets, explore c ompetitive programming resources, stay informed about upcoming events, and revisit p revious CPS sessions.

T he website will initially be a lightweight, content-driven platform, with a roadmap toward a p ersonalized learning experience featuring user profiles, progress tracking, competitive p rogramming statistics, leaderboards, and notifications.

## 1 .2 Product Vision

T o build a comprehensive competitive programming ecosystem at PICT that makes learning a lgorithms accessible, encourages consistent problem-solving, promotes competitive p rogramming culture, and connects students with opportunities to improve their skills.

C ore philosophy: Learn. Practice. Compete.


## 1 .3 Problem Statement

C ompetitive programming resources, curated problem sets, learning materials, session r ecordings, and event announcements are often scattered across multiple platforms and c ommunication channels.

T his creates several problems:

- Students struggle to discover structured learning resources.

- Curated problem sets and their solutions are difficult to access centrally.

- Previous CPS sessions and their recordings are not easily discoverable.

- Students may miss upcoming sessions, contests, and learning opportunities.

- There is no centralized platform to track learning progress or explore the competitive p rogramming activities of the community.

T he CPS platform aims to solve these problems through a centralized, searchable, and s tructured learning ecosystem.

## 2 . Target Audience & User Personas

## 2 .1 Beginners

S tudents who are new to competitive programming and want structured guidance on a lgorithms, data structures, and problem-solving techniques.

## P rimary needs:

- Beginner-friendly learning resources.

- Structured topic-wise problem sets.

- Gradually increasing problem difficulty.

- Access to previous learning sessions.

## 2 .2 Intermediate and Advanced CP Enthusiasts

S tudents who actively participate in contests and want to strengthen their algorithmic k nowledge.

## P rimary needs:

- Curated medium-to-hard problems.

- Exposure to different algorithmic patterns and variations.

- High-quality OA and interview problem sets.

- Access to contest-related resources.


## 2 .3 Placement and Internship Aspirants

S tudents preparing for technical interviews and online assessments.

## P rimary needs:

- Company-oriented problem collections.

- Must-try LeetCode problems.

- Topic-wise practice sheets.

- Solution explanations and video resources.

## 2 .4 CPS Members and Organizers

S tudents responsible for conducting sessions, curating resources, and organizing c ompetitive programming activities.

## P rimary needs:

- A centralized platform to publish content.

- Easy management of events and learning resources.

- Better visibility for CPS initiatives.

- A platform to showcase community achievements.

## 3 . Product Scope & Release Strategy

T he product will be developed incrementally, with each release delivering meaningful f unctionality.

## V 1 — Learning & Community Platform

O bjective: Establish CPS's digital presence and provide a centralized platform for learning r esources, problem sets, sessions, and events.

V 1 will primarily be a static/content-driven website without student authentication.

## F eatures

| I D | F eature | P riority |
| --- | --- | --- |
| F 01 H omepage and CPS introduction |   | M ust Have |
| F 02 T opic of the Week |   | M ust Have |


F 03 W eekly Topic Archive

M ust Have

F 04 C urated Topic-wise Problem Sets

M ust Have

F 05 G lobal Search

M ust Have

F 06 L eetCode POTD Video Archive

S hould Have

F 07 U pcoming Events and CPS Sessions

M ust Have

F 08 P revious CPS Sessions Archive

M ust Have

F 09 M ust-Try LeetCode / OA Sheet

M ust Have

F 10 A bout CPS and Team

M ust Have

F 11 C PS Registration

M ust Have

F 12 R esponsive Design and Accessibility

M ust Have

## V 2 — Personalized Learning Platform

O bjective: Introduce user accounts, personalized progress tracking, and competitive p rogramming statistics.

## F eatures

| I D | F eature |
| --- | --- |
| F 13 | U ser Registration and Authentication |
| F 14 C ompetitive Programming Profile Integration |   |
| F 15 | P ersonalized User Dashboard |
| F 16 | P roblem-Solving Progress Tracking |
| F 17 | T opic-wise Progress Statistics |
| F 18 Y ear-wise and College-wise Leaderboards |   |
| F 19 C ompetitive Programming Statistics |   |

## V 2.1 — Community & Knowledge Sharing

O bjective: Encourage knowledge sharing and contributions from the CPS community.


## F eatures

- CP blogs and technical articles.

- Contest experiences and learning journeys.

- Internship and OA experiences.

- User-submitted editorials and problem explanations.

- Moderated content publishing workflow.

## V 2.2 — Notifications & Engagement

O bjective: Keep students informed about new learning content and CPS activities.

## F eatures

- Notifications for newly published weekly topics.

- Notifications for newly added problem sheets and resources.

- Notifications for upcoming CPS sessions and events.

- Notifications when new session recordings are published.

- Personalized notification preferences.

- Email and optional web push notifications.

- Notification history and read/unread status.

N otifications should be configurable, allowing users to subscribe to the categories they are i nterested in rather than receiving every update.

## 4 . Functional Requirements — V1

## F 01. Homepage

T he homepage will act as the central entry point to the CPS platform.

## R equirements

- Display CPS branding, logo, and navigation.

- Introduce CPS and its mission.

- Highlight the currently featured Topic of the Week.

- Display upcoming CPS sessions and events.

- Provide quick access to:

- Weekly topics.

- Curated problem sheets.

- LeetCode POTD.


- OA practice sheets.

- Previous CPS sessions.

- Display important announcements where relevant.

- Provide prominent links to join CPS and explore its activities.

- Highlight important CPS achievements and milestones.

## A cceptance Criteria

- Users can navigate to all major website sections from the homepage.

- The latest published weekly topic is prominently displayed.

- Upcoming events are easily discoverable.

- All homepage sections render correctly on mobile and desktop.

## F 02. Topic of the Week

T his will be one of the platform's primary features.

C PS will publish a structured learning module every week, focusing on a specific algorithmic

c oncept or problem-solving technique.

## T opic Page Structure

E ach topic should contain:

- 1 . Topic title and description.

- 2 . Week number and publication date.

- 3 . Introduction and motivation.

- 4 . Important concepts and algorithmic patterns.

- 5 . Prerequisites, where applicable.

- 6 . Curated learning resources.

- 7 . Topic-wise problem set.

- 8 . Additional practice resources, where available.

## L earning Resources

R esources may include:

- Articles and documentation.

- YouTube tutorials.

- CP-algorithms and other technical references.

- Notes and presentations.

- Relevant external learning materials.

## C urated Problem Set

E ach topic should ideally contain 15–20 problems.


P roblems should be arranged in increasing order of difficulty:

- Easy: Basic understanding and implementation.

- Medium: Standard applications and variations.

- Hard: Advanced applications and combinations of concepts.

E ach problem should include:

## F ield D escription

## P roblem Name P latform P roblem URL D ifficulty T ags H int E ditorial N ame of the problem C odeforces, CSES, LeetCode, etc. D irect problem link E asy / Medium / Hard or platform rating R elevant algorithmic concepts O ptional problem-solving hint O ptional explanation or solution link

## I mportant Requirement

T he problem set should provide deliberate coverage of different variations and applications o f the topic rather than simply containing unrelated problems of similar difficulty.

## F 03. Weekly Topic Archive

U sers should be able to explore previous, current, and upcoming weekly topics.

## R equirements

- Display topics in a chronological archive.

- Show topic title, week number, and publication status.

- Allow users to open previously published topics.

- Display upcoming topics where the schedule has been announced.

- Provide search and filtering by topic/category.

- Clearly distinguish published and upcoming content.

A chronological list or card-based archive is preferred over a conventional calendar.

## F 04. Global Search


## P riority: Must Have — V1

T he website must provide a centralized search functionality that allows users to quickly

d iscover content across different sections.

## S earchable Content

G lobal search should index the following entities:

## E ntity S earchable Fields

W eekly Topics

P roblems

R esources

C PS Sessions

E vents

L eetCode POTD

O A Sheet

T opic title, description, tags

P roblem name, platform, difficulty, tags

R esource title, description, associated topic

S ession name, mentor/speaker, description

E vent name, category, description

P roblem name, date, difficulty

P roblem name, company tags, topic tags

## S earch Behaviour

- Search should be accessible from the global navigation bar.

- Users should be able to search across all supported content types.

- Results should be grouped by category.

- Each result should display its title, category, and relevant metadata.

- Clicking a result should navigate directly to its corresponding page or external r esource.

- Display a meaningful empty state when no results are found.

- Search should support partial and case-insensitive matching.

- Search results should be ranked based on relevance.

## F ilters

U sers should be able to filter search results by:

- Content type: Topics, Problems, Resources, Sessions, Events.

- Difficulty: Easy, Medium, Hard, where applicable.

- Topic/category.

- Platform, where applicable.


## S uggested UX

T he search interface should ideally support:

- Search overlay or dedicated search page.

- Instant search suggestions.

- Keyboard navigation.

- Clear search functionality.

- Recently searched queries, if practical.

## A cceptance Criteria

- Searching for a topic returns its corresponding topic page.

- Searching for a problem returns its problem entry and associated topic, where a pplicable.

- Searching for a session returns its details and recording link, if available.

- Searching for a resource returns the corresponding resource.

- Results are grouped and distinguishable by content type.

- Search works across all published content.

## F 05. LeetCode POTD Archive

C PS will maintain a collection of daily LeetCode Problem of the Day solution videos p ublished on its YouTube channel.

## R equirements

E ach entry should contain:

- Date.

- Problem name.

- LeetCode problem link.

- Difficulty.

- CPS solution video link.

- Relevant topic tags.

## N avigation

- Display problems in chronological order.

- Provide a monthly archive/calendar view.

- Allow navigation between months.

- Allow filtering by difficulty and topic.

- Provide direct access to the LeetCode problem and corresponding CPS video.

## P erformance


Y ouTube videos should preferably be displayed using thumbnails or lightweight previews. T he actual embedded player should load only when required to avoid unnecessary p age-loading overhead.

## F 06. Events & CPS Sessions

T his section will centralize upcoming CPS activities and provide an archive of previous l earning sessions.

## U pcoming Events

E ach event should contain:

- Event name.

- Event description.

- Date and time.

- Event category.

- Speaker/mentor, if applicable.

- Venue or meeting link.

- Registration link, if applicable.

E vent categories may include:

- CPS Learning Sessions.

- Competitive Programming Contests.

- Workshops and Bootcamps.

- ICPC-related Activities.

- Other CPS Events.

## P revious CPS Sessions

U sers should be able to browse previously conducted CPS sessions.

E ach session should contain:

- Session title.

- Date.

- Mentor/speaker.

- Topics covered.

- YouTube recording link.

- Presentation/notes, where available.

- Associated practice sheet, where available.

## A cceptance Criteria

- Upcoming and previous sessions should be distinguishable.


- Users should be able to access recordings of previous sessions.

- Events should display accurate dates and registration information.

- Past events should remain accessible through the archive.

## F 07. Must-Try LeetCode / OA Sheet

C PS will maintain a curated collection of high-quality LeetCode and online assessment p roblems encountered during internship and placement preparation.

## O bjective

H elp students prepare for technical interviews and online assessments through a structured c ollection of important problems.

## O rganization

P roblems may be categorized by:

- Company.

- Algorithmic topic.

- Difficulty.

- Source or context, where verifiable.

## P roblem Information

E ach problem should contain:

- Problem name.

- Platform and direct link.

- Difficulty.

- Relevant algorithmic tags.

- Company/source tags, where applicable.

- Editorial or solution link, if available.

## R equirements

- Users should be able to browse the entire sheet.

- Filtering by topic, difficulty, and company should be supported.

- Problem links should open the original platform.

- The collection should be regularly maintained and curated.

## F 08. About CPS & Team

T his section will introduce the organization and showcase its activities.


## A bout CPS

- CPS introduction.

- Mission and vision.

- Learning initiatives.

- Competitive programming culture at PICT.

- Important milestones and achievements.

## T eam

- Core team members.

- Mentors and faculty guidance.

- Member names, roles, and photographs, where approved.

- Relevant profiles or social links, where applicable.

## F 09. CPS Registration

T he website should provide a prominent call to action for students interested in joining CPS.

## R equirements

- Display a Join CPS button.

- Redirect users to the official CPS registration form.

- Registration link: https://forms.gle/sk8J5zMgAmK5jpB79 [URL 🔗](https://forms.gle/sk8J5zMgAmK5jpB79)

- Registration should open in a new tab.

N o in-house registration or authentication system is required for V1.

## 5 . Functional Requirements — Future R eleases

## F 10. User Authentication & Profiles

U sers will be able to create accounts and access personalized features.

## R equirements

- Google-based authentication.

- Unique user profiles.

- Profile information and academic year.


- Ability to link supported competitive programming accounts.

- Privacy and visibility settings.

- Secure authentication and authorization.

## F 11. Competitive Programming Profile Integration

U sers should be able to link their competitive programming profiles.

P otential integrations:

- Codeforces.

- CodeChef.

- LeetCode.

- Other platforms where reliable data access is available.

## R equirements

- Allow users to provide profile handles.

- Validate supported profile links.

- Fetch available public statistics through supported APIs or integrations.

- Display ratings and relevant contest statistics where available.

- Handle unavailable or outdated external data gracefully.

T he platform should not rely on unauthorized scraping or assume all platforms provide e quivalent API access.

## F 12. Personalized Dashboard & Progress Tracking

E ach registered user should have a personalized dashboard.

## F eatures

- Total problems solved from CPS sheets.

- Topic-wise progress.

- Weekly topic completion.

- Problem-solving history.

- Linked competitive programming profiles.

- Personal statistics.

## P roblem Completion

U sers should initially be able to mark problems as solved manually.

W here reliable integrations become available, verified progress synchronization can be i ntroduced.


## F 13. Statistics & Leaderboards

T he platform should provide insights into competitive programming activity within the CPS c ommunity.

## P otential Statistics

- Total problems solved.

- Problems solved by topic.

- Problems solved by difficulty.

- Contest participation.

- Rating progression, where available.

## L eaderboards

- CPS member leaderboard.

- Year-wise rankings.

- College-wise rankings, where data is available.

- Monthly activity rankings.

L eaderboards should distinguish between manually tracked sheet progress and verified c ontest/platform statistics.

A ppropriate user consent and visibility controls must be implemented.

## F 14. CP Blogs & Community Contributions

C PS members should eventually be able to contribute articles and experiences.

## C ontent Categories

- Competitive programming tutorials.

- Algorithm explanations.

- Contest editorials.

- ICPC experiences.

- Internship and OA experiences.

- Competitive programming journeys.

- Learning roadmaps.

## R equirements

- Content submission workflow.

- Editorial review and moderation.

- Author attribution.

- Categorization and tagging.


- Search and discovery.

I nitially, publishing should require approval from authorized CPS editors.

## F 15. Notification System

## P lanned for V2.2 — Notifications & Engagement

T he platform should eventually notify users about important CPS updates and newly p ublished learning content.

## N otification Categories

- 1 . New Weekly Topics

- Notify users when a new weekly topic is published.

- Include the topic title and direct link.

- 2 . New Learning Resources

- Notify users when important resources or problem sheets are added.

- 3 . Upcoming CPS Sessions

- Notify users about newly announced sessions and events.

- Include date, time, description, and registration link.

- 4 . Previous Session Recordings

- Notify users when a recording of a completed CPS session becomes a vailable.

## N otification Channels

P otential delivery mechanisms:

- In-app notification center.

- Email notifications.

- Web push notifications (optional).

## U ser Preferences

U sers should be able to:

- Subscribe to notification categories.

- Enable or disable email notifications.

- Enable or disable browser notifications.

- View previous notifications.

- Mark notifications as read.

## D esign Considerations

- Avoid duplicate notifications.


- Do not send notifications for every minor content edit.

- Respect user preferences and consent.

- Ensure notifications link directly to relevant website content.

## 6 . Non-Functional Requirements

## 6 .1 Performance

- Website should load quickly on standard mobile and desktop connections.

- Optimize images and media.

- Use lazy loading for non-critical media.

- Avoid unnecessary JavaScript and heavy third-party scripts.

- Search should return results with minimal latency for the expected content volume.

## 6 .2 Responsiveness

T he website must work across:

- Desktop browsers.

- Laptops.

- Tablets.

- Mobile devices.

M obile usability should be treated as a first-class requirement.

## 6 .3 Accessibility

- Semantic HTML.

- Keyboard-accessible navigation.

- Appropriate color contrast.

- Meaningful labels and alternative text.

- Visible focus indicators.

## 6 .4 Reliability

- All external links should be validated periodically.

- Website should handle unavailable external resources gracefully.

- Content should not disappear due to accidental updates.

- Production deployments should support rollback.


## 6 .5 Security

- HTTPS.

- No hardcoded credentials or API keys.

- Secure handling of environment variables.

- Input validation for dynamic features.

- Appropriate access control for future administrative and user functionality.

- No unauthorized exposure of user information.

## 6 .6 Maintainability

- Modular and reusable code.

- Consistent coding conventions.

- Shared UI components.

- Documented data structures and content formats.

- Automated quality checks.

- Clear ownership of content and application modules.

## 7 . Content Management & Maintenance

S ince CPS will continuously publish new topics, problems, resources, and sessions, content m aintenance must be considered from the beginning.

## V 1 Content Management

T he initial website may use a static content-management approach, such as M arkdown/MDX, structured JSON or another suitable content source.

T he content workflow should allow authorized CPS contributors to update:

- Weekly topics.

- Problem sheets.

- LeetCode POTD entries.

- Events.

- Previous session recordings.

- OA sheets.

- Team information.

C ontent updates should not require modifying unrelated application logic.

## F uture Content Management


A lightweight admin dashboard or CMS may be introduced when content publishing b ecomes difficult to manage through the initial workflow.

T he system should eventually support:

- Creating and editing content.

- Publishing and unpublishing.

- Scheduling future topics.

- Updating event information.

- Managing resource links.

- Managing announcements.

- Role-based content permissions.

## 8 . Success Metrics

T he success of the platform should be evaluated based on actual student engagement and u sefulness.

## V 1 Metrics

## M etric

W eekly topic views

P roblem link clicks

R esource clicks

S ession recording views/clicks

E vent registration clicks

S earch usage

S earch success rate

W ebsite visitors

## F uture Metrics

- Registered users.

- Weekly and monthly active users.

- Problems solved through CPS sheets.

- Topic completion rates.

W hat It Measures

O verall reach

L earning content engagement

P roblem-solving interest

L earning resource usage

E ngagement with past sessions

P articipation interest

C ontent discovery

W hether users find what they need


- User retention.

- Notification engagement.

- Blog contributions.

A nalytics should be privacy-conscious and should not collect unnecessary personal i nformation.

## 9 . Out of Scope for V1

T he following features will explicitly not be included in the initial release:

- Student authentication.

- User profiles.

- Automatic competitive programming profile synchronization.

- Personal problem-solving dashboards.

- In-house online judge.

- Code submission and execution.

- Personalized recommendations.

- Leaderboards.

- Blog publishing system.

- Notification infrastructure.

- In-house event registration and payment system.

T hese features may be considered in subsequent releases based on user feedback and a vailable development resources.

## 1 0. V1 Acceptance Criteria & Launch R eadiness

T he first release will be considered ready when the following conditions are satisfied.

## P roduct Functionality

- Homepage and navigation are complete.

- Weekly topics and their archives are accessible.

- Curated problem sheets contain valid links and relevant metadata.

- LeetCode POTD entries and videos are accessible.

- Upcoming events and previous session recordings are accessible.

- OA sheet is available and filterable.


- About and Team pages are complete.

- CPS registration redirects to the official Google Form.

- Global search works across supported content categories.

## E ngineering Quality

- Production build succeeds.

- No critical runtime errors.

- Responsive layouts are verified.

- Main navigation and external links work.

- Basic accessibility requirements are met.

- Code has passed peer review.

- Automated checks pass.

- Deployment and rollback procedures are documented.

## C ontent Quality

- Initial topics have sufficient learning material.

- Problem sets are curated and categorized.

- Session recordings have correct links.

- Event details are accurate.

- Team information has been verified.

## 1 1. Future Product Direction

T he long-term objective is to evolve CPS from a content-driven website into a c omprehensive competitive programming learning platform.

T he intended evolution is:

## V 1 — Learning & Community

- Discover topics.

- Access resources.

- Practice curated problems.

- Explore sessions and events.

## V 2 — Personalized Learning

- Create an account.

- Connect competitive programming profiles.

- Track problem-solving progress.

- Analyze topic-wise performance.


## V 2.1 — Community & Knowledge Sharing

- Publish blogs.

- Share contest experiences.

- Contribute editorials and learning resources.

## V 2.2 — Notifications & Engagement

- Stay informed about new topics.

- Receive session announcements.

- Follow learning updates.

- Customize notifications.

## P otential V3 — Advanced Learning Ecosystem

- Personalized learning roadmaps.

- Advanced CP analytics.

- Contest participation insights.

- Community challenges and collaborative initiatives.

- Additional integrations with competitive programming platforms.

## 1 2. Product Principles

A ll product and engineering decisions should align with the following principles:

- 1 . Learning First: Every major feature should contribute to making competitive p rogramming more accessible and effective.

- 2 . Content Quality Over Quantity: Curated, well-structured resources are more v aluable than large collections of unorganized problems.

- 3 . Discoverability: Students should be able to find topics, problems, sessions, and r esources quickly.

- 4 . Simplicity: Avoid unnecessary complexity, especially in the initial release.

- 5 . Performance: The website should remain fast, responsive, and lightweight.

- 6 . Scalability: Initial architectural decisions should accommodate foreseeable future r equirements without premature overengineering.

- 7 . Community Ownership: The platform should be maintainable by successive CPS b atches, not dependent on a single developer or graduating team.

## E nd of Document
