
// Elementos do DOM
const flagContainer = document.getElementById('flag-container');
const flagImage = document.getElementById('flag');
const optionsContainer = document.getElementById('options');
const resultContainer = document.getElementById('result');
const nextButton = document.getElementById('next-button');
const endButton = document.getElementById('end-button');

// Variáveis do jogo
let countries = [];
let currentCountry;
let score = 0;
let roundsPlayed = 0;
let startTime;
let endTime;
let totalTime;

// Captura o nome do jogador no início do jogo
let nomeJogador = prompt("Digite seu nome para o ranking:") || "Anônimo";

// Função para buscar os países
async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v2/all');
    countries = await response.json();
    startGame();
}

// Função para iniciar o jogo
function startGame() {
    if (roundsPlayed === 0) {
        startTime = Date.now();
    }

    if (roundsPlayed >= 10) {
        endTime = Date.now();
        totalTime = Math.floor((endTime - startTime) / 1000);

        // Cria um novo registro de jogador
        const novoRegistro = {
            nome: nomeJogador,
            pontuacao: score,
            tempo: totalTime
        };

        // Recupera o ranking atual ou inicializa um novo
        let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
        ranking.push(novoRegistro);

        // Salva o ranking atualizado no localStorage
        localStorage.setItem('ranking', JSON.stringify(ranking));

        resultContainer.textContent = `🏁 Jogo terminado! Você acertou ${score} de 10 em ${totalTime} segundos.`;

        nextButton.style.display = 'none';
        endButton.style.display = 'inline-block';

        endButton.addEventListener('click', () => {
            window.location.href = "../ranking/indexM.html";
        });

        return;
    }

    // Seleciona uma bandeira aleatória
    const randomIndex = Math.floor(Math.random() * countries.length);
    currentCountry = countries[randomIndex];

    flagImage.src = currentCountry.flags.png;
    generateOptions();
}

// Função para gerar as opções de resposta
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

// Função para verificar a resposta do jogador
function checkAnswer(selected) {
    if (selected === currentCountry.name) {
        score++;
        resultContainer.textContent = '✅ Correto!';
    } else {
        resultContainer.textContent = `❌ Errado! A resposta correta é ${currentCountry.name}.`;
    }

    resultContainer.textContent += ` Pontuação: ${score}`;
    roundsPlayed++;
    nextButton.style.display = 'block';
}

// Evento do botão "Próxima"
nextButton.onclick = () => {
    resultContainer.textContent = '';
    nextButton.style.display = 'none';
    startGame();
};

// Inicia o jogo
fetchCountries();
