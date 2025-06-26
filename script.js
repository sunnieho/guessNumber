const npcImages = [
    '/images/npc1.jpg',
    '/images/npc2.jpg',
    '/images/npc3.jpg',
    '/images/npc4.jpg',
    '/images/npc5.jpg',
]

const bgMusic = document.getElementById("bgMusic");
const muteIcon = document.getElementById("muteIcon");

function toggleMute() {
    bgMusic.muted = !bgMusic.muted;
    muteIcon.textContent = bgMusic.muted ? "🔇" : "🔊";
}

let currentLanguage = "zh-TW";
const i18n = {
    "zh-TW": {
        welcome: "歡迎來到猜數字遊戲，只要你在有限的❤️內猜到正確的數字，我就會脫一件，1~20的數字，猜猜看吧",
        endGame: "沒想到你可以脫光我的衣服...你破關了",
        tooSmall: "太小了..比我還小，我說我的二頭肌",
        tooBig: "太大了...雖然沒有我大，我說我的胸肌",
        correct: "你猜對了！繼續試著脫光我吧",
        gameOver: "遊戲結束囉，正確答案是 ",
        inputError: "請輸入 1~20 之間的數字",
        restart: "真可惜，要再玩一次嗎？(Y/N)",
        goodbye: "👋 So sad, 下次見囉^^",
        guessButton: "猜猜"
    },
    "en-US": {
        welcome: "Welcome to the guess number game, as long as you guess the correct number within the limited❤️, I will take off one piece, 1~20, guess it",
        endGame: "I didn't expect you to take off all my clothes...you broke through",
        tooSmall: "Too small...smaller than me, I said my biceps",
        tooBig: "Too big...although not as big as me, I said my chest",
        correct: "You guessed it! Continue to try to take off my clothes",
        gameOver: "Game over, the correct answer is",
        inputError: "Please enter a number between 1~20",
        restart: "Too bad, want to play again? (Y/N)",
        goodbye: "👋 So sad, see you next time^^",
        guessButton: "Guess"
    }
}

function toggleLanguage() {
    currentLanguage = currentLanguage === "zh-TW" ? "en-US": "zh-TW";
    updateLanguage();
}

function updateLanguage() {
    dialogue.innerText = i18n[currentLanguage].welcome;
    guessButton.textContent = i18n[currentLanguage].guessButton;
}

let secret, hearts, npcStage;
const npc = document.getElementById("npc");
const dialogue = document.getElementById("dialogue");
const input = document.getElementById("guess");
const heartsDiv = document.getElementById("hearts");
const music = document.getElementById("music");
const guessButton = document.getElementById("guessButton");

function updateNPC() {
    npc.style.backgroundImage = `url('${npcImages[npcStage]}')`;
}

function updateHearts() {
    heartsDiv.innerHTML = '❤️'.repeat(hearts);
}

function resetGame() {
    secret = Math.floor(Math.random() * 20) + 1;
    hearts = 20;
    npcStage = 0;
    input.disabled = false;
    input.value = '';
    guessButton.disabled = false;
    updateNPC();
    updateHearts();
    updateLanguage();
    bgMusic.play().catch(e => console.log("無法自動播放音樂"));
}

function endGame(message) {
    dialogue.innerText = message + "\n" + i18n[currentLanguage].restart;
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
        dialogue.innerText = i18n[currentLanguage].goodbye;
    }
}

function makeGuess() {
    if (input.disabled) return;
    const guess = Number(input.value);
    if (!guess || guess < 1 || guess > 20) {
        dialogue.innerText = i18n[currentLanguage].inputError;
        return;
    }

    if (guess === secret) {
        npcStage++;
        if (npcStage === npcImages.length) {
            endGame(i18n[currentLanguage].endGame);
        } else {
            hearts++;
            updateHearts();
            updateNPC();
            dialogue.innerText = i18n[currentLanguage].correct + `（${npcStage}/5）`;
            secret = Math.floor(Math.random() * 20) + 1;
            input.value = '';
        }
    } else {
        hearts--;
        updateHearts();
        if (hearts <= 0) {
            endGame(i18n[currentLanguage].gameOver + secret);
        } else {
            dialogue.innerText = guess < secret ? i18n[currentLanguage].tooSmall : i18n[currentLanguage].tooBig;
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
