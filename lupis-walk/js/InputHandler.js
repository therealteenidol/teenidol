class InputHandler {
    constructor() {
        this.keys = {
            left: false,
            right: false,
            up: false, // For menu navigation or debug
            down: false,
            throw: false,
            shoot: false
        };
        this.mouse = { x: 0, y: 0, down: false };

        window.addEventListener('keydown', (e) => this.handleKey(e, true));
        window.addEventListener('keyup', (e) => this.handleKey(e, false));

        // Mouse/Touch for shooting
        window.addEventListener('mousemove', (e) => this.handleMouse(e));
        window.addEventListener('mousedown', () => this.mouse.down = true);
        window.addEventListener('mouseup', () => this.mouse.down = false);
    }

    handleKey(e, isDown) {
        switch (e.code) {
            case 'ArrowLeft':
            case 'KeyA':
                this.keys.left = isDown;
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.keys.right = isDown;
                break;
            case 'Space':
                this.keys.throw = isDown;
                break;
            case 'KeyZ':
            case 'KeyJ':
                this.keys.shoot = isDown;
                break;
        }
    }

    handleMouse(e) {
        // We might need to adjust for canvas position if we use mouse for aiming
        // For now, Cabal-style often uses keyboard for movement and maybe mouse for crosshair?
        // The user said "one key to shoot/fight", so maybe it's purely keyboard or keyboard + mouse aim.
        // Let's track mouse just in case.
        const canvas = document.getElementById('gameCanvas');
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            this.mouse.x = (e.clientX - rect.left) * scaleX;
            this.mouse.y = (e.clientY - rect.top) * scaleY;
        }
    }
}
