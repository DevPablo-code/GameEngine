const math = require('mathjs');

class RenderTarget {
  position;
  rotation;
  size;
  mirror;
  image;

  constructor() {
    this.image = new Image();
    this.position = [0, 0];
    this.rotation = 0;
    this.size = [1, 1];
    this.mirror = [-1, -1];
  }

  setImage(path) {
    this.image.src = path;
  }

  setPosition(pos) {
    this.position = pos;
  }

  setRotation(rotation) {
    this.rotation = rotation;
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
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderTargets.forEach((target) => {
      this.draw(target);
    })
  }

  draw(target) {
    this.context.save();
    let w = target.image.width * target.size[0];
    let h = target.image.height * target.size[1];
    let x = target.position[0] - w / 2;
    let y = target.position[1] - h / 2;
    let scaleX = 1;
    let scaleY = 1;
    if (target.mirror[0] == 1) {
      scaleX = -1;
      x = -(x + w);
    }
    if (target.mirror[1] == 1) {
      scaleY = -1;
      y = -(y + h);
    }
    this.context.scale(scaleX, scaleY);

    this.context.translate(x + w / 2, y + h / 2);
    this.context.rotate(target.rotation * Math.PI / 180);
    this.context.translate(-x - w / 2, -y - h / 2);

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