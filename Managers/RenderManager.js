const math = require('mathjs');

class RenderTarget {
  position;
  size;
  image;

  constructor() {
    this.image = new Image();
    this.position = [0, 0];
    this.size = [1, 1];
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
}

class RenderManager {
  privatecanvas;
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
    var w = target.image.width * target.size[0];
    var h = target.image.height * target.size[1];

    this.context.drawImage(target.image, 
                           target.position[0] - w / 2, target.position[1] - h / 2, //Move local coordinates to image center
                           w, h);
  }

  addRenderTarget(target) {
    this.renderTargets.push(target);
  }
}

module.exports = { RenderManager, RenderTarget };