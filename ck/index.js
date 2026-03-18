const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const bestScoreElement = document.getElementById("best-score");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayText = document.getElementById("overlay-text");
const statusTag = document.getElementById("status-tag");
const actionButton = document.getElementById("action-button");

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
const GROUND_HEIGHT = 92;
const PIPE_WIDTH = 74;
const PIPE_GAP = 160;
const PIPE_SPEED = 2.8;
const PIPE_SPAWN_DISTANCE = 250;
const GRAVITY = 0.42;
const FLAP_FORCE = -7.4;

const bird = {
    x: 92,
    y: 280,
    width: 38,
    height: 28,
    velocity: 0,
    rotation: 0
};

let pipes = [];
let score = 0;
let bestScore = Number(localStorage.getItem("flappy-best-score")) || 0;
let gameState = "ready";
let animationFrameId = null;

bestScoreElement.textContent = bestScore;

function updateOverlay(title, text, tag, buttonText, visible) {
    overlayTitle.textContent = title;
    overlayText.textContent = text;
    statusTag.textContent = tag;
    actionButton.textContent = buttonText;
    overlay.classList.toggle("hidden", !visible);
}

function resetGame() {
    bird.y = 280;
    bird.velocity = 0;
    bird.rotation = 0;
    pipes = [];
    score = 0;
    scoreElement.textContent = score;
    gameState = "ready";
    updateOverlay(
        "Tap to Fly",
        "Press Space, Arrow Up, or click the canvas to start and keep the bird in the air.",
        "Ready",
        "Start Game",
        true
    );
    draw();
}

function startGame() {
    if (gameState === "running") {
        return;
    }

    if (gameState === "gameover") {
        resetGame();
    }

    gameState = "running";
    bird.velocity = FLAP_FORCE;
    updateOverlay("", "", "", "", false);
}

function endGame() {
    gameState = "gameover";

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("flappy-best-score", String(bestScore));
        bestScoreElement.textContent = bestScore;
    }

    updateOverlay(
        "Game Over",
        "Press the button or tap the game area to try another run.",
        "Crashed",
        "Play Again",
        true
    );
}

function flap() {
    if (gameState === "ready") {
        startGame();
        return;
    }

    if (gameState === "gameover") {
        startGame();
        return;
    }

    bird.velocity = FLAP_FORCE;
}

function spawnPipe() {
    const minTop = 80;
    const maxTop = GAME_HEIGHT - GROUND_HEIGHT - PIPE_GAP - 80;
    const topHeight = Math.random() * (maxTop - minTop) + minTop;

    pipes.push({
        x: GAME_WIDTH + 40,
        topHeight,
        passed: false
    });
}

function updateBird() {
    bird.velocity += GRAVITY;
    bird.y += bird.velocity;
    bird.rotation = Math.max(-0.45, Math.min(1.2, bird.velocity / 10));
}

function updatePipes() {
    if (pipes.length === 0 || pipes[pipes.length - 1].x < GAME_WIDTH - PIPE_SPAWN_DISTANCE) {
        spawnPipe();
    }

    pipes.forEach((pipe) => {
        pipe.x -= PIPE_SPEED;

        if (!pipe.passed && pipe.x + PIPE_WIDTH < bird.x) {
            pipe.passed = true;
            score += 1;
            scoreElement.textContent = score;
        }
    });

    pipes = pipes.filter((pipe) => pipe.x + PIPE_WIDTH > -10);
}

function collidesWithPipe(pipe) {
    const withinPipeX = bird.x + bird.width > pipe.x && bird.x < pipe.x + PIPE_WIDTH;
    const hitTopPipe = bird.y < pipe.topHeight;
    const hitBottomPipe = bird.y + bird.height > pipe.topHeight + PIPE_GAP;

    return withinPipeX && (hitTopPipe || hitBottomPipe);
}

function checkCollisions() {
    const hitCeiling = bird.y <= 0;
    const hitGround = bird.y + bird.height >= GAME_HEIGHT - GROUND_HEIGHT;
    const hitPipe = pipes.some(collidesWithPipe);

    if (hitCeiling) {
        bird.y = 0;
        bird.velocity = 0;
    }

    if (hitGround || hitPipe) {
        bird.y = Math.min(bird.y, GAME_HEIGHT - GROUND_HEIGHT - bird.height);
        endGame();
    }
}

function drawBackground() {
    const skyGradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
    skyGradient.addColorStop(0, "#6bc8ff");
    skyGradient.addColorStop(0.6, "#bcecff");
    skyGradient.addColorStop(1, "#e8fbff");
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.fillStyle = "rgba(255, 255, 255, 0.78)";
    drawCloud(70, 96, 28);
    drawCloud(255, 140, 24);
    drawCloud(340, 90, 20);

    ctx.fillStyle = "#8ed081";
    ctx.fillRect(0, GAME_HEIGHT - GROUND_HEIGHT, GAME_WIDTH, GROUND_HEIGHT);

    ctx.fillStyle = "#6cbb5b";
    ctx.fillRect(0, GAME_HEIGHT - GROUND_HEIGHT, GAME_WIDTH, 16);

    ctx.fillStyle = "#c79b58";
    ctx.fillRect(0, GAME_HEIGHT - 34, GAME_WIDTH, 34);
}

function drawCloud(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.arc(x + radius, y + 8, radius * 0.9, 0, Math.PI * 2);
    ctx.arc(x + radius * 2, y, radius * 0.8, 0, Math.PI * 2);
    ctx.fill();
}

function drawPipe(pipe) {
    const bottomY = pipe.topHeight + PIPE_GAP;

    ctx.fillStyle = "#4bb64f";
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
    ctx.fillRect(pipe.x, bottomY, PIPE_WIDTH, GAME_HEIGHT - GROUND_HEIGHT - bottomY);

    ctx.fillStyle = "#3a9841";
    ctx.fillRect(pipe.x - 4, pipe.topHeight - 18, PIPE_WIDTH + 8, 18);
    ctx.fillRect(pipe.x - 4, bottomY, PIPE_WIDTH + 8, 18);

    ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
    ctx.fillRect(pipe.x + 8, 0, 10, pipe.topHeight);
    ctx.fillRect(pipe.x + 8, bottomY, 10, GAME_HEIGHT - GROUND_HEIGHT - bottomY);
}

function drawBird() {
    ctx.save();
    ctx.translate(bird.x + bird.width / 2, bird.y + bird.height / 2);
    ctx.rotate(bird.rotation);

    ctx.fillStyle = "#ffd54a";
    ctx.beginPath();
    ctx.ellipse(0, 0, bird.width / 2, bird.height / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f5a623";
    ctx.beginPath();
    ctx.moveTo(bird.width / 2 - 4, 1);
    ctx.lineTo(bird.width / 2 + 12, -2);
    ctx.lineTo(bird.width / 2 - 4, 8);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#fff4b3";
    ctx.beginPath();
    ctx.ellipse(-4, 2, 11, 8, -0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(8, -5, 6.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#18222c";
    ctx.beginPath();
    ctx.arc(10, -5, 2.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawScoreText() {
    ctx.fillStyle = "rgba(23, 48, 66, 0.24)";
    ctx.font = '700 54px "Fredoka", sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(String(score), GAME_WIDTH / 2 + 2, 84);

    ctx.fillStyle = "white";
    ctx.fillText(String(score), GAME_WIDTH / 2, 80);
}

function drawReadyPrompt() {
    if (gameState !== "ready") {
        return;
    }

    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = '700 20px "Fredoka", sans-serif';
    ctx.textAlign = "center";
    ctx.fillText("Press Space or Click", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 88);
}

function draw() {
    drawBackground();
    pipes.forEach(drawPipe);
    drawBird();
    drawScoreText();
    drawReadyPrompt();
}

function gameLoop() {
    if (gameState === "running") {
        updateBird();
        updatePipes();
        checkCollisions();
    }

    draw();
    animationFrameId = window.requestAnimationFrame(gameLoop);
}

function handleInput(event) {
    if (event.type === "keydown") {
        const allowedKeys = ["Space", "ArrowUp"];
        if (!allowedKeys.includes(event.code)) {
            return;
        }
        event.preventDefault();
    }

    flap();
}

document.addEventListener("keydown", handleInput);
canvas.addEventListener("pointerdown", flap);
actionButton.addEventListener("click", startGame);

resetGame();

if (animationFrameId !== null) {
    window.cancelAnimationFrame(animationFrameId);
}

gameLoop();