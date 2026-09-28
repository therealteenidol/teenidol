class Player {
    constructor(game) {
        this.game = game;
        this.width = 96; // Doubled
        this.height = 128; // Doubled
        this.x = game.width / 2 - this.width / 2;
        this.y = game.height - 100 - this.height; // Adjusted for new height
        this.speed = 6; // Increased speed slightly for bigger map

        this.hasDog = true;
        this.cooldown = 0;
    }

    update(deltaTime) {
        // Movement
        if (this.game.input.keys.left) {
            this.x -= this.speed;
        }
        if (this.game.input.keys.right) {
            this.x += this.speed;
        }

        // Clamp to screen
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > this.game.width) this.x = this.game.width - this.width;

        // Throw Dog
        if (this.game.input.keys.throw && this.hasDog) {
            this.game.dog.throw();
            this.hasDog = false;
        }

        // Shoot
        if (this.game.input.keys.shoot || this.game.input.mouse.down) {
            if (!this.hasDog && this.cooldown <= 0) {
                this.shoot();
                this.cooldown = 200; // ms
            }
        }

        if (this.cooldown > 0) this.cooldown -= deltaTime;
    }

    shoot() {
        // Logic to shoot at mouse position or straight ahead
        // Cabal style: Crosshair is controlled by mouse or keys. 
        // Here we use mouse for crosshair.
        const targetX = this.game.input.mouse.x;
        const targetY = this.game.input.mouse.y;

        this.game.enemyManager.checkHit(targetX, targetY);

        // Visual effect for shooting
        // We can add a projectile or muzzle flash later
    }

    draw(renderer) {
        // Determine sprite based on state
        const isMoving = this.game.input.keys.left || this.game.input.keys.right;
        const spriteKey = isMoving ? 'player_move' : 'player_idle';

        // Flip if moving left
        const flip = this.game.input.keys.left;

        renderer.drawSprite(spriteKey, this.x, this.y, this.width, this.height, flip);
    }
}
