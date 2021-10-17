const math = require('mathjs');

class RenderTarget {
  position;
  size;
  mirror;
  image;

  constructor() {
    this.image = new Image();
    this.position = [0, 0];
    this.size = [1, 1];
    this.mirror = [-1, -1];
  }

  setImage(path) {
    this.image.src = path;
  }

  setPosition(pos) {
    this.position = pos;
  }

  setSize(size) {
    this.size = size;
  }

  setMirror(mirror) {
    this.mirror = mirror;
  }
}

class RenderManager {
  canvas;
  context;
  renderTargets = [];
  
  setup() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;

    this.context = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);
  }

  update() {
    this.renderTargets.forEach((target) => {
      this.draw(target);
    })
  }

  draw(target) {
    this.context.save();
    const w = target.image.width * target.size[0];
    const h = target.image.height * target.size[1];
    const x = target.position[0] - w / 2;
    const y = target.position[1] - h / 2;
    this.context.translate(target.mirror[0] == 1 ? target.image.width : 0, target.mirror[1] == 1 ? target.image.height : 0);
    this.context.scale(target.mirror[0] * -1, target.mirror[1] * -1);
    this.context.drawImage(target.image, 
                           x, y, //Move local coordinates to image center
                           w, h);
    this.context.restore();
  }

  addRenderTarget(target) {
    this.renderTargets.push(target);
  }
}

module.exports = { RenderManager, RenderTarget };