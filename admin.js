const loginForm = document.getElementById("login-form");
const adminPanel = document.getElementById("admin-panel");
const logoutBtn = document.getElementById("logout-btn");
const eventForm = document.getElementById("event-form");
const adminEventsList = document.getElementById("admin-events-list");

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin";

function saveEvents(events) {
  localStorage.setItem("eventos", JSON.stringify(events));
}

function getEvents() {
  const data = localStorage.getItem("eventos");
  return data ? JSON.parse(data) : [];
}

function renderEvents() {
  const events = getEvents();
  adminEventsList.innerHTML = "";
  events.forEach((ev, i) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.innerHTML = `<div><strong>${ev.nome}</strong> - ${new Date(ev.data).toLocaleString("pt-BR")}<br>${ev.desc}</div>
                    <button class="btn btn-sm btn-danger">Excluir</button>`;
    li.querySelector("button").onclick = () => {
      events.splice(i, 1);
      saveEvents(events);
      renderEvents();
    };
    adminEventsList.appendChild(li);
  });
}

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if(user === ADMIN_USER && pass === ADMIN_PASS) {
    loginForm.style.display = "none";
    adminPanel.style.display = "block";
    renderEvents();
  } else {
    alert("Usuário ou senha incorretos.");
  }
});

logoutBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  

eventForm.addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById("event-name").value;
  const data = document.getElementById("event-date").value;
  const desc = document.getElementById("event-desc").value;

  if(nome && data && desc) {
    const events = getEvents();
    events.push({ nome, data, desc });
    saveEvents(events);
    renderEvents();
    eventForm.reset();
  }
});
