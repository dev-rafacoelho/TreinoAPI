let userId = [];
let username = [];
let password = [];

async function fetchAndRenderUsers() {
  try {
    const response = await fetch("http://localhost:3000/getusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    renderTable(data);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
}

function renderTable(data) {
  const container = document.getElementById("table-container");
  container.innerHTML = "";

  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";

  const header = table.createTHead();
  const headerRow = header.insertRow(0);

  // Create header cells
  for (let i in data[0]) {
    const cell = headerRow.insertCell();
    cell.textContent = i;
    cell.style.border = "1px solid black";
    cell.style.padding = "8px";
    cell.style.backgroundColor = "#f2f2f2";
    cell.style.textAlign = "left";
  }

  // Create data rows
  const tbody = table.createTBody();
  data.forEach((item) => {
    const row = tbody.insertRow();
    for (const key in item) {
      const cell = row.insertCell();
      cell.textContent = item[key];
      cell.style.border = "1px solid black";
      cell.style.padding = "8px";
    }
  });

  container.appendChild(table);
}

async function CadastroUser() {
  event.preventDefault();
  let url = "http://localhost:3000/users";

  let nome = document.getElementById("username").value;
  let senha = document.getElementById("password").value;
  let p = document.getElementById("escreva");

  if (nome === "" && senha === "") {
    p.innerHTML = "Preencha o Formulário";
  } else {
    console.log("nome:" + nome);
    console.log("senha:" + senha);
  }
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: nome,
      password: senha,
      presente: true,
    }),
  });
}
