"use strict";
{
  const socket = io();
  socket.connect("http://example.com");
  socket.on("message", ({ author, content }) => addMessage(author, content));

  const loginForm = document.querySelector("#welcome-form");
  const messagesSection = document.querySelector("#messages-section");
  const messagesList = document.querySelector("#messages-list");
  const addMessageForm = document.querySelector("#add-messages-form");
  const userNameInput = document.querySelector("#username");
  const messageContentInput = document.querySelector("#message-content");
  let userName = "";

  function login(e) {
    e.preventDefault();

    if (!userNameInput.value) {
      alert("Please enter user name");
    } else {
      userName = userNameInput.value;
      loginForm.classList.toggle("show");
      messagesSection.classList.toggle("show");
    }
  }

  function addMessage(author, content) {
    let message = document.createElement("li");

    const heading = document.createElement("h3");

    heading.classList.add(".message__author");
    if (author === userName) {
      heading.innerHTML = "You";
    } else {
      heading.innerHTML = author;
    }

    const div = document.createElement("div");

    div.classList.add("message__content");

    div.innerHTML = content;

    message.classList.add("message", "message--received");
    if (author === username) {
      message.classList.add("message--self");
    }

    message.appendChild(heading);
    message.appendChild(div);

    messagesList.appendChild(message);
  }
  function sendMessage(e) {
    e.preventDefault();

    let messageContent = messageContentInput.value;

    if (!messageContent.length) {
      alert("You have to type something!");
    } else {
      addMessage(userName, messageContent);
      socket.emit("message", { author: userName, content: messageContent });
      messageContentInput.value = "";
    }
  }

  loginForm.addEventListener("submit", (e) => {
    login(e);
  });

  addMessageForm.addEventListener("submit", (e) => {
    sendMessage(e);
  });
}
