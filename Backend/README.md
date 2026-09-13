# AI Study Assistant 🤖

AI Study Assistant is a web-based application that helps students get quick, AI-generated answers to study-related questions through a simple and user-friendly interface.

## ✨ Features

* Ask study-related questions
* Get AI-generated answers
* Markdown-formatted responses
* Supports headings, bullet points, and numbered lists
* Displays code blocks clearly
* Press **Enter** to ask a question
* **Clear Chat** option
* Animated AI thinking/loading indicator
* Error handling for failed requests
* Responsive design for different screen sizes
* Simple and clean user interface

## 🛠️ Technologies Used

* **HTML5** – Structure of the web page
* **CSS3** – Styling and responsive design
* **JavaScript** – Frontend interaction and API requests
* **Python** – Backend programming
* **Flask** – Web framework
* **Google Gemini API** – AI-generated responses
* **Marked.js** – Markdown-to-HTML rendering
* **Gunicorn** – Production server

## ⚙️ How It Works

1. The user enters a study-related question.
2. JavaScript sends the question to the Flask backend.
3. Flask receives the question and sends it to the Gemini API.
4. Gemini generates an AI-based answer.
5. The response is returned to the frontend.
6. Marked.js formats the Markdown response for better readability.

## 📁 Project Structure

```text
AI-Study-Assistant/
│
├── Backend/
│   ├── app.py
│   ├── static/
│   │   ├── style.css
│   │   └── script.js
│   ├── templates/
│   │   └── index.html
│   ├── .env
│   └── venv/
│
├── requirements.txt
├── .gitignore
└── README.md
```

> **Note:** The `.env` file contains the Gemini API key and should never be uploaded to GitHub.

## 🚀 Live Demo

**AI Study Assistant:**
https://ai-study-assistant-wk1z.onrender.com

## 💻 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/srenithanaidu/AI-Study-Assistant.git
```

### 2. Open the project folder

```bash
cd AI-Study-Assistant/Backend
```

### 3. Create and activate a virtual environment

```bash
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure the Gemini API key

Create a `.env` file inside the `Backend` folder:

```text
GEMINI_API_KEY=your_api_key_here
```

### 6. Run the application

```bash
python app.py
```

Open the application in your browser:

```text
http://127.0.0.1:5000
```

## 🌐 Deployment

The application is deployed using **Render** with Gunicorn as the production server.

## 👩‍💻 Developer

**Srenitha Naidu**

AI Study Assistant was developed as a student project to explore web development, Flask backend development, API integration, and Generative AI.

---

⭐ If you find this project useful, feel free to explore the repository!


AI Study Assistant is a web-based application that helps students
get answers to their study-related questions using Artificial Intelligence.

## Features

- Ask study-related questions
- Get AI-generated answers
- Markdown formatted responses
- Supports headings, bullet points and numbered lists
- Displays code blocks clearly
- Press Enter to ask a question
- Clear Chat option
- Simple and user-friendly interface
- Responsive design for different screen sizes

## Technologies Used

- HTML
- CSS
- JavaScript
- Python
- Flask
- Google Gemini API
- Marked.js

## Project Structure

```text
AI-Study-Assistant/
│
├── Backend/
│   ├── app.py
│   ├── static/
│   │   ├── style.css
│   │   └── script.js
│   ├── templates/
│   │   └── index.html
│   ├── .env
│   └── venv/
│
├── requirements.txt
└── README.md