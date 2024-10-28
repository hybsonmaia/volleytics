document.addEventListener("DOMContentLoaded", () => {
    const teamsList = document.getElementById("teams-list");
    const teams = JSON.parse(localStorage.getItem("equipesGeradas"));

    // Função para gerar estrelas com base na média
    const generateStars = (media) => {
        let stars = '';
        for (let i = 0; i < Math.floor(media); i++) {
            stars += '<span class="star">★</span>';
        }
        for (let i = Math.floor(media); i < 3; i++) {
            stars += '<span class="star">☆</span>';
        }
        return stars;
    };

    // Renderiza as equipes com as estrelas e o efeito de zoom no nome
    teams.forEach((time, index) => {
        const teamDiv = document.createElement("div");
        teamDiv.classList.add("team");
        teamDiv.innerHTML = `<h3>Time ${index + 1}</h3><ul>${
            time.map(atleta => `<li><span class="athlete-name">${atleta.nome} ${generateStars(atleta.media)}</span></li>`).join("")
        }</ul>`;
        teamsList.appendChild(teamDiv);
    });
});