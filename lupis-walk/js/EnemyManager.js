class EnemyManager {
    constructor(game) {
        this.game = game;
        this.enemies = [];
        this.projectiles = [];
        this.spawnTimer = 0;
        this.spawnInterval = 1500; // Faster spawn interval (ms)
    }

    update(deltaTime) {
        this.spawnTimer += deltaTime;
        if (this.spawnTimer > this.spawnInterval) {
            this.spawnEnemy();
            this.spawnTimer = 0;
            // Gradually increase difficulty by decreasing interval down to 800ms
            if (this.spawnInterval > 800) this.spawnInterval -= 20;
        }
        // Update enemies
        this.enemies.forEach(e => e.update(deltaTime));
        // Remove dead enemies
        this.enemies = this.enemies.filter(e => !e.markedForDeletion);
        // Update projectiles
        this.projectiles.forEach(p => p.update(deltaTime));
        this.projectiles = this.projectiles.filter(p => !p.markedForDeletion);
        // Check projectile collisions with player and dog
        this.projectiles.forEach(p => {
            if (this.checkCollision(p, this.game.player) || this.checkCollision(p, this.game.dog)) {
                this.game.gameOver = true;
            }
        });
    }

    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    spawnEnemy() {
        const rand = Math.random();
        if (rand < 0.4) {
            // Human (Middle)
            const x = Math.random() > 0.5 ? 0 : this.game.width - 40;
            const y = this.game.height / 2 + Math.random() * 50;
            this.enemies.push(new HumanEnemy(this.game, x, y));
        } else if (rand < 0.7) {
            // Bird (Top)
            const spawnLeft = Math.random() > 0.5;
            const x = spawnLeft ? 0 : this.game.width - 80; // bird width = 80
            const y = Math.random() * 100;
            const bird = new BirdEnemy(this.game, x, y);
            bird.vx = spawnLeft ? 2 : -2; // Ensure correct direction
            this.enemies.push(bird);
        } else {
            // Squirrel (Background/Trees)
            const x = Math.random() * (this.game.width - 40);
            const y = this.game.height / 2 - 50;
            this.enemies.push(new SquirrelEnemy(this.game, x, y));
        }
    }

    // Simple point collision for crosshair shots
    checkHit(x, y) {
        this.enemies.forEach(enemy => {
            if (
                x >= enemy.x &&
                x <= enemy.x + enemy.width &&
                y >= enemy.y &&
                y <= enemy.y + enemy.height
            ) {
                enemy.takeDamage();
            }
        });
    }

    draw(renderer) {
        this.enemies.forEach(e => e.draw(renderer));
        this.projectiles.forEach(p => p.draw(renderer));
    }
}

// Projectile class
class Projectile {
    constructor(x, y, targetX, targetY, type) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.speed = 0.2;
        this.markedForDeletion = false;
        this.type = type; // 'stone', 'poop', 'acorn'
        const angle = Math.atan2(targetY - y, targetX - x);
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
    }
    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        if (this.y > 800) this.markedForDeletion = true;
    }
    draw(renderer) {
        let color = 'yellow';
        if (this.type === 'poop') color = 'white';
        if (this.type === 'acorn') color = 'brown';
        renderer.drawRect(color, this.x, this.y, this.width, this.height);
    }
}

// Base enemy class
class BaseEnemy {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 80; // doubled size
        this.height = 80;
        this.hp = 1;
        this.markedForDeletion = false;
        this.vx = 0;
        this.shootTimer = 0;
        this.shootInterval = 2000;
    }
    update(deltaTime) {
        this.x += this.vx;
        // Bounce off walls
        if (this.x < 0 || this.x + this.width > this.game.width) {
            this.vx *= -1;
        }
        this.shootTimer += deltaTime;
        if (this.shootTimer > this.shootInterval) {
            this.shoot();
            this.shootTimer = 0;
        }
    }
    shoot() { }
    takeDamage() {
        this.hp--;
        if (this.hp <= 0) {
            this.markedForDeletion = true;
            this.game.score += 100;
        }
    }
    draw(renderer) {
        renderer.drawRect('red', this.x, this.y, this.width, this.height);
    }
}

class HumanEnemy extends BaseEnemy {
    constructor(game, x, y) {
        super(game, x, y);
        this.vx = Math.random() > 0.5 ? 1 : -1;
        this.shootInterval = 2000 + Math.random() * 1000;
    }
    shoot() {
        this.game.enemyManager.projectiles.push(
            new Projectile(this.x + this.width / 2, this.y + this.height, this.game.player.x, this.game.player.y, 'stone')
        );
    }
    draw(renderer) {
        renderer.drawSprite('enemy', this.x, this.y, this.width, this.height);
    }
}

class BirdEnemy extends BaseEnemy {
    constructor(game, x, y) {
        super(game, x, y);
        this.vx = Math.random() > 0.5 ? 2 : -2; // faster
        this.shootInterval = 1500 + Math.random() * 1000;
        this.width = 64; // doubled
        this.height = 64;
    }
    shoot() {
        this.game.enemyManager.projectiles.push(
            new Projectile(this.x + this.width / 2, this.y + this.height, this.game.player.x, this.game.player.y, 'poop')
        );
    }
    draw(renderer) {
        // Flip when moving left
        const flip = this.vx < 0; // Flip when moving left
        if (this.game.renderer.images['bird']) {
            renderer.drawSprite('bird', this.x, this.y, this.width, this.height, flip);
        } else {
            renderer.drawRect('white', this.x, this.y, this.width, this.height);
        }
    }
}

class SquirrelEnemy extends BaseEnemy {
    constructor(game, x, y) {
        super(game, x, y);
        this.vx = 0;
        if (Math.random() > 0.7) this.vx = Math.random() > 0.5 ? 0.5 : -0.5;
        this.shootInterval = 1000 + Math.random() * 2000;
        this.width = 48; // doubled
        this.height = 48;
    }
    shoot() {
        this.game.enemyManager.projectiles.push(
            new Projectile(this.x + this.width / 2, this.y + this.height, this.game.player.x, this.game.player.y, 'acorn')
        );
    }
    draw(renderer) {
          renderer.drawSprite('squirrel', this.x, this.y, this.width, this.height);
    }
}
