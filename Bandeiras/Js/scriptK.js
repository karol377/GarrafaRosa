document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const nomeJogador = document.getElementById("nome").value.trim();
      if (!nomeJogador) return;
  
      // Salva o nome do jogador no localStorage
      localStorage.setItem("nomeJogador", nomeJogador);
  
      // Redireciona para o jogo
      window.location.href = "indexX.html";
    });
  });

  document.getElementById("login").addEventListener("submit", function(event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    if (nome) {
        localStorage.setItem('nomeJogador', nome);
        window.location.href = "indexX.html"; // página do jogo
    } else {
        alert("Por favor, digite seu nome.");
    }
});
