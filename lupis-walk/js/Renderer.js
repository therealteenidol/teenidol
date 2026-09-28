class Renderer {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.images = {};
    }

    loadImage(key, src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                this.images[key] = img;
                resolve(img);
            };
            img.src = src;
        });
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        if (this.images['bg']) {
            this.ctx.drawImage(this.images['bg'], 0, 0, this.width, this.height);
        } else {
            // Fallback
            this.ctx.fillStyle = '#87CEEB';
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.fillStyle = '#2E8B57';
            this.ctx.fillRect(0, this.height - 40, this.width, 40);
        }
    }

    drawSprite(key, x, y, w, h, flip = false) {
        if (this.images[key]) {
            this.ctx.save();
            if (flip) {
                this.ctx.scale(-1, 1);
                this.ctx.drawImage(this.images[key], -x - w, y, w, h);
            } else {
                this.ctx.drawImage(this.images[key], x, y, w, h);
            }
            this.ctx.restore();
        } else {
            // Fallback placeholder
            this.ctx.fillStyle = 'magenta';
            this.ctx.fillRect(x, y, w, h);
        }
    }

    drawRect(color, x, y, w, h) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }

    drawText(text, x, y, color = 'white', size = 16) {
        this.ctx.fillStyle = color;
        this.ctx.font = `${size}px "Courier New"`;
        this.ctx.fillText(text, x, y);
    }

    drawCrosshair(x, y) {
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x - 10, y);
        this.ctx.lineTo(x + 10, y);
        this.ctx.moveTo(x, y - 10);
        this.ctx.lineTo(x, y + 10);
        this.ctx.stroke();
    }
}
