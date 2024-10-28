function fazerCadastro() {
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const usuario = document.getElementById("usuario");
  const senha = document.getElementById("senha");

  // Remove a classe de erro antes de validar novamente
  nome.classList.remove("erro");
  email.classList.remove("erro");
  usuario.classList.remove("erro");
  senha.classList.remove("erro");

  if (!nome.value) {
    nome.classList.add("erro");
    if (!email.value) {
      email.classList.add("erro");
    }
    if (!usuario.value) {
      usuario.classList.add("erro");
    }
    if (!senha.value) {
      senha.classList.add("erro");
    }

    if (nome.value && email.value && usuario.value && senha.value) {
      const dadosCadastro = {
        nome: nome,
        email: email,
        usuario: usuario,
        senha: senha,
      };

      // Envio dos dados de cadastro para o servidor (exemplo)
      fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCadastro),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.id) {
            exibirPopup();
            limparFormulario();
          } else {
            alert("Erro ao realizar cadastro. Tente novamente.");
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
          alert("Erro ao conectar com o servidor.");
        });
    } else {
        exibirPopup();
    }
  }
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
  document.getElementById("email").value = "";
  document.getElementById("usuario").value = "";
  document.getElementById("senha").value = "";
}
