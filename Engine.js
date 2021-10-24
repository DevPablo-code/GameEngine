const InputManager = require('./Managers/InputManager');
const { SceneManager } = require('./Managers/SceneManager');
const { RenderManager } = require('./Managers/RenderManager');
const AssetsManager = require('./Managers/AssetsManager');
const { EventsManager } = require('./Managers/EventsManager');

class Engine {
  eventsManager = new EventsManager(this);
  renderManager = new RenderManager(this);
  sceneManager = new SceneManager(this);
  assetsManager = new AssetsManager(this);
  inputManager = new InputManager(this);

  setup() {
    this.renderManager.setup();
    this.animationsManager.setup();
  }

  run(callback) {
    setInterval(() => {
      this.sceneManager.update();

      callback();

      this.renderManager.update();
    }, 1)
  }
}

module.exports = Engine;