function carregarRanking() {
  const ranking = document.getElementById('ranking');
  const jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];

  // Ordena por pontuação
  jogadores.sort((a, b) => b.score - a.score);

  // Atualiza o pódio
  if (jogadores[0]) {
    document.getElementById('firstName').textContent = jogadores[0].name;
    document.getElementById('firstScore').textContent = jogadores[0].score + " pts";
  }
  if (jogadores[1]) {
    document.getElementById('secondName').textContent = jogadores[1].name;
    document.getElementById('secondScore').textContent = jogadores[1].score + " pts";
  }
  if (jogadores[2]) {
    document.getElementById('thirdName').textContent = jogadores[2].name;
    document.getElementById('thirdScore').textContent = jogadores[2].score + " pts";
  }

  // Exibe os demais jogadores no ranking lateral
  jogadores.slice(3).forEach((jogador, index) => {
    const item = document.createElement('li');
    item.textContent = `${index + 4}º - ${jogador.name} - ${jogador.score} pts`;
    ranking.appendChild(item);
  });
}

function voltarInicio() {
  window.location.href = 'indexK.html'; 
}

function limparRanking() {
  if (confirm("Tem certeza que deseja limpar o ranking?")) {
    localStorage.removeItem('jogadores');
    window.location.reload();
  }
}

carregarRanking();
