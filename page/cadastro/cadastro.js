async function fazerCadastro() {
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const nomePelada = document.getElementById("nomePelada");
  const senha = document.getElementById("senha");

  nome.classList.remove("erro");
  email.classList.remove("erro");
  nomePelada.classList.remove("erro");
  senha.classList.remove("erro");

  if (!nome.value) nome.classList.add("erro");
  if (!email.value) email.classList.add("erro");
  if (!nomePelada.value) nomePelada.classList.add("erro");
  if (!senha.value) senha.classList.add("erro");

  if (nome.value && email.value && nomePelada.value && senha.value) {
    const dadosCadastro = {
      nome: nome.value,
      email: email.value,
      nomePelada: nomePelada.value,
      senha: senha.value,
    };

    try {
      const response = await fetch("http://localhost:3000/organizadores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCadastro),
      });

      if (response.ok) {
        limparFormulario();
        exibirPopupSucesso();
      } else {
        alert("Erro ao cadastrar organizador. Verifique os dados.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar organizador:", error);
      alert("Erro ao cadastrar organizador. Tente novamente.");
    }
  } else {
    exibirPopup();
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
  document.getElementById("nomePelada").value = "";
  document.getElementById("senha").value = "";
}

function togglePassword() {
  const passwordInput = document.getElementById("senha");
  const eyeIcon = document.getElementById("eye-icon");

  eyeIcon.style.transition = "opacity 0.5s ease"; 

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.innerHTML = `<path d="M12 4.5C7.05 4.5 2.73 7.61 1 12c1.73 4.39 6.05 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 16.95 4.5 12 4.5zm0 13c-2.9 0-5.5-2.1-6.48-5 0.98-2.9 3.58-5 6.48-5s5.5 2.1 6.48 5c-0.98 2.9-3.58 5-6.48 5zm0-7.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/>`;
  } else {
    passwordInput.type = "password";
    eyeIcon.innerHTML = `<path d="M12 4.5C7.05 4.5 2.73 7.61 1 12c1.73 4.39 6.05 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 16.95 4.5 12 4.5zm0 13c-2.9 0-5.5-2.1-6.48-5 0.98-2.9 3.58-5 6.48-5s5.5 2.1 6.48 5c-0.98 2.9-3.58 5-6.48 5zM2 2l20 20"/>`;
  }
}


function exibirPopupSucesso() {
  document.getElementById("popup-sucesso").style.display = "flex";
}

function fecharPopupSucesso() {
  document.getElementById("popup-sucesso").style.display = "none";
  window.location.href = "../login/login.html";
}