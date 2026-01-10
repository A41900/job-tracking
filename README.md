# Job Tracking

I decided to build this project out of a personal need to organize and keep track of job applications.

Once I started sending CVs, I wanted a simple and reliable way to keep an organized list of companies, application dates, statuses, and context. Keeping everything in a notes app did not feel sustainable. Tools like Notion could solve the organization problem, but as a developer with curiosity and the need to build, I chose to create my own job tracking tool instead.

This project started as a small job application tracker, but it is designed as a module of a larger idea I want to develop over time: a mental organizer / smart calendar focused on reducing cognitive overload during job searching and planning.

For now, this repository contains only the job tracking module. The scope is intentionally limited to avoid overengineering.

### **Live demo:** https://A41900.github.io/job-tracking (frontend only)

---

## Project overview

The project manages job applications using a structured data model and renders them in the browser.  
A local backend API built with Node.js and Express is responsible for creating and retrieving applications, while the frontend consumes the API to display and update the data.

Due to GitHub Pages limitations, the public demo runs with mock data only. This allows the interface and interaction patterns to be explored publicly, while keeping the real backend and personal data local.

The architecture is deliberately minimal. More detailed information such as project structure, design decisions, schema evolution, and future plans is documented in the devlog.

---

## Author

Beatriz Andrade  
Developed as a personal learning project
