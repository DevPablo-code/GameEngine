const InputManager = require('./Managers/InputManager');
const SceneManager = require('./Managers/SceneManager');
const RenderManager = require('./Managers/RenderManager');

class Engine {
  inputManager = new InputManager();
  renderManager = new RenderManager();
  sceneManager = new SceneManager();

  Update() {
    this.inputManager.Update();
    this.sceneManager.Update();
    this.renderManager.Update();
  }
}

module.exports = Engine;