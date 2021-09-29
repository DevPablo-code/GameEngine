class RenderManager {
  canvas;
  context;
  renderTargets = [];

  addRenderTarget(target) {
    this.renderTargets.push(target);
  }

  draw(target) {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setup() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
  }

  update() {
    this.renderTargets.forEach((target) => {
      this.draw(target);
    })
  }
}

module.exports = RenderManager;