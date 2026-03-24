let hasWelcomed = false;
let isOpen = false; // 

function toggleChat() {
const widget = document.getElementById("chat-widget");

if (!isOpen) {
  widget.classList.add("show");
  isOpen = true;

  setTimeout(() => {
    document.getElementById("userInput").focus();
  }, 200);

  if (!hasWelcomed) {
    setTimeout(() => {
      addMessage("Hi 👋 Welcome to our store!\nHow can I help you?\n\nTry: shoes, tshirt, track order", "bot");
    }, 300);
    hasWelcomed = true;
  }

} else {
  closeChat();
}
}

function closeChat() {
const widget = document.getElementById("chat-widget");

widget.classList.remove("show");
isOpen = false;

document.getElementById("userInput").value = "";
}

function addMessage(text, sender) {
  const chatBox = document.getElementById("chat-box");

  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotReply(message) {
  message = message.toLowerCase();

  if (message.includes("hi") || message.includes("hello")) {
    return "Hi 👋 Welcome again!";
  }

  if (message.includes("shoes")) {
    return "👟 Shoes:\n1. Nike - ₹1999\n2. Adidas - ₹2499\n(Type 'add nike')";
  }

  if (message.includes("tshirt")) {
    return "👕 T-Shirts:\n1. Black - ₹499\n2. White - ₹699";
  }

  if (message.includes("add nike")) {
    return "✅ Nike Sneakers added to cart!";
  }

  if (message.includes("track")) {
    return "📦 Enter your Order ID.";
  }

  if (message.includes("delivery")) {
    return "🚚 Delivery in 3-5 days.";
  }

  if (message.includes("return")) {
    return "🔁 7-day return policy available.";
  }

  return "❌ Try: shoes, tshirt, track order";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value;

  if (message.trim() === "") return;

  addMessage(message, "user");

  const reply = getBotReply(message);
  setTimeout(() => addMessage(reply, "bot"), 400);

  input.value = "";
}

function quickMsg(text) {
  document.getElementById("userInput").value = text;
  sendMessage();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("userInput")
    .addEventListener("keypress", function(e) {
      if (e.key === "Enter") sendMessage();
    });
});