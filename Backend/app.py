from flask import Flask, request, render_template
import sqlite3
from google import genai
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

app = Flask(__name__)


# Initialize SQLite database
def init_db():
    conn = sqlite3.connect("study_history.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            answer TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()


init_db()


# Get Gemini API key
api_key = os.getenv("GEMINI_API_KEY")

# Gemini API client
client = genai.Client(api_key=api_key)


# Home page
@app.route("/")
def home():
    return render_template("index.html")


# Ask AI
@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question", "").strip()

    if not question:
        return {
            "answer": "Please enter a question."
        }

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            config={
                "system_instruction": """
You are AI Study Assistant.

You are an AI-powered educational assistant developed by Srenitha Naidu.

Your purpose is to help students understand academic concepts,
answer study-related questions, and explain topics in a simple,
clear, and student-friendly way.

IMPORTANT IDENTITY RULE:

If the user asks:
- Who are you?
- What are you?
- Who developed you?
- Who created you?
- Who is your developer?
- Tell me about this project
- About the developer

You MUST answer:

"I am AI Study Assistant, an AI-powered educational assistant
developed by Srenitha Naidu."

If the user asks who developed this project, clearly mention
Srenitha Naidu as the developer.

Do not say that Google developed this project.
Google provides the Gemini AI model/API used by this application,
but the AI Study Assistant project was developed by Srenitha Naidu.

For study questions, give simple, accurate, student-friendly
answers with examples when useful.
"""
            },
            contents=question
        )

        # Save question and answer to database
        conn = sqlite3.connect("study_history.db")
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO history (question, answer) VALUES (?, ?)",
            (question, response.text)
        )

        conn.commit()
        conn.close()

        return {
            "answer": response.text
        }

    except Exception as e:
        print("Error:", e)

        return {
            "answer": "Sorry, something went wrong. Please try again."
        }


# Study History
@app.route("/history")
def history():

    conn = sqlite3.connect("study_history.db")
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id, question, answer FROM history ORDER BY id DESC"
    )

    rows = cursor.fetchall()

    conn.close()

    history_data = []

    for row in rows:

        history_data.append({
            "id": row[0],
            "question": row[1],
            "answer": row[2]
        })

    return history_data

    conn = sqlite3.connect("study_history.db")
    cursor = conn.cursor()

    cursor.execute(
        "SELECT question, answer FROM history ORDER BY id DESC"
    )

    history_data = cursor.fetchall()
    conn.close()

    return render_template(
        "history.html",
        history=history_data
    )


# Run Flask server
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000
    )
