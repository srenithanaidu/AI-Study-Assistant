const input = document.getElementById("question");
const button = document.getElementById("askButton");
const clearButton = document.getElementById("clearButton");
const answer = document.getElementById("answer");

async function askAI() {

    const question = input.value.trim();

    if (question === "") {
        return;
    }

    // Disable button while AI is responding
    button.disabled = true;
    button.textContent = "Thinking... 🤖";

    // Show user's question
    const userMessage = document.createElement("p");
    userMessage.innerHTML = "👩 You: " + question;
    answer.appendChild(userMessage);

    // Show animated loading message
    const loading = document.createElement("div");
    loading.innerHTML = "🤖 AI: Thinking";
    answer.appendChild(loading);

    // Animate dots
    let dots = 0;

    const loadingAnimation = setInterval(() => {
        dots = (dots + 1) % 4;
        loading.innerHTML = "🤖 AI: Thinking" + ".".repeat(dots) + " ⏳";
    }, 400);

    try {

        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        // Stop loading animation
        clearInterval(loadingAnimation);

        // Convert Markdown to HTML
        loading.innerHTML = "🤖 AI: " + marked.parse(data.answer);

    } catch (error) {

        console.error(error);

        // Stop loading animation
        clearInterval(loadingAnimation);

        loading.innerHTML =
            "🤖 AI: Sorry, something went wrong. Please try again. 😔";
    }

    // Clear input
    input.value = "";

    // Enable button again
    button.disabled = false;
    button.textContent = "Ask AI";
}


// Ask AI button
button.addEventListener("click", function() {
    askAI();
});


// Press Enter to ask
input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        askAI();
    }
});


// Clear Chat button
clearButton.addEventListener("click", function() {

    answer.innerHTML = "";

});