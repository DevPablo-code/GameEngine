const InputManager = require('./Managers/InputManager');
const SceneManager = require('./Managers/SceneManager');
const RenderManager = require('./Managers/RenderManager');

class Engine {
  inputManager = new InputManager();
  renderManager = new RenderManager();
  sceneManager = new SceneManager();  

  setup() {

  }

  run(callback) {
    while(true) {
      this.inputManager.update();
      callback();
      this.sceneManager.update();
      this.renderManager.update();
    }
  }
}

module.exports = Engine;