<div align="justify">

# Devlog — Job Tracking

This document records the reasoning, decisions, and trade-offs made while developing the Job Tracking project.
It is an ongoing log intended to capture how the project is evolving over time and why certain decisions were made.

---

## Initial motivation

This project started from a personal need rather than a technical challenge.

After beginning to apply for jobs, I realized that keeping track of applications using notes or memory quickly became overwhelming. I wanted visibility over where I applied, when I applied, the current state of each process, and the surrounding context.

While existing tools such as Notion could solve the organizational aspect, I wanted to build something myself, both as a learning exercise and as a tool better aligned with my mental workflow.

---

## Phase 1 - Starting with data, Schema evolution and normalization

One of the first decisions was to start with data modeling instead of interface design. The reasoning was straightforward: interfaces can change frequently, while a poorly structured data model tends to create long-term friction and is harder to correct later.

The project began with a very simple JSON representation of a job application. As real applications were added, inconsistencies and ambiguities started to surface naturally. Certain fields were overloaded and mixed different concerns, such as career level and contract type, role titles and actual responsibilities, or submission confirmation versus real progress in the hiring process.

Working with real examples made these issues impossible to ignore. As a result, the schema was gradually refined and normalized to separate responsibilities more clearly. Career level (seniority) was decoupled from contractual form (employmentType). Professional identity (position) was separated from a description of what the role actually involves (role). Process state (status) was distinguished from the simple fact of whether a submission had been acknowledged (confirmationReceived).

Any information that remained subjective, contextual, or difficult to normalize cleanly was intentionally moved into a free-form notes field. This helped keep the core schema explicit and predictable, without losing useful context.

At this stage, the schema is considered stable enough to build on, but it is not treated as final. Further changes are expected as the interface and usage patterns evolve.

---

## Phase 2 - In-memory store abstraction

Although the project currently relies on static JSON files, a small data abstraction layer (store.js) was introduced early in development. This decision was not driven by immediate technical necessity, but by the desire to avoid coupling the rest of the application directly to the data source.

By introducing a store layer, the UI remains agnostic of where the data comes from or how it is stored. This makes the rendering logic simpler and easier to reason about, while also keeping future changes localized.

Another consequence of this abstraction is that identifiers are generated inside the store rather than being stored in the JSON files themselves. This keeps the data files focused purely on content, while responsibilities related to identity and persistence remain within the application layer. It also prepares the project for a future transition to a database or API without requiring structural changes to the rest of the codebase.

---

## Phase 3 - Mock data vs real data

A deliberate decision was made not to expose real job application data publicly. While this type of data is not legally sensitive, it is personally and strategically sensitive. Notes may contain private context, salary expectations, or subjective impressions that should not be publicly accessible.

To balance usability and privacy, the project distinguishes clearly between public demo data and private real data. Mock data is used for public deployments, while real application data is stored locally and excluded from version control. The data store is responsible for switching between these sources, allowing the rest of the application to remain unaware of which data is being used.

This approach makes it possible to deploy the project publicly, for example on GitHub Pages, without exposing personal information, while still keeping the tool fully functional for local use.

---

## Phase 4 - Interface focus and interaction

At this stage, the focus of the project has shifted from data modeling to the interface. With a stable-enough schema and data layer in place, the goal is now to understand how the information should be presented and interacted with in practice.

The current work is centered on validating which pieces of information are useful at a glance, how applications should be grouped or filtered, and how the interface can reduce cognitive load rather than add to it. This includes exploring different ways of displaying application status, timelines, and contextual notes.

Filtering and interaction are being treated as part of the design process rather than as purely visual features. The intention is to observe which filters actually help decision-making and mental organization before introducing additional complexity.

Backend development and server-side persistence are intentionally postponed at this stage. The priority is to test the data model and interface together, and only introduce a backend once the interaction patterns and requirements are clear.

---

## Phase 5 - Intentional Refactor and Responsibility Boundaries

At this point, I decided to do a refactor on purpose. The application was working, but I already knew the main.js file was handling too much at once. It was responsible for initializing data, managing UI state, reacting to user input, applying filters and triggering renders. Even though nothing was technically broken, the mental overhead was growing and the structure no longer felt sustainable.

The first step was introducing clearer boundaries, starting with the idea of a viewMode and separating logic into state and controllers. This reduced some noise in main.js, but it also exposed a deeper issue: state was starting to duplicate logic that already existed elsewhere, especially around filter structure. That clarified an important rule — state should only store values, not create or define domain structures.

A similar issue appeared with viewMode. Treating layout as a “mode” suggested application state, when in reality it was just a presentation choice: the same data rendered in different ways. This led to reframing viewMode as layout and removing defaults and initialization from state entirely.

Another key realization followed. Toggling layout is not rendering. Early versions of the layout logic directly called renderApplications and accessed the store, which tightly coupled UI controls to rendering and data access.

The final structure emerged naturally from this. A small UI controller became the single place where state, data, filtering and rendering meet, through a single updateUI function. uiLayout and uiFilter now only read from the DOM and express intent by calling controller functions. main.js was reduced to wiring everything together and triggering the first render.

---

## Phase 6 - Introducing a backend

At this stage, a backend was introduced as a natural extension of the existing model. A small Node.js and Express API was added to handle the creation and retrieval of job applications, backed by an in-memory store. This allowed the frontend to shift from “owning” the data to consuming it, making the flow closer to a real-world application while keeping complexity intentionally low.

---

## Phase 7 — Structural refactor after backend introduction

The backend was introduced in a deliberately pragmatic way. At an early stage, the logic for creating applications (fetching, minimal validation, and inserting into local state) was temporarily placed directly in main.js. This was a conscious decision aimed at quickly validating the backend integration and confirming that the end-to-end flow worked before investing in structural refactoring.
Once this validation point was reached, it became clear that it was the right moment to pause and reorganize. Not because the code had become unmanageable, but because a coherent structure already existed and the natural next step was to align the implementation with that structure.

The uiController, which already acted as the central UI decision point, was extended to explicitly own the UI state (layout and filters). The former uiState.js module was removed, as this state was not shared, observed, or consumed by any other part of the system. Consolidating the state reduced mental indirection and reinforced the controller’s role as the coordinator between data and render.
Input-related modules (filterFromUI, layoutSelectorUI) were clearly delimited. They read from the DOM, listen to user events, and forward user intent to the uiController, without creating state, applying logic, or triggering UI updates directly. They function as purely reactive layers.

For more complex interaction flows, such as “Add application”, the concept of Actions was introduced. The addApplicationAction.js module encapsulates the full interaction flow: opening and closing a modal, validating form input, calling the API, updating the local store, and explicitly triggering a UI refresh via the uiController. In the current implementation, the modal is fully managed inside the Action itself and behaves as a self-contained UI unit, rather than being mediated by the controller.

In parallel, the separation between api/, store/, and logic/ was reinforced: HTTP communication, local state management, and pure business rules live in distinct layers.
As a result, main.js was reduced to a predictable bootstrap file. The UI follows a clear unidirectional flow:
DOM → Inputs / Actions → uiController → render.
This structure reduces cognitive load, improves readability, and remains proportional and sustainable for a solo project, with all decisions being explicit, conscious, and reversible.

> **Deployment note:**  
> During deployment to GitHub Pages, a runtime error occurred due to a case-sensitivity mismatch in a frontend module filename (`applicationsAPI.js` vs `applicationsApi.js`). This issue did not appear in local development on macOS, but caused a 404 error in production on GitHub Pages (Linux).
>
> The fix involved normalizing filename casing and committing the change explicitly using `git mv`, reinforcing the importance of accounting for filesystem differences between development and deployment environments.

---

## Phase 8 — Frontend isolation and data source alignment

During this phase, the frontend was fully isolated into a dedicated frontend/ directory and aligned with real static hosting constraints. At the same time, data ownership was clarified: real application data was moved to the backend, while the frontend now operates exclusively with mock data for static deployments.

A single explicit flag (USE_BACKEND) was introduced in applicationsApi.js to control the data source. When enabled, the backend becomes the source of truth; when disabled, the frontend runs entirely in static mode using mock data, with a fallback mechanism for creating applications.

This separation ensures predictable behavior across environments while keeping the frontend deployable on GitHub Pages.

> **Deployment note:**  
> VSCode’s Live Server always serves the workspace root and cannot be scoped to a subfolder. To >accurately simulate static hosting and ensure predictable module resolution, frontend >development and testing switched to a dedicated static server (npx serve).

---

## Phase 9 — Migration of Job Analysis and extraction as a service

At this stage of the project, I decided to migrate another application I had been developing in parallel.

Alongside the Job Tracker, I had built a separate Job Analysis tool using OpenAI to extract structured, factual information from job descriptions, such as seniority, role characteristics, and qualitative signals. The purpose of this tool was to reduce friction during application creation by allowing a job description to be analyzed and converted into structured data that the user could then accept or reject.

Rather than rebuilding this logic inside the Job Tracker, the decision was to integrate it as-is and reframe job analysis as a service. The extraction logic became a backend capability, and its UI was embedded into the existing “Add Application” modal, aligning it with the core application flow.

This phase was primarily about integration and reuse, not feature expansion. Existing prompts, extraction logic, and form structure were reused, with the main change being conceptual: job analysis transitioned from an independent tool to a supporting service within the Job Tracker.

Because this feature relies on a private OpenAI API key, it is intentionally disabled in public deployments. Access is restricted through explicit safeguards at both the UI and backend levels, ensuring that no external requests are made outside of local development environments.

This approach keeps the extraction capability present and evolvable within the codebase while protecting sensitive credentials. In future iterations, this mechanism will be extended with user authentication and authorization (e.g. Passport), allowing controlled access to the feature under an admin or privileged user model.

---

## Phase 13 — Validation as a debugging and design tool

As persistence and richer data flows were introduced, validation became critical. Zod was added to the backend to enforce schema constraints and prevent invalid data from being written to storage.

Early failures revealed a conceptual mismatch rather than a tooling issue. Fields marked as optional were receiving null values from the frontend, which Zod does not accept by default. This surfaced an important distinction between absence and nullability. Schemas were updated to explicitly allow null where appropriate, combined with defaults to ensure a consistent persisted state.

Validation also evolved into a debugging tool. Instead of generic error messages, validation failures were reformatted into readable logs that clearly identify the failing field and the reason. This reduced ambiguity, accelerated debugging, and made backend behavior easier to reason about.

---

## Author

Beatriz Andrade
Software Engineering Student

</div>
```
