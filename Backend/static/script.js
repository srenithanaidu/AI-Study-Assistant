const input = document.getElementById("question");

const button = document.getElementById("askButton");

const clearButton = document.getElementById("clearButton");

const answer = document.getElementById("answer");

const welcome = document.getElementById("welcome");

const historyList = document.getElementById("historyList");

const newChatButton = document.getElementById("newChatButton");


// =====================================
// LOAD HISTORY
// =====================================

async function loadHistory() {

    try {

        const response = await fetch("/history");

        if (!response.ok) {

            throw new Error("Could not load history");

        }


        const data = await response.json();


        historyList.innerHTML = "";


        if (data.length === 0) {

            historyList.innerHTML =
                '<p class="empty-history">No questions yet.</p>';

            return;

        }


        data.forEach(function(item) {

            const historyItem =
                document.createElement("div");


            historyItem.className =
                "history-item";


            historyItem.textContent =
                "💬 " + item.question;


            historyItem.title =
                item.question;


            historyItem.addEventListener(
                "click",
                function() {

                    showHistory(item);

                }
            );


            historyList.appendChild(historyItem);

        });


    } catch (error) {

        console.error(
            "History error:",
            error
        );

    }

}


// =====================================
// SHOW HISTORY ITEM
// =====================================

function showHistory(item) {

    welcome.style.display = "none";


    answer.innerHTML = "";


    const userMessage =
        document.createElement("p");


    userMessage.textContent =
        "👩 You: " + item.question;


    answer.appendChild(userMessage);


    const aiMessage =
        document.createElement("div");


    aiMessage.innerHTML =
        "🤖 AI: " +
        marked.parse(item.answer);


    answer.appendChild(aiMessage);


    document
        .getElementById("chatContent")
        .scrollTop = 0;

}


// =====================================
// ASK AI
// =====================================

async function askAI() {

    const question =
        input.value.trim();


    if (question === "") {

        return;

    }


    // Hide welcome
    welcome.style.display = "none";


    // Disable button
    button.disabled = true;

    button.textContent = "⏳";


    // Show user question
    const userMessage =
        document.createElement("p");


    userMessage.textContent =
        "👩 You: " + question;


    answer.appendChild(userMessage);


    // Loading message
    const loading =
        document.createElement("div");


    loading.innerHTML =
        "🤖 AI: Thinking";


    answer.appendChild(loading);


    // Scroll down
    loading.scrollIntoView({
        behavior: "smooth",
        block: "end"
    });


    // Loading animation
    let dots = 0;


    const loadingAnimation =
        setInterval(function() {

            dots = (dots + 1) % 4;


            loading.innerHTML =
                "🤖 AI: Thinking" +
                ".".repeat(dots) +
                " ⏳";

        }, 400);


    try {

        const response =
            await fetch("/ask", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    question: question
                })

            });


        if (!response.ok) {

            throw new Error(
                "Server error"
            );

        }


        const data =
            await response.json();


        // Stop animation
        clearInterval(
            loadingAnimation
        );


        // Display answer
        loading.innerHTML =
            "🤖 AI: " +
            marked.parse(
                data.answer
            );


        // Update history
        await loadHistory();


        // Scroll to answer
        loading.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });


    } catch (error) {

        console.error(error);


        clearInterval(
            loadingAnimation
        );


        loading.innerHTML =
            "🤖 AI: Sorry, something went wrong. Please try again. 😔";

    }


    // Clear input
    input.value = "";


    // Enable button
    button.disabled = false;

    button.textContent = "➤";


    input.focus();

}


// =====================================
// ASK BUTTON
// =====================================

button.addEventListener(
    "click",
    function() {

        askAI();

    }
);


// =====================================
// ENTER KEY
// =====================================

input.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            askAI();

        }

    }
);


// =====================================
// CLEAR CHAT
// =====================================

clearButton.addEventListener(
    "click",
    function() {

        answer.innerHTML = "";

        welcome.style.display = "block";

        input.value = "";

        input.focus();

    }
);


// =====================================
// NEW CHAT
// =====================================

newChatButton.addEventListener(
    "click",
    function() {

        answer.innerHTML = "";

        input.value = "";

        welcome.style.display = "block";

        input.focus();

    }
);


// =====================================
// LOAD HISTORY WHEN PAGE OPENS
// =====================================

loadHistory();