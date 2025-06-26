<<<<<<< HEAD
const npcImages = [
    '/images/npc1.jpg',
    '/images/npc2.jpg',
    '/images/npc3.jpg',
    '/images/npc4.jpg',
    '/images/npc5.jpg',
]

let secret, hearts, npcStage;
const npc = document.getElementById("npc");
const dialogue = document.getElementById("dialogue");
const input = document.getElementById("guess");
const heartsDiv = document.getElementById("hearts");
const guessButton = document.getElementById("guessButton");

function updateNPC() {
    npc.style.backgroundImage = `url('${npcImages[npcStage]}')`;
}

function updateHearts() {
    heartsDiv.innerHTML = '❤️'.repeat(hearts);
}

function resetGame() {
    secret = Math.floor(Math.random() * 20) + 1;
    hearts = 5;
    npcStage = 0;
    input.disabled = false;
    input.value = '';
    guessButton.disabled = false;
    updateNPC();
    updateHearts();
    dialogue.innerText = '歡迎來到猜數字遊戲，只要你在有限的❤️內猜到正確的數字，我就會脫一件，1~20的數字，猜猜看吧';
}

function endGame(message) {
    dialogue.innerText = message + "\n真可惜，要再玩一次嗎？(Y/N)";
    input.disabled = true;
    guessButton.disabled = true;
    document.addEventListener("keydown", handleRestart);
}

function handleRestart(e) {
    if (e.key.toLowerCase() === 'y') {
        document.removeEventListener("keydown", handleRestart);
        resetGame();
    } else if (e.key.toLowerCase() === 'n') {
        document.removeEventListener("keydown", handleRestart);
        dialogue.innerText = "👋 So sad, 下次見囉^^"
    }
}

function makeGuess() {
    if (input.disabled) return;
    const guess = Number(input.value);
    if (!guess || guess < 1 || guess > 20) {
        dialogue.innerText = "請輸入 1~20 之間的數字";
        return;
    }

    if (guess === secret) {
        npcStage++;
        if (npcStage === npcImages.length) {
            endGame("沒想到你可以脫光我的衣服...你破關了")
        } else {
            hearts++;
            updateHearts();
            updateNPC();
            dialogue.innerText = `你猜對了！（${npcStage}/5），繼續試著脫光我吧`;
            secret = Math.floor(Math.random() * 20) + 1;
            input.value = '';
        }
    } else {
        hearts--;
        updateHearts();
        if (hearts <= 0) {
            endGame(`遊戲結束囉，正確答案是 ${secret}`)
        } else {
            dialogue.innerText = guess < secret ? "太小了..比我還小，我說我的二頭肌" : "太大了...雖然沒有我大，我說我的胸肌";
        }
    }
}

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        makeGuess();
    }
});

guessButton.addEventListener("click", makeGuess);

resetGame();
=======

>>>>>>> a122660528e303dc459b3e24d071a04925db18cd
