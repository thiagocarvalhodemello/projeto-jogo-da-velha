document.addEventListener('DOMContentLoaded', function () {
    const modoJogoButtons = document.querySelectorAll('.modo-jogo button');
    const resetButton = document.querySelector('.reset');
    const infoVez = document.querySelector('.info .vez');
    const infoResultado = document.querySelector('.info .resultado');
    const area = document.querySelector('.area');
    let jogadorAtual = 'X';
    let jogoAtivo = false;
    let placarX = 0;
    let placarO = 0;

    // Função para iniciar um novo jogo
    function iniciarJogo() {
        jogoAtivo = true;
        infoVez.textContent = jogadorAtual;
        infoResultado.textContent = '--';
        area.querySelectorAll('.item').forEach(cell => {
            cell.textContent = '';
        });
    
        if (modoJogoButtons[1].classList.contains('active')) {
            // Se o modo jogador vs CPU estiver ativo, define o jogador inicial como 'X'
            jogadorAtual = 'X';
            if (jogadorAtual === 'X') {
                // Se for a vez do jogador, espere pela sua jogada
                return;
            } else {
                // Se for a vez da CPU, executa um movimento aleatório
                jogadaCPU();
            }
        } else {
            // Se for o modo "Jogador vs Jogador", coloque o jogador inicial em 'X'
            jogadorAtual = 'X';
        }
    }

    // Função Jogador CPU
    function jogadaCPU() {
        const cells = area.querySelectorAll('.item');
        const emptyCells = [...cells].filter(cell => cell.textContent === '');
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].textContent = 'O';
        if (verificarVitoria()) {
            infoResultado.textContent = `O jogador O venceu!`;
            atualizarPlacar();
            jogoAtivo = false;
        } else if (verificarEmpate()) {
            infoResultado.textContent = 'Empate!';
            jogoAtivo = false;
        } else {
            alternarJogador();
        }
    }

    // Função alternar modos de jogo
    function selecionarModoJogo() {
        modoJogoButtons.forEach(button => {
            button.addEventListener('click', function () {
                modoJogoButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                // Redefinir o estado do jogo ao mudar de modo
                jogadorAtual = 'X';
                placarX = 0;
                placarO = 0;
                infoResultado.textContent = `Placar: X - ${placarX} | O - ${placarO}`;
                iniciarJogo();
            });
        });
        iniciarJogo();
    };

    // Função verificar vitória
    function verificarVitoria() {
        const linhas = [
            ['a1', 'a2', 'a3'],
            ['b1', 'b2', 'b3'],
            ['c1', 'c2', 'c3'],
            ['a1', 'b1', 'c1'],
            ['a2', 'b2', 'c2'],
            ['a3', 'b3', 'c3'],
            ['a1', 'b2', 'c3'],
            ['a3', 'b2', 'c1']
        ];

        for (let linha of linhas) {
            const [a, b, c] = linha;
            if (area.querySelector(`[data-item="${a}"]`).textContent === jogadorAtual &&
                area.querySelector(`[data-item="${b}"]`).textContent === jogadorAtual &&
                area.querySelector(`[data-item="${c}"]`).textContent === jogadorAtual) {
                return true;
            }
        }
        return false;
    }

    // Função verificar empate
    function verificarEmpate() {
        return [...area.querySelectorAll('.item')].every(cell => cell.textContent !== '');
    }

    // Função atualizar placar
    function atualizarPlacar() {
        if (jogadorAtual === 'X') {
            placarX++;
        } else {
            placarO++;
        }
        infoResultado.textContent = `Placar: X - ${placarX} | O - ${placarO}`;
    }

    // Função alternar jogadores
    function alternarJogador() {
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
        infoVez.textContent = jogadorAtual;
    }

    // Função clique nos blocos
    function handleCellClick(event) {
        const cell = event.target;
        if (jogoAtivo && cell.textContent === '') {
            cell.textContent = jogadorAtual;
            if (verificarVitoria()) {
                infoResultado.textContent = `O jogador ${jogadorAtual} venceu!`;
                atualizarPlacar();
                jogoAtivo = false;
            } else if (verificarEmpate()) {
                infoResultado.textContent = 'Empate!';
                jogoAtivo = false;
            } else {
                alternarJogador();
                // Verifique se o próximo jogador é CPU
                if (modoJogoButtons[1].classList.contains('active') && jogadorAtual === 'O') {
                    jogadaCPU();
                }
            }
        }
    }

    // Função clique no reset
    function handleResetClick() {
        iniciarJogo();
        placarX = 0;
        placarO = 0;
        infoResultado.textContent = `Placar: X - ${placarX} | O - ${placarO}`;
    }

    // Adicionar eventos aos botões e células
    selecionarModoJogo();
    area.addEventListener('click', handleCellClick);
    resetButton.addEventListener('click', handleResetClick);
});
