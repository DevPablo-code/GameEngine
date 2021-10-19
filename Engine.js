const InputManager = require('./Managers/InputManager');
const { SceneManager } = require('./Managers/SceneManager');
const { RenderManager } = require('./Managers/RenderManager');
const AssetsManager = require('./Managers/AssetsManager');
const { EventsManager } = require('./Managers/EventsManager');

class Engine {
  eventsManager = new EventsManager();
  inputManager = new InputManager();
  renderManager = new RenderManager();
  sceneManager = new SceneManager();
  assetsManager = new AssetsManager();

  setup() {
    this.renderManager.setup();
  }

  run(callback) {
    setInterval(() => {
      this.inputManager.update();
      this.sceneManager.update();

      callback();

      this.renderManager.update();
    }, 1)
  }
}

module.exports = Engine;