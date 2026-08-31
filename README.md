# ⚡ Quiz Éclair

A single-screen mobile quiz app — no login, no navigation, no friction. Pick a category, answer 15 questions one at a time, see your score, restart instantly.

Built as a client project brief for **Yasmine Idrissi**, who runs an online training center in Marrakech and wanted a lightweight revision tool her learners could open during a break.

---

## 📱 Overview

Quiz Éclair runs entirely on one screen with three internal phases:

1. **Category Selection** — choose one of 3 categories
2. **Quiz in Progress** — one question at a time, 4 options, instant green/red feedback, auto-advance, live progress bar (`Question 4/15`)
3. **Result** — final score, encouragement message, and a **Restart** button that resets everything

No accounts. No screen transitions. Just questions and a score.

---

## ✨ Features

- 🗂️ 3 quiz categories, 15 questions total, loaded dynamically from a backend
- ✅ Instant visual feedback (green = correct, red = incorrect) before auto-advancing
- 📊 Real-time progress bar across the full question set
- 🔄 One-tap restart that fully resets quiz state
- ⏳ Loading state while questions are fetched over HTTP
- 🎨 Minimal, warm UI built from a 3-color / 2-font Figma design system

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Mobile app | React Native (Expo) |
| Backend | Node.js + Express |
| Data | Static JSON (no database) |
| Design | Figma |
| Project tracking | GitHub Projects + Jira |

> This project can equally be built in Flutter — see the [technical note](#-flutter-equivalents) below for the component mapping.

---

## 📁 Project Structure

```
quiz-eclair-rn/
├── .gitignore
├── README.md
├── mobile/
│   ├── App.js                      # entry point, theme setup
│   ├── app.json
│   ├── package.json
│   ├── assets/
│   └── src/
│       ├── screens/
│       │   └── QuizScreen.jsx      # owns ALL state, orchestrates children
│       ├── components/
│       │   ├── CategorySelector.jsx
│       │   ├── QuestionCard.jsx
│       │   ├── ProgressBar.jsx
│       │   ├── AnswerFeedback.jsx
│       │   └── ResultCard.jsx
│       ├── services/
│       │   └── api.js              # fetch() calls to the Express backend
│       └── constants/
│           └── theme.js            # 3-color palette + font pair from Figma
└── server/
    ├── package.json
    ├── server.js                   # Express app entry, CORS, mounts routes
    ├── routes/
    │   └── questions.js            # GET /questions?category=...
    └── data/
        └── questions.json          # question bank, grouped by category
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [Expo Go](https://expo.dev/go) installed on your phone, or an emulator/simulator
- npm

### 1. Clone the repo

```bash
git clone https://github.com/Sisouko/quiz-eclair-rn.git
cd quiz-eclair-rn
```

### 2. Start the backend

```bash
cd server
npm install
npm run dev
```

The API runs on `http://localhost:3000` by default.

### 3. Configure the mobile app's API URL

Since Expo Go runs on your physical phone, `localhost` won't reach a server running on your laptop — both devices need to be on the same Wi-Fi, and the app needs your laptop's LAN IP.

```bash
# macOS
ipconfig getifaddr en0

# Windows
ipconfig
```

Update the base URL in `mobile/src/services/api.js`:

```js
const BASE_URL = "http://<your-lan-ip>:3000";
```

### 4. Start the mobile app

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

---

## 🔌 API Reference

### `GET /questions`

Returns the question set for a given category.

**Query Parameters**

| Param | Type | Required | Description |
|---|---|---|---|
| `category` | string | yes | One of `culture-generale`, `logique`, `divertissement` |

**Example Request**

```
GET /questions?category=logique
```

**Example Response**

```json
[
  {
    "id": 18,
    "category": "logique",
    "question": "Si un train roule à 60 km/h, combien de temps met-il pour parcourir 120 km ?",
    "options": ["1 heure", "2 heures", "3 heures", "4 heures"],
    "correctIndex": 1
  }
]
```

---

## 🧩 Component Breakdown

| Component | Responsibility |
|---|---|
| `QuizScreen.jsx` | Owns all state (`phase`, `category`, `questions`, `currentIndex`, `score`, `isLoading`); orchestrates every child component |
| `CategorySelector.jsx` | Displays the 3 categories at launch |
| `QuestionCard.jsx` | Renders the current question and its 4 answer options |
| `ProgressBar.jsx` | Shows progress across the 15 questions |
| `AnswerFeedback.jsx` | Brief green/red visual feedback after an answer is selected |
| `ResultCard.jsx` | Final score, encouragement message, and the Restart button |

---

## 🔀 Flutter Equivalents

This project is built in React Native, but the same brief maps directly to Flutter:

| Concept | Flutter | React Native |
|---|---|---|
| Stateful component | `StatefulWidget` + `setState` | Function Component + `useState` |
| App root | `MaterialApp` | `App.jsx` |
| Button / choice | `ElevatedButton`, `RadioListTile` | `TouchableOpacity`, `Pressable` |
| Network call + loading | `http` package + `FutureBuilder` | `fetch`/`axios` + `useEffect` |
| Progress bar | `LinearProgressIndicator` | Custom component |
| Local storage (bonus) | `shared_preferences` | `AsyncStorage` |

---

## 🗺️ Roadmap / Project Board

Task breakdown and daily progress are tracked in:
- **GitHub Projects** — À Faire / En Cours / Terminé
- **Jira** — parent task with daily subtasks and due dates

Design source (3 states: category selection, question in progress, result) is in **Figma** — link in the repo description.

---

## 👤 Author

**Ahmed** ([@Sisouko](https://github.com/Sisouko))

---

## 📄 License

This project was built as an educational brief and is not licensed for commercial redistribution.
