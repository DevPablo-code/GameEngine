class RenderTarget {
  position;
  size;
  image;

  constructor() {
    this.image = new Image();
  }
}

class RenderManager {
  privatecanvas;
  context;
  renderTargets = [];
  
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

  draw(target) {  
    this.context.drawImage(target.image, 0, 0);
  }

  addRenderTarget(target) {
    this.renderTargets.push(target);
  }
}

module.exports = { RenderManager, RenderTarget };