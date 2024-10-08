const { Animation } = require('./AnimationsManager');
const { WindowEvent, LevelEvent } = require('./EventsManager');

class RenderTarget {
  position;
  rotation;
  size;
  mirror;
  image;
  animation;

  constructor() {
    this.image = new Image();
    this.animation = new Animation();
    this.position = [0, 0];
    this.rotation = 0;
    this.size = [1, 1];
    this.mirror = [-1, -1];
  }

  setImagePath(path) {
    this.image.src = path;
  }

  setImage(image) {
    this.image = image;
  }

  setAnimation(animation) {
    this.animation = animation;
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
  renderTargets = new Map([[0, []]]);

  constructor(engine) {
    this.engine = engine;
  }

  setup() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;

    this.context = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);
  }

  update() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let value of this.renderTargets.values()) {
      value.forEach((target) => {
        this.draw(target);
      })
    }
  }

  getRenderInfo(target) {
    let image, x, y, w, h, offsetX, offsetY, areaW, areaH;
    if (target.animation.playing) {
      image = target.animation.animationImage;
      w = target.animation.frameWidth * target.size[0];
      h = target.animation.animationImage.height * target.size[1];
      areaW = target.animation.frameWidth;
      areaH = target.animation.animationImage.height
      offsetX = target.animation.frameWidth * (target.animation.currentFrame - 1);
      offsetY = 0;
    } else {
      image = target.image;
      w = target.image.width * target.size[0];
      h = target.image.height * target.size[1];
      areaW = target.image.width;
      areaH = target.image.height;
      offsetX = 0;
      offsetY = 0;
    }
    x = target.position[0] - w / 2;
    y = target.position[1] - h / 2;

    return [image, x, y, w, h, offsetX, offsetY, areaW, areaH];
  }

  draw(target, context = this.context, [image, x, y, w, h, offsetX, offsetY, areaW, areaH] = this.getRenderInfo(target)) {
    context.save();
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
    context.scale(scaleX, scaleY);

    context.translate(x + w / 2, y + h / 2);
    context.rotate(target.rotation * Math.PI / 180);
    context.translate(-x - w / 2, -y - h / 2);

    context.drawImage(image, offsetX, offsetY, areaW, areaH, x, y, w, h);

    context.restore();
  }

  setCanvasSize(width, height) {
    const oldWidth = this.canvas.width;
    const oldHeight = this.canvas.height;

    this.canvas.width = width;
    this.canvas.height = height;

    const windowEvent = new WindowEvent('Canvas', 'Resized', {
      oldSize: [oldWidth, oldHeight],
      newSize: [width, height],
    });

    this.engine.eventsManager.emit(windowEvent);
  }

  addRenderTarget(target, layer = 0) {
    this.renderTargets.get(layer).push(target);
    const levelEvent = new LevelEvent('RenderTarget', 'New', {
      target: target,
      renderLayer: layer,
    });
    this.engine.eventsManager.emit(levelEvent);
  }

  removeRenderTarget(target, layer = 0) {
    const layerObjects = this.renderTargets.get(layer);
    const objectIndex = layerObjects.indexOf(target);
    if (objectIndex != -1) {
      layerObjects.splice(objectIndex, 1);
    }
  }

  createRenderLayer() {
    this.renderTargets.set(this.renderTargets.size, []);
    const newRenderLayerEvent = new WindowEvent('RenderLayers', 'Created', {
      index: this.renderTargets.size - 1,
    })
    this.engine.eventsManager.emit(newRenderLayerEvent);
  }

  deleteRenderLayer() {
    this.renderTargets.delete(this.renderTargets.size - 1);
  }
}

module.exports = { RenderManager, RenderTarget };