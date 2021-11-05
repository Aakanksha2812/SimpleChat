var socket = io();
    var messages = document.getElementById('messages');
    var form = document.getElementById('form');
    var btn = document.getElementById('btninp');
    var input = document.getElementById('input');
    var name;
    name = prompt("pls enter your name");

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      sendMessage(input.value);
    });
    function sendMessage(message) {
      let msg = {
        user: name,
        message: message.trim()
      }
      appendMessage(msg, 'outgoing')
      socket.emit('message', msg)
      scrollToBottom()
    }
    socket.on('message', (msg) => {
      appendMessage(msg, 'incoming');
      input.value = '';
    
      scrollToBottom()

    });
    function appendMessage(msg, type) {
      const messageElement = document.createElement('div');
      let className = type;
      messageElement.classList.add(className, 'message')
      let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
      `
      messageElement.innerHTML = markup;
      messages.append(messageElement);
    }
    function scrollToBottom() {
      messageArea.scrollTop = messageArea.scrollHeight
    }