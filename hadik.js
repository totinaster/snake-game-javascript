// listeners
document.addEventListener("keydown", keyPush)




// canvas
const canvas = document.querySelector("canvas");
const title = document.querySelector("h2");
const ctx = canvas.getContext("2d");

// player
const tileSize = (canvas.height / 10);

let snakeSpeed = tileSize;

let snakePosX = 0;
let snakePosY = tileSize;

let VelocityX = 1;
let VelocityY = 0;

let tail = [];
let snakeLength = 4;
// food
let foodPosX = 400;
let foodPosY = 200;
// game
let gameIsRunning = true;

const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

var score = 0;

// loop
function gameLoop() {
    if ( gameIsRunning) {
        drawStuff()
        moveStuff()
        setTimeout(gameLoop, 1000 / 8);
    }
}
resetFood();
gameLoop();

/**
 * move everything
 */
    function moveStuff() {
        snakePosX += snakeSpeed * VelocityX;
        snakePosY += snakeSpeed * VelocityY;
//wall colision control
    if(snakePosX > canvas.width - tileSize) {
       // snakePosX = 0;
       gameOver()
    }
    if(snakePosY > canvas.height - tileSize) {
        //snakePosY = 0;
        gameOver()
    }
    if(snakePosX < 0) {
        //snakePosX = canvas.width;
        gameOver()
    }
    if(snakePosY < 0) {
        //snakePosY = canvas.height;
        gameOver()
    }
  
// game over (crash into myself)
    tail.forEach((snakePart) => {
        if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
            gameOver();
        }      
    });

// tail
tail.push({x: snakePosX, y: snakePosY});

//forget earliest parts of snake
tail = tail.slice(-1 * snakeLength);

//food colision
    if (snakePosX === foodPosX && snakePosY === foodPosY) {
        title.textContent = ++score;
        ++snakeLength;
        resetFood();
    }
}



/**
 * draw everything
 */
//background
    function drawStuff() {
        rectangle("white", 0, 0, canvas.width, canvas.height);

//grid
    drawGrid()

// food
    drawFood()
// tail
tail.forEach((snakePart) =>
    rectangle("gray", snakePart.x, snakePart.y, tileSize, tileSize)
);
//snake    
    rectangle("black", snakePosX, snakePosY, tileSize, tileSize);        
    }
// rectangle
    function rectangle(color, x, y, width, height) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
//  grid
   function drawGrid() {
    for ( let i = 0; i < tileSize; i++ ) {
        for (let j = 0; j < tileSize; j++ ) {
          rectangle("lightblue", tileSize * i, tileSize * j, tileSize-1, tileSize-1);
        }
    }
}
// food
    function drawFood() {
        rectangle("pink", foodPosX, foodPosY, tileSize - 1, tileSize - 1);        
    }
// reset food
    function resetFood() {
// game over (nowhere to go)
        if (snakeLength === tileCountX * tileCountY) {
            gameOver()
        }
       foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
       foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;
//dont spawn food on snake head
       if (foodPosX === snakePosX && foodPosY === snakePosY) {
           resetFood()
       }
// dont spawn food on any snake part
       if (tail.some(snakePart => snakePart.x === foodPosX && snakePart.y === foodPosY)) {
           resetFood()
       }
    }
// game over
    function gameOver() {
        //title.textContent = "Game Over";
        alert("game over");
        gameIsRunning = false;
    }
/**
 * keybord
 */
    function keyPush(event) {
        switch(event.key) {
            case "ArrowUp":
                if ( VelocityY !== 1) {
                VelocityX = 0;
                VelocityY = -1;
        }
                break;
            case "ArrowDown":
                if ( VelocityY !== -1) {
                VelocityX = 0;
                VelocityY = 1;
            }
                break;
            case "ArrowLeft":
                if ( VelocityX !== 1) {
                VelocityX = -1;
                VelocityY = 0;
                }
                break;
            case "ArrowRight":
                if ( VelocityX !== -1) {
                VelocityX = 1;
                VelocityY = 0;
                }
                break;
                default:
                    // restart game
                    if (!gameIsRunning) location.reload();
                        break;
                    
        }
    }






    