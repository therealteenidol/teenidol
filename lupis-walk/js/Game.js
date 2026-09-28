class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;

        this.input = new InputHandler();
        this.renderer = new Renderer(this.ctx, this.width, this.height);

        this.dog = new Dog(this);
        this.player = new Player(this);
        this.enemyManager = new EnemyManager(this);

        this.lastTime = 0;
        this.gameOver = false;
        this.score = 0;
    }

    async start() {
        // Load assets
        await this.renderer.loadImage('bg', 'assets/fondo.png');
        await this.renderer.loadImage('player_idle', 'assets/player_idle.png');
        await this.renderer.loadImage('player_move', 'assets/player_move.png');
        await this.renderer.loadImage('dog', 'assets/dog_new.png');
        await this.renderer.loadImage('enemy', 'assets/enemy.png');
        await this.renderer.loadImage('bird', 'assets/bird.png');
		await this.renderer.loadImage('squirrel', 'assets/squirrel.png');

        // FIXED RESOLUTION STRATEGY
        this.width = 1280;
        this.height = 720;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.renderer.width = this.width;
        this.renderer.height = this.height;

        // Re-center player
        this.player.x = this.width / 2 - this.player.width / 2;
        this.player.y = this.height - 100 - this.player.height;

        this.dog.x = this.player.x + 10;
        this.dog.y = this.player.y - 10;
        this.dog.state = 'HELD';

        this.showStartScreen();
    }

    showStartScreen() {
        const startScreen = document.getElementById('start-screen');
        startScreen.style.display = 'flex';

        const handler = (e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();
                startScreen.style.display = 'none';
                window.removeEventListener('keydown', handler);

                // Reset input state to prevent immediate throw
                this.input.keys.throw = false;

                requestAnimationFrame(this.gameLoop.bind(this));
            }
        };
        window.addEventListener('keydown', handler);
    }

    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        if (!this.gameOver) {
            this.update(deltaTime);
            this.draw();
            requestAnimationFrame(this.gameLoop.bind(this));
        } else {
            this.drawGameOver();
        }
    }

    update(deltaTime) {
        this.player.update(deltaTime);
        this.dog.update(deltaTime);
        this.enemyManager.update(deltaTime);

        // Update UI
        document.getElementById('score-value').innerText = this.score;
    }

    draw() {
        this.renderer.clear();

        this.enemyManager.draw(this.renderer);
        this.player.draw(this.renderer);
        this.dog.draw(this.renderer);

        // Draw crosshair
        this.renderer.drawCrosshair(this.input.mouse.x, this.input.mouse.y);
    }

    drawGameOver() {
        const gameOverScreen = document.getElementById('game-over-screen');
        if (gameOverScreen.style.display !== 'flex') {
            gameOverScreen.style.display = 'flex';
            document.getElementById('final-score').innerText = this.score;
        }
    }
}
