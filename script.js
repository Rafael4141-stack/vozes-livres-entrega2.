/* Interacoes acessiveis: menu, dropdown, toast, modal e formulario */
document.addEventListener('DOMContentLoaded', function () {
  const botaoMenu = document.querySelector('.menu-mobile');
  const navegacao = document.querySelector('.navegacao');
  if (botaoMenu && navegacao) {
    botaoMenu.addEventListener('click', function () {
      const aberto = navegacao.classList.toggle('aberta');
      botaoMenu.setAttribute('aria-expanded', String(aberto));
      botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
    navegacao.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          navegacao.classList.remove('aberta');
          botaoMenu.setAttribute('aria-expanded', 'false');
          botaoMenu.setAttribute('aria-label', 'Abrir menu');
        }
      });
    });
  }

  const dropdownBotao = document.querySelector('.dropdown-botao');
  const dropdown = document.querySelector('.dropdown');
  if (dropdownBotao && dropdown) {
    dropdownBotao.addEventListener('click', function () {
      const aberto = dropdown.classList.toggle('aberto');
      dropdownBotao.setAttribute('aria-expanded', String(aberto));
    });
    document.addEventListener('click', function (evento) {
      if (!dropdown.contains(evento.target)) {
        dropdown.classList.remove('aberto');
        dropdownBotao.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const toast = document.getElementById('toast');
  document.querySelectorAll('[data-toast]').forEach(function (botao) {
    botao.addEventListener('click', function () {
      if (toast) {
        toast.textContent = botao.dataset.toast || 'Obrigado por apoiar a Vozes Livres!';
        toast.hidden = false;
        window.setTimeout(function () { toast.hidden = true; }, 4000);
      }
    });
  });

  const modal = document.getElementById('modal-ajuda');
  document.querySelectorAll('[data-modal-abrir]').forEach(function (botao) {
    botao.addEventListener('click', function () {
      if (modal) {
        modal.hidden = false;
        const fechar = modal.querySelector('[data-modal-fechar]');
        if (fechar) fechar.focus();
      }
    });
  });
  if (modal) {
    modal.querySelectorAll('[data-modal-fechar]').forEach(function (botao) {
      botao.addEventListener('click', function () { modal.hidden = true; });
    });
    modal.addEventListener('click', function (evento) {
      if (evento.target === modal) modal.hidden = true;
    });
    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape') modal.hidden = true;
    });
  }

  const formulario = document.querySelector('[data-form-cadastro]');
  if (formulario) {
    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();
      if (!formulario.checkValidity()) {
        formulario.reportValidity();
        const primeiroInvalido = formulario.querySelector(':invalid');
        if (primeiroInvalido) primeiroInvalido.focus();
        return;
      }
      const aviso = document.getElementById('mensagem-formulario');
      if (aviso) {
        aviso.hidden = false;
        aviso.textContent = 'Cadastro demonstrativo validado! Nesta versão acadêmica, os dados não são enviados a um servidor.';
      }
      formulario.reset();
    });
  }
});
