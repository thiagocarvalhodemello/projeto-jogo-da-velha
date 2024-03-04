# projeto-jogo-da-velha
Projeto Senac para treinar a lógica de programação utilizando JavaScript


## Como Jogar

1. Abra o arquivo `index.html` em um navegador da web.
2. Escolha o modo de jogo clicando nos botões "Jogador vs Jogador" ou "Jogador vs CPU".
3. Clique nas células do tabuleiro para fazer sua jogada.
4. O objetivo é conseguir três símbolos iguais em linha (horizontal, vertical ou diagonal).

## Variáveis e Funções

- `quadro`: Um objeto que representa o tabuleiro do jogo. Cada célula é representada por uma chave (por exemplo, `a1`, `b2`, etc.) e inicialmente está vazia (`''`).
- `playing`: Uma variável booleana que controla se o jogo está em andamento.
- `vez`: Uma variável que controla qual jogador deve jogar ('x' ou 'o').
- `modoJogo`: Uma variável que armazena o modo de jogo escolhido ('jogadorVsJogador' ou 'jogadorVsCPU').
- `turnoCPU()`: Função que implementa a lógica para a CPU escolher uma posição vazia aleatoriamente.
- `reset()`: Função que reseta o jogo para o estado inicial.
- `renderQuadro()`: Função que renderiza o tabuleiro na tela.


## Fluxograma
https://whimsical.com/W7i1sqUPyDQgrzBPEgFiC1
