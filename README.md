# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3a08d8af-d04d-4daa-a99c-4653eecf8f4f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3a08d8af-d04d-4daa-a99c-4653eecf8f4f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- FastAPI (Python backend)
- python-docx (for .docx parsing)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3a08d8af-d04d-4daa-a99c-4653eecf8f4f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Contract Clause Placement App

A modern web app for intelligent contract clause insertion and manipulation, powered by React, Redux Toolkit, Tailwind CSS, FastAPI, and OpenAI LLM.

---

## Features
- Upload and parse contract text (from .docx or pasted text)
- View contract structure in a normalized, hierarchical format
- Insert new clauses using natural language instructions (LLM-powered)
- Download the updated contract as a .docx file
- Robust error handling and user-friendly UI

---

## Technology Stack
- **Frontend:** React (TypeScript), Redux Toolkit, Tailwind CSS, Atomic Design
- **Backend:** FastAPI (Python), OpenAI LLM (for instruction parsing), python-docx
- **Design System:** Atomic Design (atoms, molecules, organisms, templates, pages)

---

## Architecture Overview
- **Frontend**
  - Contract is parsed and displayed as normalized sections (Redux state)
  - User provides a natural language instruction and clause text
  - Frontend sends the contract structure, instruction, and clause to the backend
  - Receives a structured insertion plan from the LLM and updates the contract accordingly
  - Handles sibling renumbering (A, B, C... or 1, 2, 3...) after insertion
- **Backend**
  - Exposes endpoints for contract parsing and LLM-powered instruction parsing
  - Uses OpenAI LLM to interpret instructions and return a JSON insertion plan

---

## Getting Started

### 1. Clone the Repository
```sh
git clone <REPO_URL>
cd contract-clause-placement-8a9215a2
```

### 2. Install Dependencies
#### Frontend
```sh
npm install
```
#### Backend
```sh
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## Running the App

### 1. Start the Backend (Port 3000)
```sh
uvicorn backend.app.main:app --host 0.0.0.0 --port 3000 --reload
```
- The backend will be available at [http://localhost:3000](http://localhost:3000)
- Endpoints:
  - `/api/parse-contract-text` (parse contract)
  - `/api/parse-instruction` (LLM-powered instruction parsing)

### 2. Start the Frontend
```sh
npm run dev
```
- The frontend will be available at [http://localhost:5173](http://localhost:5173)

---

## Usage
1. **Paste or upload contract text** in the UI.
2. **Parse** the contract to view its structure.
3. **Enter a natural language instruction** (e.g., "Insert this clause as section 1A, directly after the 'Definitions' heading.") and the clause text.
4. **Insert the clause**. The LLM interprets your instruction and returns a precise insertion plan. The frontend updates the contract and renumbers siblings as needed.
5. **Download the updated contract** as a .docx file.

---

## LLM-Powered Instruction Parsing
- The backend sends the contract structure, instruction, and clause to OpenAI's LLM.
- The LLM returns a JSON object specifying exactly where and how to insert the clause (target, position, type, number, style, etc.).
- The frontend uses this plan to update the contract structure and renumber siblings if necessary.

---

## Environment Variables
- Backend uses a `.env` file for configuration:
  ```env
  PORT=3000
  CORS_ORIGIN=http://localhost:5173
  OPENAI_API_KEY=sk-...your-key-here...
  ```
- Place your `.env` file in the `backend/` directory. This file is git-ignored for security.

---

## Code Organization
- `src/pages/Index.tsx`: Main UI and logic for contract parsing and clause insertion
- `src/store/`: Redux Toolkit store and slices
- `src/components/`: Atomic Design UI components (atoms, molecules, organisms, etc.)
- `backend/app/main.py`: FastAPI backend and LLM integration

---

## Cleaning Up
- All deprecated and unused files (old instruction parsers, clause placement utilities, etc.) have been removed.
- The codebase is now fully LLM-driven for instruction parsing and clause placement.

---

## License
MIT
