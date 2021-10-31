const { Animation } = require('./AnimationsManager');
const { RenderTarget } = require('./RenderManager')

class SceneManager {
  constructor(engine) {
    this.engine = engine;
  }
  async buildLevelRender(renderObjects) {
    return new Promise(async (resolve, reject) => {
      try {
        if (renderObjects && Array.isArray(renderObjects)) {
             const renderTargets = [];
             for (let renderObject of renderObjects) {
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
                await this.engine.assetsManager.loadAsset(imageAssetId);
                const imageAsset = this.engine.assetsManager.getAsset(imageAssetId);
                renderTarget.setImage(imageAsset);          
              }
              if (renderObject.animation) {
                const animationImageAssetId = this.engine.assetsManager.addAsset(renderObject.animation.imagePath);
                await this.engine.assetsManager.loadAsset(animationImageAssetId);
                const animationImageAsset = this.engine.assetsManager.getAsset(animationImageAssetId);
                const animation = new Animation(animationImageAsset, renderObject.animation.frameWidth, renderObject.animation.frameRate, renderObject.animation.play, renderObject.animation.direction);
                renderTarget.setAnimation(animation);
                this.engine.animationsManager.addAnimation(animation);
              }
              if (renderObject.mirror) {
                renderTarget.setMirror(renderObject.mirror);
              }
              renderTargets.push(renderTarget);
             }
             resolve(renderTargets);
        } else {
          reject('Invalid format. renderObjects isnt array')
        }
      } catch (err) {
        reject(err);
      }
    })
  }
}

module.exports = { SceneManager };