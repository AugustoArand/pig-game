'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // Usamos # por que se trata de um ID, e não de uma classe
const score1El = document.getElementById('score--1'); // GetElementById é somente mais um jeito de chamar o ID
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;


// Função que inicia o game
const init = function () {
    // Primeiro passo nós zeramos os valores dos dados que iniciaram o programa, e ocultamos o dado
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

};

init();


// Função de trocar o jogador, que foi transformado em função.
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};


// Rodando os dados - Funcionalidade
btnRoll.addEventListener('click', function () {


    if (playing) {

        // #1 Gerando um numero aleatorio para o dado
        const dice = Math.trunc(Math.random() * 6) + 1;

        // #2 Mostrar o dado
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`; // Puxa dinamicamente a imagem do dado baseado no numero sorteado na constante "dice"

        // #3 Checando a condição se for o numero 1 ou não (caso seja 1, muda o jogador)
        if (dice !== 1) {
            currentScore += dice; // Necessário criar a função currentScore como global, pois sendo local sempre que clicar no botão ela voltaria a 0
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else { // Nesse ELSE, quando o numero for 1, ele alternará entre players e zerará o score do player atual
            // Alternando para o próximo jogador
            switchPlayer();
        }

    }

});

btnHold.addEventListener('click', function () {
    if (playing) {
        // Adicionar os pontos do player ativo
        scores[activePlayer] += currentScore;
        console.log(scores[activePlayer]);
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Checar se os pontos são >= 100
        if (scores[activePlayer] >= 20) {
            // Encerra o jogo
            playing = false;
            diceEl.classList.add('hidden'); // Oculta a imagem dos dados, indicando o fim do game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            //Mudar para o proximo jogador
            switchPlayer();

        }

    }

});

btnNew.addEventListener('click', init);


// ################ Botão de instrução ###########################

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

// Função para enxugar o código no evento de abrir as mensagens ao clicar no botão
const openModal = function () {
    console.log('Button clicked');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

// Iteração com o "for" para que todos os botões sejam percorridos
for (let i = 0; i < btnOpenModal.length; i++)
    btnOpenModal[i].addEventListener('click', openModal);


// Função criada para enxugar o código, pois desejamos fechar a janela clicando fora do campo de texto ou no "x"
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    console.log(e.key); // Key é o parametro que diz qual tecla foi digitada

    if (e.key === 'Escape' && !modal.classList.contains('hidden')) { //Se o modal não contem Hidden, então feche-o.
        closeModal();

    }

});