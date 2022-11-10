export class Sun {
  constructor() {
    this.radius = 200;
    this.total = 60;
    this.gap = 1 / this.total;
    this.originPos = [];
    this.pos = [];

    for (let i = 0; i < this.total; i++) {
      const pos = this.getCirclePoint(this.radius, this.gap * i);
      this.originPos[i] = pos;
      this.pos[i] = pos;
    }

    this.fps = 30;
    this.fpsTime = 1000 / this.fps;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x = this.stageWidth - this.radius;
    this.y = this.radius + 100;
  }

  draw(ctx, t) {
    if (!this.time) {
      this.time = t;
    }
    const now = t - this.time;
    if (now > this.fpsTime) {
      this.time = t;
      this.updatePoints();
    }
    ctx.fillStyle = '#ffb200';
    ctx.beginPath();
    for (let i = 1; i < this.total; i++) {
      const pos = this.pos[i];
      // ctx.strokeRect(this.x + pos.x, this.y + pos.y, 5, 5);
      ctx.lineTo(this.x + pos.x, this.y + pos.y);
    }
    ctx.fill();
  }

  updatePoints() {
    for (let i = 1; i < this.total; i++) {
      const pos = this.originPos[i];
      this.pos[i] = {
        x: pos.x + this.ranInt(5),
        y: pos.y + this.ranInt(5),
      };
    }
  }

  ranInt(max) {
    return Math.random() * max;
  }

  getCirclePoint(radius, t) {
    const sunCircle = Math.PI * 2 * t;
    return {
      x: Math.cos(sunCircle) * radius,
      y: Math.sin(sunCircle) * radius,
    };
  }
}
