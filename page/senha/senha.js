function resetarSenha() {
    const email = document.getElementById("email");

    // Remove a classe de erro antes de validar novamente
    email.classList.remove("erro");

    if (!email.value) {
        email.classList.add("erro");
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    // Enviar o e-mail para o servidor (exemplo)
    fetch("http://localhost:3000/resetar-senha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.value }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data && data.sucesso) {
            exibirPopup();
        } else {
            alert("Erro ao enviar e-mail. Tente novamente.");
        }
    })
    .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao conectar com o servidor.");
    });
}

function exibirPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "flex";
}

function fecharPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}
