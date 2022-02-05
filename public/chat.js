// make connection
const socket = io.connect("localhost:3000");

// query DOM
const message = document.getElementById("message");
const handle = document.getElementById("handle");
const btnSend = document.getElementById("send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

// emit events
btnSend.addEventListener("click", (e) => {
  if (message.value) {
    socket.emit("chat", {
      message: message.value,
      handle: handle.value,
    });
    message.value = "";
  }
});

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

// listen for evetns
socket.on("chat", (data) => {
  output.innerHTML += `<p><strong>${data.handle}:</strong>${data.message}</p>`;
  feedback.innerHTML = "";
});

// listen for typing
socket.on("typing", (data) => {
  if (!feedback.innerHTML)
    setTimeout(() => {
      feedback.innerHTML = "";
    }, 3000);
  feedback.innerHTML = `<p><em>${data} is typing message<img src="/simple_loading.gif" alt="ellipses"></em></p>`;
});
