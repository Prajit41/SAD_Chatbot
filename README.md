# SAD_Chatbot
Created for IngeniumSTEM Spring Hacks 1.0

# Spring SAD Companion

spring-sad-companion/
├── frontend/
│   └── index.html
├── backend/
│   ├── server.js
│   ├── responses.js
│   ├── moods.json
│   └── package.json
└── .gitignore


This repository includes:
- `index.html`: Static, one-file version—just open in browser.
- `backend/`: Express server with GPT‑4 integration and mood persistence.
- `.gitignore`, `LICENSE`, and roadmap.

## Usage

### Static version:
Open `index.html` in the browser—works instantly.

### Full version:
1. Copy `.env.example` to `.env`, add `OPENAI_API_KEY`.
2. In `backend/`: `npm install && npm start`.
3. In `frontend/`: `npm install && npm run build`.
4. Access app at `http://localhost:4000`.

## Future Advancements
- User accounts & authentication
- Database integration (MongoDB/Postgres)
- Habit reminders & analytics
- Multi-language & seasonal themes

## License
Non-commercial use only. © 2025 Spring SAD Companion Author
