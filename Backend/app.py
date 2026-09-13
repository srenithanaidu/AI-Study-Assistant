from flask import Flask, request, render_template
from google import genai
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

app = Flask(__name__)

# Get Gemini API key from environment variable
api_key = os.getenv("GEMINI_API_KEY")

# Gemini API client
client = genai.Client(api_key=api_key)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question", "").strip()

    # Check if question is empty
    if not question:
        return {
            "answer": "Please enter a question."
        }

    try:
        # Generate AI response
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=question
        )

        return {
            "answer": response.text
        }

    except Exception as e:
        print("Error:", e)

        return {
            "answer": "Sorry, something went wrong. Please try again."
        }


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000
    )