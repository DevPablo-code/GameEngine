const InputManager = require('./Managers/InputManager');
const { SceneManager } = require('./Managers/SceneManager');
const { RenderManager } = require('./Managers/RenderManager');
const AssetsManager = require('./Managers/AssetsManager');
const { EventsManager } = require('./Managers/EventsManager');
const { AnimationsManager } = require('./Managers/AnimationsManager');

class Engine {
  eventsManager = new EventsManager(this);
  animationsManager = new AnimationsManager(this);
  renderManager = new RenderManager(this);
  sceneManager = new SceneManager(this);
  assetsManager = new AssetsManager(this);
  inputManager = new InputManager(this);

  lastUpdateTime = 0;

  setup() {
    this.renderManager.setup();
    this.animationsManager.setup();
  }

  run(callback) {
    setInterval(() => {
      let t = Date.now();
      let delta = (t - this.lastUpdateTime) / 1000;
      this.lastUpdateTime = Date.now();

      callback(delta);

      this.renderManager.update();
    }, 1)
  }
}

module.exports = Engine;