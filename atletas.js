document.addEventListener("DOMContentLoaded", async () => {
    const atletasList = document.getElementById("atletas-list");

    try {
        const response = await fetch("http://localhost:3000/atletas");
        let atletas = await response.json();
        atletas = atletas.sort((a, b) => b.media - a.media);

        atletas.forEach((atleta, index) => {
            const listItem = document.createElement("li");

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

            listItem.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div style="display: flex; align-items: center;">
                    <input type="checkbox" id="atleta-${index}" name="atleta" value="${atleta.id}">
                    <label for="atleta-${index}" style="margin-left: 8px;">
                        ${atleta.nome} - ${atleta.posicao} (${generateStars(atleta.media)})
                    </label>
                </div>
                <button class="delete-btn" onclick="showDeletePopup(${atleta.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
            </div>
        `;
            atletasList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Erro ao carregar os atletas:", error);
    }
});

function sort() {
    const selectedAtletas = [];
    document.querySelectorAll('input[name="atleta"]:checked').forEach(checkbox => {
        const atletaId = checkbox.value;
        selectedAtletas.push(atletaId);
    });

    if (selectedAtletas.length < 4) {
        exibirPopup();
        return;
    }

    exibirPopupTimes(selectedAtletas.length);
}

function exibirPopupTimes(numAtletasSelecionados) {
    // Desabilita todas as opções inicialmente
    const radio2 = document.querySelector('input[value="2"]');
    const radio3 = document.querySelector('input[value="3"]');
    const radio4 = document.querySelector('input[value="4"]');

    // Habilita as opções de acordo com o número de atletas selecionados
    radio2.disabled = numAtletasSelecionados < 4;
    radio3.disabled = numAtletasSelecionados < 6;
    radio4.disabled = numAtletasSelecionados < 8;

    // Define a primeira opção habilitada como selecionada por padrão
    if (!radio2.disabled) radio2.checked = true;
    else if (!radio3.disabled) radio3.checked = true;
    else if (!radio4.disabled) radio4.checked = true;

    // Exibe o popup
    document.getElementById("popupTimes").style.display = 'flex';
}

function fecharPopupTimes() {
    document.getElementById("popupTimes").style.display = 'none';
}

let numAtletasPorTime; // Variável global para armazenar a escolha do usuário

function confirmNumAtletasPorTime() {
    // Obtém o valor selecionado nos botões de rádio e armazena globalmente
    numAtletasPorTime = parseInt(document.querySelector('input[name="numAtletasPorTime"]:checked').value);
    
    // Fecha o popup
    fecharPopupTimes();
    
    // Continua a lógica de sorteio após a seleção
    fetch("http://localhost:3000/atletas")
        .then(response => response.json())
        .then(atletas => {
            const selectedAtletas = document.querySelectorAll('input[name="atleta"]:checked');
            const atletasSelecionados = atletas.filter(atleta => Array.from(selectedAtletas).some(sel => sel.value === atleta.id.toString()));
            
            const times = criarTimesBalanceados(atletasSelecionados);
            localStorage.setItem("equipesGeradas", JSON.stringify(times));
            window.location.href = "equipes.html";
        })
        .catch(error => console.error("Erro ao sortear atletas:", error));
}

// Função para embaralhar a lista de atletas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function criarTimesBalanceados(atletas) {
    // Verifica se numAtletasPorTime está definida corretamente
    if (!numAtletasPorTime) {
        console.error("Número de atletas por time não definido.");
        return [];
    }

    // Embaralha a lista de atletas para criar variação
    atletas = shuffle(atletas);
    
    // Ordena pela média depois de embaralhar, para manter controle das regras
    atletas.sort((a, b) => b.media - a.media);

    const numTimes = Math.ceil(atletas.length / numAtletasPorTime);
    const times = Array.from({ length: numTimes }, () => []);

    const podeAdicionarAtleta = (time, atleta) => {
        const temTresEstrelas = time.filter(a => a.media === 3).length;
        const temUmaEstrela = time.filter(a => a.media === 1).length;

        if (atleta.media === 3 && temTresEstrelas >= 1) return false;
        if (atleta.media === 1 && temUmaEstrela >= 1) return false;
        return true;
    };

    let index = 0;
    atletas.forEach(atleta => {
        // Encontra um time onde o atleta pode ser adicionado sem quebrar as regras
        let added = false;
        for (let attempt = 0; attempt < numTimes; attempt++) {
            if (podeAdicionarAtleta(times[index], atleta)) {
                times[index].push(atleta);
                added = true;
                break;
            }
            // Tenta o próximo time se as regras não forem satisfeitas
            index = (index + 1) % numTimes;
        }
        
        // Adiciona o atleta ao time atual se ele não conseguiu encaixar em nenhum time (caso de exceção)
        if (!added) {
            times[index].push(atleta);
        }

        // Passa para o próximo time na sequência
        index = (index + 1) % numTimes;
    });

    return times;
}

// Funções de popup
function exibirPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function fecharPopup() {
    document.getElementById('popup').style.display = 'none';
}

let atletaToDelete = null;

function showDeletePopup(atletaId) {
    atletaToDelete = atletaId;
    document.getElementById('popupConfirm').style.display = 'flex';
}

function confirmPopup() {
    if (atletaToDelete !== null) {
        fetch(`http://localhost:3000/atletas/${atletaToDelete}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(() => {
                fecharPopupConfirm();
                exibirPopupOk();
            })
            .catch(error => console.error("Erro ao deletar atleta:", error));
    }
}

function cancelPopup() {
    fecharPopupConfirm();
}

function fecharPopupConfirm() {
    document.getElementById('popupConfirm').style.display = 'none';
}

function exibirPopupOk() {
    document.getElementById('popupOk').style.display = 'flex';
}

function fecharPopupOk() {
    document.getElementById('popupOk').style.display = 'none';
    location.reload(); // Recarrega a lista para atualizar após a exclusão
}

let selectAll = true;

function toggleSelectAll() {
    const checkboxes = document.querySelectorAll('input[name="atleta"]');
    checkboxes.forEach(checkbox => checkbox.checked = selectAll);
    selectAll = !selectAll;
}