// Dados iniciais
let quadro = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let playing = false;
let vez = 'x';
let warning = '';

reset();

// controlar o modo de jogo
let modoJogo = '';

// Eventos
document.querySelector('.modo-jogo').addEventListener('click', function(e) {
    modoJogo = e.target.getAttribute('data-mode');
    reset();
});

document.querySelector('.reset').addEventListener('click', function() {
    reset();
});

document.querySelectorAll('.item').forEach((item)=>{
    item.addEventListener('click', (e) => {
        let loc = e.target.getAttribute('data-item');
        
        if(playing && quadro[loc] === '' && (modoJogo === 'jogadorVsJogador' || (modoJogo === 'jogadorVsCPU' && vez === 'x'))) {
            quadro[loc] = vez;
            renderQuadro(); 
            togglePlayer();
            if (modoJogo === 'jogadorVsCPU' && playing) {
                turnoCPU(); 
            }
        }
    });
});

// Funções

function turnoCPU() {
    // Lógica para a CPU escolher uma posição vazia randomicamente
    let posicoesVazias = [];
    for (let i in quadro) {
        if (quadro[i] === '') {
            posicoesVazias.push(i);
        }
    }

    // Escolha uma posição aleatória entre as posições vazias
    let posicaoCPU = posicoesVazias[Math.floor(Math.random() * posicoesVazias.length)];
    quadro[posicaoCPU] = vez;
    renderQuadro();
    togglePlayer();
}
 // Reseta o modo de jogo
function reset() {
    modoJogo = ''; 
    warning = ''; 
    vez = 'x'; 
    playing = true;

    // Resetar os quadros
    for(let i in quadro) {
        quadro[i] = '';
    }

    // Renderizar tudo
    renderQuadro();
    renderInfo();
}

function renderQuadro() {
    for(let i in quadro) {
        let item = document.querySelector(`div[data-item=${i}]`);
        if(quadro[i] !== '') {
            item.innerText = quadro[i];
        } else {
            item.innerText = '';
        }
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = vez;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    if (modoJogo === 'jogadorVsJogador') {
        vez = vez === 'x' ? 'o' : 'x';
    }
    renderInfo();
}

function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;
    } else if(checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    } else if(isFull()) {
        warning = 'Deu empate';
        playing = false;
    }
}

function checkWinnerFor(i) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option=>quadro[option] === i);
        if(hasWon) return true;
    }

    return false;
}

function isFull() {
    for(let i in quadro) {
        if(quadro[i] === '') {
            return false;
        }
    }
    return true;
}