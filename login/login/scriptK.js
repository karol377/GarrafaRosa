document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Mensagem enviada com sucesso!");
        this.reset();
        
    });
});
 
this.reset();
function iniTabNav() {
    const tabMenu = document.querySelectorAll(".js-tabmenu li");
    const tabContent = document.querySelectorAll(".js-tabcontent section");
    if (tabMenu.length && tabContent.length) {
        tabContent[0].classList.add("ativo");

        function activeTab(index) {
            tabContent.forEach((section) => {
                section.classList.remove("ativo");
            });
            tabContent[index].classList.add("ativo");
        }

        tabMenu.forEach((itemMenu, index) => {
            itemMenu.addEventListener("click", () => { 
                activeTab(index);
        
            });
        });
    }
}


iniTabNav();