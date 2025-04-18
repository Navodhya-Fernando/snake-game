const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = null;
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

// 🐍 Load snake head image (optional)
const snakeHeadImg = new Image();
snakeHeadImg.src = "snake-head.png";

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    if (i === 0 && snakeHeadImg.complete) {
      ctx.drawImage(snakeHeadImg, snake[i].x, snake[i].y, box, box);
    } else {
      ctx.fillStyle = "#008080";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
  }

  // Draw food
  ctx.fillStyle = "#ff4081";
  ctx.fillRect(food.x, food.y, box, box);

  // Move
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "LEFT") head.x -= box;
  if (direction === "UP") head.y -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "DOWN") head.y += box;

  // Game over conditions
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some((segment, index) => index !== 0 && head.x === segment.x && head.y === segment.y)
  ) {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    snake.pop();
  }

  ctx.fillStyle = "#00ffcc";
  ctx.font = "18px Courier New";
  ctx.fillText(`Score: ${score}  High Score: ${highScore}`, 10, 20);
}

let game = setInterval(draw, 100);

