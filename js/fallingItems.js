class FallingItems {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.items = [];
        this.messages = [
            "新年快乐！🎊",
            "心想事成！💫",
            "万事如意！✨",
            "平安喜乐！🌟",
            "前程似锦！💝",
            "笑口常开！😊",
            "身体健康！💪",
            "幸福美满！💖",
            "事业有成！📈",
            "好运连连！🍀",
            "开开心心！😄",
            "梦想成真！🌈"
        ];
        this.emojis = ['✨', '🎊', '🎉', '🎈', '🎆', '💫', '⭐'];
        this.active = false;
        this.clickable = false;
        this.resizeCanvas();
        this.setupEventListeners();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createItem() {
        const emoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];
        this.items.push({
            x: Math.random() * this.canvas.width,
            y: -30,
            speed: 1 + Math.random() * 3,
            spin: Math.random() * 360,
            spinSpeed: -2 + Math.random() * 4,
            emoji: emoji,
            size: 20 + Math.random() * 20
        });
    }

    start() {
        this.active = true;
        this.animate();
    }

    stop() {
        this.active = false;
    }

    animate() {
        if (!this.active) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 随机创建新元素
        if (Math.random() < 0.1) {
            this.createItem();
        }

        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            item.y += item.speed;
            item.spin += item.spinSpeed;

            this.ctx.save();
            this.ctx.translate(item.x, item.y);
            this.ctx.rotate(item.spin * Math.PI / 180);
            this.ctx.font = `${item.size}px Arial`;
            this.ctx.fillText(item.emoji, 0, 0);
            this.ctx.restore();

            if (item.y > this.canvas.height + 30) {
                this.items.splice(i, 1);
            }
        }

        requestAnimationFrame(() => this.animate());
    }

    setupEventListeners() {
        this.canvas.addEventListener('click', (e) => {
            if (!this.clickable) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 检查点击是否击中任何项目
            for (let i = this.items.length - 1; i >= 0; i--) {
                const item = this.items[i];
                const distance = Math.sqrt(
                    Math.pow(x - item.x, 2) + 
                    Math.pow(y - item.y, 2)
                );
                if (distance < item.size / 2) {
                    // 处理点击事件
                    // 这里可以添加点击后的处理逻辑
                }
            }
        });
    }
} 