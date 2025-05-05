const flagContainer = document.getElementById('flag-container');
const flagImage = document.getElementById('flag');
const optionsContainer = document.getElementById('options');
const resultContainer = document.getElementById('result');
const nextButton = document.getElementById('next-button');
const rankingContainer = document.getElementById('ranking'); // Novo elemento para exibir o ranking

let countries = [];
let currentCountry;
let score = 0; // Pontuação de acertos
let roundsPlayed = 0; // Contador de rodadas
let rankings = []; // Array para armazenar os rankings


// Após salvar o ranking no localStorage
localStorage.setItem('ranking', JSON.stringify(ranking));

// Atualiza o ranking antes de redirecionar para a página de ranking
window.location.href = "../ranking/indexM.html";

function startGame() {
    if (roundsPlayed >= 10) {
        resultContainer.textContent = `Jogo terminado! Você acertou ${score} de 10.`;
        nextButton.style.display = 'none'; // Esconde o botão "Próximo"
        updateRanking(); // Atualiza o ranking
        return; // Para o jogo
    }

    const randomIndex = Math.floor(Math.random() * countries.length);
    currentCountry = countries[randomIndex];
    
    flagImage.src = currentCountry.flags.png;
    generateOptions();
}

function generateOptions() {
    const options = [currentCountry.name];

    while (options.length < 4) {
        const randomIndex = Math.floor(Math.random() * countries.length);
        const randomCountry = countries[randomIndex].name;

        if (!options.includes(randomCountry)) {
            options.push(randomCountry);
        }
    }

    options.sort(() => Math.random() - 0.5);
    
    optionsContainer.innerHTML = '';

    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selected) {
    if (selected === currentCountry.name) {
        score++; // Aumenta a pontuação de acertos
        resultContainer.textContent = 'Correto!';
    } else {
        resultContainer.textContent = `Errado! A resposta correta é ${currentCountry.name}.`;
    }

    // Exibir a pontuação atual
    resultContainer.textContent += ` Pontuação: ${score}`;

    roundsPlayed++; // Incrementa o contador de rodadas
    nextButton.style.display = 'block'; // Mostra o botão "Próximo"
}

function updateRanking() {
    // Adiciona o jogador e sua pontuação ao ranking
    rankings.push({ name: playerName, score: score });
    
    // Ordena o ranking por pontuação (do maior para o menor)
    rankings.sort((a, b) => b.score - a.score);
    
    // Limita o ranking a 10 jogadores
    rankings = rankings.slice(0, 10);
    
    // Exibe o ranking
    displayRanking();

    // Salva o ranking em um arquivo JSON (simulação)
    saveRankingToFile();
}

function displayRanking() {
    rankingContainer.innerHTML = '<h2>Ranking</h2>'; // Título do ranking
    rankings.forEach((entry, index) => {
        const rankItem = document.createElement('div');
        rankItem.textContent = `${index + 1}. ${entry.name} - ${entry.score} pontos`;
        rankingContainer.appendChild(rankItem);
    });
}

nextButton.onclick = () => {
    resultContainer.textContent = '';
}