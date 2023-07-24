// Get DOM elements
const container = document.getElementById("chatbox-container");
const chatbox = document.getElementById("chatbox-field");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const closeButton = document.getElementById("close-button");
const openButton = document.getElementById("open-button");
const welcomeDiv = document.getElementById("welcome-msg");

// initial typing
function typeWriterEffect(text, targetElement, speed) {
  if (targetElement.textContent === text) {
    return; // Text already exists, no need to type again
  }
  const textArray = text.split("");
  let charIndex = 0;

  const timer = setInterval(() => {
    if (charIndex < textArray.length) {
      const currentText = targetElement.textContent + textArray[charIndex];
      targetElement.textContent = currentText;
      charIndex++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

// Function to simulate the typewriter effect
function typeEffect(element, text, delay) {
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    
    // Scroll to bottom
    chatbox.scrollTop = chatbox.scrollHeight;
    if (i === text.length) {
      clearInterval(interval);
    }
  }, delay);
}

openButton.addEventListener("click", function () {
  container.style.display = "block";
  const textToType =
    "Alstrada: Hello, hope you're having a great day! Welcome to Alstrada, the Data Monetization Company! How may I help you today?";
  const typingSpeed = 100; // Adjust the speed in milliseconds (e.g., 100 for 100ms)

//   welcomeDiv.textContent = ""; // Clear existing text before starting the typewriter effect
  setTimeout(() => {
    openButton.style.display = "none";
    typeWriterEffect(textToType, welcomeDiv, typingSpeed);
  }, 1800);
});

closeButton.addEventListener("click", function () {
  container.style.display = "none";
  openButton.style.display = "block";
});

// Load the data from the JSON file
fetch("js/data.json")
  .then((response) => response.json())
  .then((data) => {
    // Store the questions and default response
    const questions = data.questions;
    const defaultResponse = data.defaultResponse;

    // Event listener for the send button
    sendButton.addEventListener("click", sendMessage);

    // Function to send a message
    function sendMessage() {
      // Function to simulate the typewriter effect
      function typeEffect(element, text, delay) {
        let i = 0;
        const interval = setInterval(() => {
          element.textContent += text[i];
          i++;
          if (i === text.length) {
            clearInterval(interval);
          }
        }, delay);
      }
      const message = messageInput.value.trim();
      if (message !== "") {
        // Create a new message element
        const messageElement = document.createElement("p");
        messageElement.className = "chat-user-message";
        messageElement.textContent = "You: " + message;

        // Add the message to the chatbox
        chatbox.appendChild(messageElement);

        // Process the message
        processMessage(message);

        // Clear the message input
        messageInput.value = "";

        // Scroll to the bottom of the chatbox
        chatbox.scrollTop = chatbox.scrollHeight;
      }
    }

    // Function to process the user's message
    function processMessage(message) {
      const lowercaseMessage = message.toLowerCase();

      // Check if the message matches any question
      const matchedQuestion = questions.find((q) =>
        lowercaseMessage.includes(q.question.toLowerCase())
      );

      if (matchedQuestion) {
        const answerElement = document.createElement("p");
        answerElement.className = "chat-bot-message";
        chatbox.appendChild(answerElement);

        // Simulate the typewriter effect before showing the answer
        typeEffect(answerElement, "Alstrada: ", 50);
        setTimeout(() => {
          typeEffect(answerElement, matchedQuestion.answer, 50);
        }, 1500); // Delay before showing the reply
      } else {
        const defaultResponseElement = document.createElement("p");
        defaultResponseElement.className = "chat-bot-message";
        chatbox.appendChild(defaultResponseElement);

        // Simulate the typewriter effect before showing the default response
        typeEffect(defaultResponseElement, "Alstrada: ", 50);
        setTimeout(() => {
          typeEffect(defaultResponseElement, defaultResponse, 50);
        }, 1500); // Delay before showing the reply
      }
    }

    // Event listener for the Enter key
    messageInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        sendMessage();
      }
    });
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });
