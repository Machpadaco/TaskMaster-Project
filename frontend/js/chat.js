const messageForm = document.getElementById('messageForm');
const messageList = document.getElementById('messageList');
const socket = io(); // Make sure you load Socket.IO on frontend

messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    userId: localStorage.getItem('userId'),
    content: messageForm.content.value,
    parentId: null // for top-level messages
  };

  const res = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  messageForm.reset();
  loadMessages();
});

async function loadMessages() {
  const res = await fetch('/chat');
  const messages = await res.json();

  messageList.innerHTML = messages.map(m => `
    <div class="message">
      <strong>${m.userId.username || 'User'}:</strong> ${m.content}
      <button onclick="loadReplies('${m._id}')">View Replies</button>
      <div id="replies-${m._id}"></div>
    </div>
  `).join('');
}

async function loadReplies(parentId) {
  const res = await fetch(`/chat/${parentId}/replies`);
  const replies = await res.json();

  document.getElementById(`replies-${parentId}`).innerHTML = replies.map(r => `
    <div class="reply">↳ ${r.content}</div>
  `).join('');
}

socket.on('newMessage', () => loadMessages());

window.onload = loadMessages;
