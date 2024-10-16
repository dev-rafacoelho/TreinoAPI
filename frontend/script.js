let userId = [];
let updateUserId;
let username = [];
let password = [];

window.onload = fetchAndRenderUsers();

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

  // Criar células do cabeçalho
  for (let i in data[0]) {
    const cell = headerRow.insertCell();
    cell.textContent = i;
    cell.style.border = "1px solid black";
    cell.style.padding = "8px";
    cell.style.backgroundColor = "#f2f2f2";
    cell.style.textAlign = "left";
  }

  // Adiciona uma célula de ações (Editar/Excluir) no cabeçalho
  const actionCell = headerRow.insertCell();
  actionCell.textContent = "Ações";
  actionCell.style.border = "1px solid black";
  actionCell.style.padding = "8px";
  actionCell.style.backgroundColor = "#f2f2f2";
  actionCell.style.textAlign = "left";

  // Criar linhas de dados
  const tbody = table.createTBody();
  data.forEach((item) => {
    const row = tbody.insertRow();
    for (const key in item) {
      const cell = row.insertCell();
      cell.textContent = item[key];
      cell.style.border = "1px solid black";
      cell.style.padding = "8px";
    }

    // Cria a célula de ação (Editar/Excluir)
    const actionCell = row.insertCell();

    // Botão de Editar
    const editButton = document.createElement("button");
    editButton.textContent = "EDITAR";
    editButton.onclick = () => openForm(item.id, item.username, item.password);
    actionCell.appendChild(editButton);

    // Botão de Excluir
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.onclick = () => deletar(item.id);
    actionCell.appendChild(deleteButton);

    actionCell.style.border = "1px solid black";
    actionCell.style.padding = "8px";
  });

  container.appendChild(table);
}

function openForm(id, user, pass) {
  console.log(id);
  updateUserId = id;
  document.getElementById("newusername").value = user;
  document.getElementById("newpassword").value = pass;
  const editP = document.getElementById("p");
  const form = document.getElementById("form");
  editP.innerHTML = "ATUALIZAR";
  form.style.display = "block";
  form.style.marginTop = "10px";
}

async function UpdateUser() {
  event.preventDefault();
  let nome = document.getElementById("newusername").value;
  let senha = document.getElementById("newpassword").value;

  if (nome === "" || senha === "") {
    p.innerHTML = "Preencha o Formulário";
  } else {
    console.log("nome:" + nome);
    console.log("senha:" + senha);
    const response = await fetch("http://localhost:3000/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: updateUserId,
        username: nome,
        password: senha,
      }),
    });

    if (!response.ok) {
      throw new Error("Se fudeu deu errado");
    }

    console.log("Usuário atualizado");
    const form = document.getElementById("form");
    form.style.display = "none";
    fetchAndRenderUsers();
  }
}

async function deletar(id) {
  const response = await fetch(`http://localhost:3000/delete/` + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(id);
  fetchAndRenderUsers();
}

async function CadastroUser(event) {
  event.preventDefault();
  let nome = document.getElementById("username").value;
  let senha = document.getElementById("password").value;
  let p = document.getElementById("escreva");

  if (nome === "" || senha === "") {
    p.innerHTML = "Preencha o Formulário";
  } else {
    console.log("nome:" + nome);
    console.log("senha:" + senha);
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: nome,
        password: senha,
      }),
    });
  }
  fetchAndRenderUsers();
}
