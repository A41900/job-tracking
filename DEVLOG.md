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
