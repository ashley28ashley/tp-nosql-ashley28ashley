const API = "http://localhost:3000/api";
let token = localStorage.getItem("token") || null;

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* -------------------------
   AUTH
------------------------- */
function register() {
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;

  fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(r => r.json())
    .then(data => {
      document.getElementById("reg-result").innerText = data.message;
    });
}

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(r => r.json())
    .then(data => {
      if (data.token) {
        token = data.token;
        localStorage.setItem("token", token);
        document.getElementById("token-display").innerText = token;
      } else {
        document.getElementById("login-result").innerText = data.message;
      }
    });
}

function logout() {
  token = null;
  localStorage.removeItem("token");
  document.getElementById("token-display").innerText = "(aucun token)";
}

/* -------------------------
   LIST POKEMONS
------------------------- */
function loadPokemons() {
  const name = document.getElementById("search-name").value;
  const type = document.getElementById("search-type").value;

  const params = new URLSearchParams();
  if (name) params.append("name", name);
  if (type) params.append("type", type);

  fetch(`${API}/pokemons?${params.toString()}`)
    .then(r => r.json())
    .then(data => {
      const list = document.getElementById("pokemon-list");
      list.innerHTML = "";

      data.data.forEach(p => {
        const card = document.createElement("div");
        card.className = "pokemon-card";

        card.innerHTML = `
          <h3>${p.name.french}</h3>
          <img src="${p.image}" />
          <p>Type: ${p.type.join(", ")}</p>
          <button onclick="deletePokemon(${p.id})">Supprimer</button>
        `;

        list.appendChild(card);
      });
    });
}

/* -------------------------
   CREATE
------------------------- */
function createPokemon() {
  const body = {
    id: parseInt(document.getElementById("create-id").value),
    name: {
      english: document.getElementById("create-name-en").value,
      french: document.getElementById("create-name-fr").value
    },
    type: document.getElementById("create-type").value.split(",").map(t => t.trim()),
    base: {
      HP: parseInt(document.getElementById("create-hp").value),
      Attack: parseInt(document.getElementById("create-attack").value),
      Defense: parseInt(document.getElementById("create-defense").value),
      Speed: parseInt(document.getElementById("create-speed").value)
    },
    image: document.getElementById("create-image").value
  };

  fetch(`${API}/pokemons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
    .then(r => r.json())
    .then(data => {
      document.getElementById("create-result").innerText = data.message || "Créé !";
    });
}

/* -------------------------
   DELETE
------------------------- */
function deletePokemon(id) {
  if (!token) return alert("Token requis");

  fetch(`${API}/pokemons/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(r => r.json())
    .then(data => {
      alert(data.message);
      loadPokemons();
    });
}