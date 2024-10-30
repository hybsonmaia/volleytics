document.addEventListener("DOMContentLoaded", () => {
  exibirNomePelada();
});

function cadastrarAtleta() {
  const camposObrigatorios = document.querySelectorAll(
    "#nome, #posicao, #nivelPasse, #nivelAtaque, #nivelSaque, #nivelToque"
  );
  let formValido = true;

  camposObrigatorios.forEach((campo) => {
    campo.classList.remove("erro");
    if (!campo.value) {
      campo.classList.add("erro");
      formValido = false;
    }
  });

  if (formValido) {
    const atleta = {
      nome: document.getElementById("nome").value,
      posicao: document.getElementById("posicao").value,
      passe: parseInt(document.getElementById("nivelPasse").value),
      ataque: parseInt(document.getElementById("nivelAtaque").value),
      saque: parseInt(document.getElementById("nivelSaque").value),
      toque: parseInt(document.getElementById("nivelToque").value),
      peladaId: getPeladaId(),
    };

    fetch("http://localhost:3000/atletas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(atleta),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.atleta) { 
          exibirPopup();
          limparFormulario();
        } else {
          alert("Erro ao cadastrar atleta. Tente novamente.");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao conectar com o servidor.");
      });
  }
}

function getPeladaId() {
  return localStorage.getItem("peladaId");
}

function exibirNomePelada() {
  const nomePelada = getNomePelada();
  const nomePeladaTitulo = document.getElementById("nomePeladaTitulo");
  if (nomePelada) {
    nomePeladaTitulo.textContent = `(${nomePelada})`;
  } else {
    nomePeladaTitulo.textContent = "Pelada não especificada";
  }
}

function getNomePelada() {
  return localStorage.getItem("nomePelada");
}

function exibirPopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "flex";
}

function fecharPopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("posicao").value = "";
  document.getElementById("nivelPasse").value = "";
  document.getElementById("nivelAtaque").value = "";
  document.getElementById("nivelSaque").value = "";
  document.getElementById("nivelToque").value = "";
}
