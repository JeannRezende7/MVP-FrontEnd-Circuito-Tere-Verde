document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("eventos-container");
  
    const storedEvents = localStorage.getItem("eventos");
    let eventos;
  
    if (storedEvents) {
      eventos = JSON.parse(storedEvents);
    } else {
      eventos = [
        { nome: "Festival de Montanhismo", data: "2025-08-15T09:00" },
        { nome: "Mutirão de Limpeza das Trilhas", data: "2025-08-21T08:00" },
        { nome: "Passeio Guiado no Parque Natural", data: "2025-08-30T10:00" }
      ];
    }
  
    const lista = document.createElement("ul");
    eventos.forEach(e => {
      const li = document.createElement("li");
      li.textContent = `${e.nome} - ${new Date(e.data).toLocaleString("pt-BR")}`;
      lista.appendChild(li);
    });
  
    container.innerHTML = "";
    container.appendChild(lista);
  });
  