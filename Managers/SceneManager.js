const YAML = require('js-yaml');
const { RenderTarget } = require('../Managers/RenderManager')

class SceneManager {
  constructor(engine) {
    this.engine = engine;
  }
  async buildLevelRender(text) {
    return new Promise(async (resolve, reject) => {
      try {
        const parsed = YAML.load(text);
        if (parsed.renderObjects && Array.isArray(parsed.renderObjects)) {
             const renderTargets = [];
             for (let renderObject of parsed.renderObjects) {
              const renderTarget = new RenderTarget();
              if (renderObject.position) {
                renderTarget.setPosition(renderObject.position);
              }
              if (renderObject.rotation) {
                renderTarget.setRotation(renderObject.rotation);
              }
              if (renderObject.size) {
                renderTarget.setSize(renderObject.size);
              }
              if (renderObject.imagePath) {
                const imageAssetId = this.engine.assetsManager.addAsset(renderObject.imagePath);
                await this.engine.assetsManager.loadAssets();
                const imageAsset = this.engine.assetsManager.getAsset(imageAssetId);
                renderTarget.setImage(imageAsset);          
              }
              if (renderObject.mirror) {
                renderTarget.setMirror(renderObject.mirror);
              }
              renderTargets.push(renderTarget);
             }
             resolve(renderTargets);
        } else {
          reject('Invalid format. No "renderObjects" key or it isnt array')
        }
      } catch (err) {
        reject(err);
      }
    })
  }
}

module.exports = { SceneManager };