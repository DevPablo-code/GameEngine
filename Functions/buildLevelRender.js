const YAML = require('js-yaml');
const { RenderTarget } = require('../Managers/RenderManager')

const buildLevelRender = async (path) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(path);
      const text = await response.text();
      const parsed = YAML.load(text);
      if (parsed.renderObjects && Array.isArray(parsed.renderObjects)) {
           const renderTargets = [];
           parsed.renderObjects.forEach((renderObject) => {
            const renderTarget = new RenderTarget();
            if (renderObject.position) {
              renderTarget.setPosition(renderObject.position);
            }
            if (renderObject.size) {
              renderTarget.setSize(renderObject.size);
            }
            if (renderObject.imagePath) {
              renderTarget.setImage(renderObject.imagePath);
            }
            renderTargets.push(renderTarget);
           })
           resolve(renderTargets);
      } else {
        reject('Invalid format. No "renderObjects" key or it isnt array')
      }
    } catch (err) {
      reject(err);
    }
  })
}

module.exports = buildLevelRender;