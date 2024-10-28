function fazerLogin() {
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");

    // Remove a classe de erro antes de validar novamente
    email.classList.remove("erro");
    senha.classList.remove("erro");

    // Verifica se o email foi preenchido
    if (!email.value) {
        email.classList.add("erro");
    }

    // Verifica se a senha foi preenchida
    if (!senha.value) {
        senha.classList.add("erro");
    }

        // exibirPopup();
}

function exibirPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "flex";
}

function fecharPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}
