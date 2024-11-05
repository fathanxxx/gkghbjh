const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function Heart(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.opacity = 1;
    this.draw = function () {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
        ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
        ctx.fill();
    };
    this.update = function () {
        this.y -= this.speed;
        this.opacity -= 0.01;
    };
}

function createHeart() {
    const size = Math.random() * 20 + 10;
    const x = Math.random() * canvas.width;
    const y = canvas.height + size;
    const speed = Math.random() * 1.5 + 0.5;
    hearts.push(new Heart(x, y, size, speed));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, index) => {
        heart.draw();
        heart.update();
        if (heart.opacity <= 0) {
            hearts.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

setInterval(createHeart, 200);
animate();
