// TIC TAC TOE
const tic_tac_toe = {

    // ATTRIBUTES
    board: [
        '', '', '',
        '', '', '',
        '', '', ''
    ],
    symbols: {
        options: ['O', 'X'],
        turn_index: 0,
        change() {
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        }
    },
    container_element: null,
    gameover: false,
    winning_sequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    bot: {
        playing: true,
        play(_self) {
            _self.bot.steps.two_houses_in_a_row(_self);
        },
        steps: {
            two_houses_in_a_row(_self) {
                const index = _self.symbols.turn_index;
                const enemy_index = index === 1 ? 0 : 1;
                const enemy_symbol = _self.symbols.options[enemy_index];
                const board = _self.board;
                const sequences = _self.winning_sequences;
                let played = false;
                //
                for (i in sequences) {
                    const sequence = sequences[i];
                    let count = 0;
                    let empty_card = null;
                    for (x in sequence) {
                        switch (board[sequence[x]]) {
                            case (enemy_symbol):
                                count++;
                                break;
                            case (''):
                                empty_card = sequence[x];
                                break;
                        }
                    }
                    if (count === 2) {
                        setInterval(() => {
                            _self.make_play(empty_card);
                            played = true;
                        }, 1000);
                        break;
                    }
                };
                if (played === false) {
                    //
                }
            }
        }
    },

    // FUNCTIONS
    init(container) {
        this.container_element = container;
    },

    make_play(position) {
        if (this.gameover || this.board[position] !== '') return false;

        const currentSymbol = this.symbols.options[this.symbols.turn_index];
        this.board[position] = currentSymbol;
        this.draw();

        const winning_sequences_index = this.check_winning_sequences(currentSymbol);
        if (this.is_game_over()) {
            this.game_is_over();
        }
        if (winning_sequences_index >= 0) {
            this.game_is_over();
            this.stylize_winner_sequence(this.winning_sequences[winning_sequences_index]);
        } else {
            this.symbols.change();
        }

        if (this.bot.playing && this.symbols.turn_index === 1) this.bot.play(this);

        return true;
    },

    stylize_winner_sequence(winner_sequence) {
        winner_sequence.forEach((position) => {
            this
                .container_element
                .querySelector(`div:nth-child(${position + 1})`)
                .classList.add('winner');
        });
    },

    check_winning_sequences(symbol) {

        for (i in this.winning_sequences) {
            if (this.board[this.winning_sequences[i][0]] == symbol &&
                this.board[this.winning_sequences[i][1]] == symbol &&
                this.board[this.winning_sequences[i][2]] == symbol) {
                console.log('winning sequences INDEX:' + i);
                return i;
            }
        };

        return -1;
    },

    game_is_over() {
        this.gameover = true;
        console.log('GAME OVER');
    },

    is_game_over() {
        return !this.board.includes('');
    },

    start() {
        this.board.fill('');
        this.draw();
        this.gameover = false;
    },

    restart() {
        if (this.is_game_over() || this.gameover) {
            this.start();
            console.log('this game has been restarted!')
        } else if (confirm('Are you sure you want to restart this game?')) {
            this.start();
            console.log('this game has been restarted!')
        }
    },

    draw() {
        this.container_element.innerHTML = this.board.map((element, index) => `<div onclick="tic_tac_toe.make_play('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    },
};
