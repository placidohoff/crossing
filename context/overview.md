Please design this for me: Overview
The Crossing Guard Scheduler lets guards post when they can work and lets an admin assign each guard to a crossing location for each morning shift.
Problem: Morning crossing coverage is coordinated by phone, text or paper, so gaps and double-bookings are easy to miss.
Goal: Every crossing location has a confirmed guard for every school-day morning, with assignments visible to everyone in one place.
Users
Crossing guard — logs in, posts availability, views their assignments.
Admin (scheduler) — logs in, manages guards and locations, builds and publishes the schedule.
In scope (v1): accounts and login, availability posting, locations, schedule building, assignment viewing, notifications.




Functional requirements
Priority: M = must have for v1, S = should have, C = could have later.
ID
Requirement
Actor
Priority
FR-1
Users log in with email and password.
Guard, Admin
M
FR-2
Users can reset a forgotten password by email.
Guard, Admin
M
FR-3
The system restricts each screen and action by role (Guard or Admin).
System
M
FR-4
A guard can post availability by date, as available or unavailable for the morning shift.
Guard
M
FR-5
A guard can set recurring availability (e.g. every Mon/Wed/Fri).
Guard
S
FR-6
A guard can edit or withdraw availability until the schedule for that date is published.
Guard
M
FR-7
A guard can view their upcoming assignments: date, location, start and end time.
Guard
M
FR-8
A guard can request time off or report an absence for an assigned shift.
Guard
S
FR-9
An admin can create, edit and deactivate guard accounts.
Admin
M
FR-10
An admin can create, edit and deactivate crossing locations (name, address, school, shift times).
Admin
M
FR-11
An admin can view all guards' availability for a chosen date or week.
Admin
M
FR-12
An admin can assign one available guard to one location for one date.
Admin
M
FR-13
The system warns when a guard is assigned twice on the same morning or assigned while marked unavailable.
System
M
FR-14
The system highlights locations with no guard assigned for a date.
System
M
FR-15
An admin can save a schedule as a draft, then publish it.
Admin
M
FR-16
An admin can reassign a location after publishing (e.g. an absence).
Admin
M
FR-17
The system notifies a guard by email when they are assigned, reassigned or removed.
System
S
FR-18
The system reminds guards who have not posted availability for the next period.
System
C
FR-19
An admin can export or print a schedule by day or week.
Admin
S
FR-20
The system logs who created or changed each assignment and when.
System
S
Non-functional requirements
ID
Category
Requirement
NFR-1
Usability
Works on a phone browser; posting availability takes under 1 minute.
NFR-2
Security
Passwords hashed (e.g. bcrypt); all traffic over HTTPS; sessions expire after inactivity.
NFR-3
Security
Role-based access: guards see only their own availability and assignments.
NFR-4
Privacy
Guard contact details are visible only to admins.
NFR-5
Performance
Pages load in under 2 seconds for up to 100 guards and 50 locations.
NFR-6
Availability
Reachable before 7:00 a.m. on school days, when schedules are checked.
NFR-7
Reliability
Data backed up daily.
NFR-8
Accessibility
Meets WCAG 2.1 AA.
NFR-9
Maintainability
Separate front end and API; schema managed with migrations.
