class RenderManager {
  canvas;
  context;
  renderTargets = [];

  addRenderTarget(target) {
    this.renderTargets.push(target);
  }

  draw(target) {  
    
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