const InputManager = require('./Managers/InputManager');
const { SceneManager } = require('./Managers/SceneManager');
const { RenderManager } = require('./Managers/RenderManager');

class Engine {
  inputManager = new InputManager();
  renderManager = new RenderManager();
  sceneManager = new SceneManager();

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