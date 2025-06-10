const flagImage = document.getElementById('flag');
const optionsContainer = document.getElementById('options');
const resultContainer = document.getElementById('result');
const nextButton = document.getElementById('next-button');
const endButton = document.getElementById('end-button');
const timerDisplay = document.createElement('div');

// Estilo do temporizador
timerDisplay.style.fontSize = "20px";
timerDisplay.style.marginTop = "10px";
resultContainer.parentNode.insertBefore(timerDisplay, resultContainer);

// Contador de jogadas restantes
const remainingPlaysDisplay = document.createElement('div');
remainingPlaysDisplay.style.fontSize = "20px";
remainingPlaysDisplay.style.marginTop = "10px";
remainingPlaysDisplay.style.fontWeight = "bold";
remainingPlaysDisplay.style.color = "#f1f1f1";
remainingPlaysDisplay.style.textAlign = "center";
remainingPlaysDisplay.style.padding = "10px";
remainingPlaysDisplay.style.border = "2px dashed #444";
remainingPlaysDisplay.style.borderRadius = "10px";
remainingPlaysDisplay.style.width = "fit-content";
remainingPlaysDisplay.style.margin = "20px auto";
remainingPlaysDisplay.style.backgroundColor = "#222";
document.body.insertBefore(remainingPlaysDisplay, document.body.firstChild);

// Sons
const somAcerto = new Audio('acerto.mp3');
const somErro = new Audio('erro.mp3');

let countries = [];
let score = 0;
let roundsPlayed = 0;
let startTime;
let endTime;
let totalTime;
let timer;
let timeLeft = 30;
let currentCountry;

let nomeJogador = localStorage.getItem("nomeJogador") || "Anônimo";

// Iniciar o jogo
function startGame() {
    if (roundsPlayed >= 10) {
        endTime = Date.now();
        totalTime = Math.floor((endTime - startTime) / 1000);

        resultContainer.textContent = `🏁 Jogo terminado, ${nomeJogador}! Você acertou ${score} de 10 em ${totalTime} segundos.`;
        resultContainer.textContent += `\nRodadas jogadas: ${roundsPlayed} / 10`;

        nextButton.style.display = 'none';
        salvarPontuacao(nomeJogador, score);

        setTimeout(() => {
            window.location.href = 'indexM.html';
        }, 3000);
        return;
    }

    if (roundsPlayed === 0) {
        startTime = Date.now();
    }

    const randomIndex = Math.floor(Math.random() * countries.length);
    currentCountry = countries[randomIndex];
    flagImage.src = currentCountry.flags.png || currentCountry.flags.svg;

    generateOptions();
    updateProgress();
    startTimer();
}

// Gerar opções
function generateOptions() {
    const options = [currentCountry.name];

    while (options.length < 4) {
        const randomCountry = countries[Math.floor(Math.random() * countries.length)].name;
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

// Verificar resposta
function checkAnswer(selected) {
    stopTimer();

    const botoes = optionsContainer.querySelectorAll('button');
    botoes.forEach(botao => {
        botao.disabled = true;
        if (botao.textContent === currentCountry.name) {
            botao.classList.add('correto');
        } else if (botao.textContent === selected) {
            botao.classList.add('errado');
        }
    });

    if (selected === currentCountry.name) {
        score++;
        const somAcerto = new Audio('../som/acerto.mp3');    } 
        else {
            const somErro = new Audio('../som/erro.mp3');
        }

    resultContainer.textContent += ` Pontuação: ${score}`;
    roundsPlayed++;
    updateProgress();
    nextButton.style.display = 'block';
}

// Atualizar progresso
function updateProgress() {
    const remaining = 10 - roundsPlayed;
    remainingPlaysDisplay.textContent = `🎯 Jogadas restantes: ${remaining}`;
}

// Botão "Próxima"
nextButton.onclick = () => {
    resultContainer.textContent = '';
    nextButton.style.display = 'none';
    startGame();
};




// Temporizador
function startTimer() {
    timeLeft = 30;
    timerDisplay.textContent = `⏱️ Tempo restante: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `⏱️ Tempo restante: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            resultContainer.textContent = `⏰ Tempo esgotado! A resposta correta era ${currentCountry.name}.`;
            somErro.play(); // Toca som de erro ao esgotar o tempo
            roundsPlayed++;
            updateProgress();
            nextButton.style.display = 'block';
        }
    }, 1000);
}

// Parar temporizador
function stopTimer() {
    clearInterval(timer);
}

// Salvar pontuação
function salvarPontuacao(nome, pontos) {
    const jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
    jogadores.push({ name: nome, score: pontos });
    localStorage.setItem('jogadores', JSON.stringify(jogadores));
}

// Buscar países
async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,translations,flags");
        const data = await response.json();

        countries = data
            .filter(country => country.flags && (country.translations?.por?.common || country.name?.common))
            .map(country => ({
                name: country.translations?.por?.common || country.name?.common,
                flags: country.flags
            }));

        if (countries.length < 10) {
            throw new Error("Não foi possível carregar países suficientes.");
        }

        startGame();
    } catch (error) {
        console.error("Erro ao buscar países:", error);
        resultContainer.textContent = "⚠️ Erro ao carregar os países. Tente novamente mais tarde.";
    }
}

// Começar o jogo
fetchCountries();
