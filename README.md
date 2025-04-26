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
1. Ensure you have Python 3.9 or higher installed:
   ```sh
   python --version  # Should show Python 3.9.x or higher
   ```

2. Create and activate a virtual environment:
   ```sh
   # For Unix/macOS
   python3 -m venv .venv
   source .venv/bin/activate

   # For Windows
   python3 -m venv .venv
   .venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```sh
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `backend` directory with your OpenAI API key:
   ```env
   OPENAI_API_KEY=your-api-key-here
   ```

### 3. Running the Application

#### Start the Backend Server
```sh
# Make sure you're in the project root directory
uvicorn backend.app.main:app --host 0.0.0.0 --port 3000 --reload
```
The backend will be available at http://localhost:3000

#### Start the Frontend Development Server
```sh
# In a new terminal, from the project root
npm run dev
```
The frontend will be available at http://localhost:8080

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
- **The response is a flat JSON object with named fields (e.g., `targetType`, `targetNumber`, `targetContent`, `position`, `childType`, `childNumber`, `content`, `contentPosition`, `style`).**
- **Example:**
  ```json
  {
    "targetType": "heading",
    "targetNumber": "1",
    "targetContent": "Definitions.",
    "position": "after",
    "childType": "heading",
    "childNumber": "A",
    "content": "...",
    "contentPosition": null,
    "style": { "headingLevel": 1 }
  }
  ```
- The frontend uses this plan to update the contract structure and renumber siblings if necessary.

---

## Production Readiness
- All debug logging has been removed from both frontend and backend for production deployment.

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

# Contract Clause Placement

A FastAPI application for managing contract clauses.

## Prerequisites

- Python 3.9
- pip (Python package manager)

## Setup

If you prefer to set up manually:

1. Create a virtual environment:
   ```bash
   python3.9 -m venv .venv
   ```

2. Activate the virtual environment:
   ```bash
   source .venv/bin/activate  # On Unix/macOS
   # or
   .venv\Scripts\activate  # On Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the application:
   ```bash
   python -m uvicorn backend.app.main:app --reload
   ```

The application will be available at http://127.0.0.1:8000
