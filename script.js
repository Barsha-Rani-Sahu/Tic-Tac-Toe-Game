document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const restartButton = document.querySelector('.btn');
    const gameStatus = document.getElementById('gameStatus');
    let currentPlayer = 'X';
    let gameActive = true;

    function resetGame() {
        boxes.forEach(box => {
            box.textContent = '';
            box.classList.remove('winner');
        });

        currentPlayer = 'X';
        gameActive = true;
        gameStatus.textContent = ''; // Clear the winner status
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[a].textContent === boxes[c].textContent) {
                boxes[a].classList.add('winner');
                boxes[b].classList.add('winner');
                boxes[c].classList.add('winner');

                gameActive = false;
                gameStatus.textContent = `${currentPlayer} is the winner!🎉`;
                return;
            }
        }

        // Check for a draw
        if (Array.from(boxes).every(box => box.textContent)) {
            gameStatus.textContent = 'It\'s a draw!🤝';
            gameActive = false;
        }
    }

    function handleBoxClick(event) {
        const box = event.target;

        if (box.textContent || !gameActive) return;

        box.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Event listeners
    boxes.forEach(box => {
        box.addEventListener('click', handleBoxClick);
    });

    restartButton.addEventListener('click', resetGame);
});
