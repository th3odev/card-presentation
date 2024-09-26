// selecionando elementos do DOM
const themeToggleCheckbox = document.getElementById("theme-toggle");
const socialIcons = document.querySelectorAll(".social-icons a");
const themeSwitch = document.querySelector(".switch .checkbox");
const musicControl = document.getElementById("music-control");
const playIcon = document.getElementById("play-icon");

// caminhos dos arquivos de som
const hoverSound = new Audio("./assets/sounds/ui-hover.wav");
const switchSound = new Audio("./assets/sounds/switch.mp3");
const music = new Audio("./assets/sounds/music.mp3");
music.loop = true; // configura a música para tocar em loop

// função para alternar entre play e pause
const togglePlayPause = () => {
  if (music.paused) {
    music.play();
    playIcon.src = "https://cdn-icons-png.flaticon.com/512/16/16427.png"; // ícone de pause
  } else {
    music.pause();
    playIcon.src = "https://cdn-icons-png.flaticon.com/512/0/375.png"; // ícone de play
  }
};

// adiciona o evento de clique ao ícone de música
musicControl.addEventListener("click", togglePlayPause);

// função para iniciar a música após a interação do usuário
const initiateMusic = () => {
  const playPromise = music.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {
      const userInteractionHandler = () => {
        music.play();
        playIcon.src = "https://cdn-icons-png.flaticon.com/512/16/16427.png"; // ícone de pause
        document.body.removeEventListener("click", userInteractionHandler);
        document.body.removeEventListener("touchstart", userInteractionHandler);
      };

      document.body.addEventListener("click", userInteractionHandler, {
        once: true,
      });
      document.body.addEventListener("touchstart", userInteractionHandler, {
        once: true,
      });
    });
  } else {
    playIcon.src = "https://cdn-icons-png.flaticon.com/512/16/16427.png";
  }
};

// função para aplicar o efeito de blur na página
const applyBlurEffect = () => {
  const blurEffect = document.getElementById("blur-effect");

  if (blurEffect) {
    blurEffect.style.display = "none";
    blurEffect.offsetHeight; // força um reflow/repaint
    blurEffect.style.display = "block";

    setTimeout(() => {
      blurEffect.style.backdropFilter = "blur(0px)";
      blurEffect.style.webkitBackdropFilter = "blur(0px)"; // suporte para webkit
      blurEffect.style.backgroundColor = "rgba(255, 255, 255, 0)";
      setTimeout(() => {
        blurEffect.remove();
      }, 1000); // remove o elemento após a transição
    }, 100);
  }
};

// desativa o botão direito do mouse e teclas de atalho
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && ["u", "s", "c"].includes(event.key.toLowerCase())) {
    event.preventDefault();
  }
});

// função para simular o efeito de digitação
const typeText = () => {
  const element = document.getElementById("typed-text");
  const text = element.textContent.trim(); // captura o texto original
  element.textContent = ""; // limpa o texto original

  let index = 0;
  const typingSpeed = 60; // velocidade de digitação em milissegundos (ajuste conforme desejado)

  const typingInterval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text.charAt(index); // adiciona um caractere por vez
      index++;
    } else {
      clearInterval(typingInterval); // para a animação quando o texto estiver completo
    }
  }, typingSpeed);
};

// inicia a animação ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  typeText();
});

// inicialização ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  playIcon.src = "https://cdn-icons-png.flaticon.com/512/0/375.png"; // ícone de play no início
  initiateMusic(); // inicia a reprodução da música
  applyBlurEffect(); // aplica o efeito de blur
});

// atualiza o ícone quando a música começa a tocar
music.addEventListener("play", () => {
  playIcon.src = "https://cdn-icons-png.flaticon.com/512/16/16427.png"; // ícone de pause
});

// atualiza o ícone quando a música é pausada
music.addEventListener("pause", () => {
  playIcon.src = "https://cdn-icons-png.flaticon.com/512/0/375.png"; // ícone de play
});

// função para tocar o som ao passar o mouse nos ícones sociais
const playHoverSound = () => {
  hoverSound.currentTime = 0;
  hoverSound.play();
};

// função para tocar o som ao clicar no switch
const playSwitchSound = () => {
  switchSound.currentTime = 0;
  switchSound.play();
};

// adiciona os eventos de "mouseover" nos ícones sociais
socialIcons.forEach((icon) => {
  icon.addEventListener("mouseover", playHoverSound);
});

// adiciona o evento de "change" no switch de tema
themeSwitch.addEventListener("change", playSwitchSound);

// função para alternar entre tema claro e escuro
themeToggleCheckbox.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme", themeToggleCheckbox.checked);
});
