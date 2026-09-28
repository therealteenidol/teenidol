class Dog {
    constructor(game) {
        this.game = game;
        this.width = 64; // Doubled
        this.height = 64; // Doubled
        this.x = 0;
        this.y = 0;

        this.state = 'HELD'; // HELD, AIR, GROUND
        this.vy = 0;
        this.gravity = 0.4;
        this.throwForce = -12;
    }

    update(deltaTime) {
        if (this.state === 'HELD') {
            // Follow player
            this.x = this.game.player.x + 10; // Offset
            this.y = this.game.player.y - 10;
            this.vy = 0;
        } else if (this.state === 'AIR') {
            this.y += this.vy;
            this.vy += this.gravity;

            // Check floor collision
            if (this.y + this.height >= this.game.height - 40) {
                this.y = this.game.height - 40 - this.height;
                this.state = 'GROUND';
                this.game.gameOver = true;
            }

            // Check catch collision
            if (this.vy > 0) { // Only catch if falling
                const p = this.game.player;
                if (
                    this.x < p.x + p.width &&
                    this.x + this.width > p.x &&
                    this.y + this.height > p.y &&
                    this.y < p.y + p.height
                ) {
                    this.state = 'HELD';
                    this.game.player.hasDog = true;
                }
            }
        }
    }

    throw() {
        if (this.state === 'HELD') {
            this.state = 'AIR';
            this.vy = this.throwForce;
            // Add some horizontal momentum based on player movement?
            // For now, straight up is safer for the mechanic.
        }
    }

    draw(renderer) {
        renderer.drawSprite('dog', this.x, this.y, this.width, this.height);
    }
}
