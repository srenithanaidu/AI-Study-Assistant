const input = document.getElementById("question");
const button = document.getElementById("askButton");
const clearButton = document.getElementById("clearButton");
const answer = document.getElementById("answer");

async function askAI() {

    const question = input.value.trim();

    if (question === "") {
        return;
    }

    // Show user's question
    answer.innerHTML += "<p>👩 You: " + question + "</p>";

    // Show loading message
    const loading = document.createElement("div");
    loading.innerHTML = "🤖 AI: Thinking...";
    answer.appendChild(loading);

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

        const data = await response.json();

        // Convert Markdown to HTML
        loading.innerHTML = "🤖 AI: " + marked.parse(data.answer);

    } catch (error) {

        console.error(error);

        loading.textContent = "🤖 AI: Something went wrong!";
    }

    // Clear input
    input.value = "";
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