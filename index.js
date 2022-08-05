const game = {
    players: [{ id: 1, icon: 'x' }, { id: 2, icon: 'circle' }],
    fields: [],
    winningSequences: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
    playerTurn: 1,
    addPlayerInField(positionField) {
        if (this.verifyFieldIsEmpty(positionField)) {
            const currentPlayer = this.getCurrentPlayer();
            this.fields[positionField] = currentPlayer.id;
            return true;
        }
        return false;
    },
    getCurrentPlayer() {
        return this.players.find(p => p.id == this.playerTurn);
    },
    verifyFieldIsEmpty(positionField) {
        return this.fields[positionField] == null;
    },
    verifyWin(lastField) {
        let winning = false;
        const currentPlayer = this.getCurrentPlayer();
        const possibleWinningSequences = this.winningSequences.filter(x => x.includes(lastField));
        possibleWinningSequences.forEach(el => {
            if (this.fields[el[0]] == currentPlayer.id
                && this.fields[el[1]] == currentPlayer.id
                && this.fields[el[2]] == currentPlayer.id) {
                winning = true;
            }
        });
        return winning;
    },
    changePlayerTurn() {
        if (this.playerTurn == 1) this.playerTurn = 2;
        else this.playerTurn = 1;
    }
};

function addIconInField(icon, el) {
    const i = document.createElement('i');
    i.classList.add(icon);
    el.appendChild(i);
}

function init() {
    const elements = document.getElementsByClassName("grid-item");

    Array.prototype.forEach.call(elements, (el) => {
        el.addEventListener("click", (event) => {
            const field = parseInt(event.currentTarget.getAttribute('data-field'));
            if (game.addPlayerInField(field)) {
                addIconInField(game.getCurrentPlayer().icon, el);
                if (game.verifyWin(field)) {
                    setTimeout(() => {
                        alert(game.getCurrentPlayer().icon + ' ganhou');
                    }, 100);
                    return;
                }
                game.changePlayerTurn();
            }
        });
    });
}

init();

