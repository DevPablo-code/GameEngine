const Engine = require('./Engine');
const buildLevelRender = require('./Functions/buildLevelRender');
const { RenderTarget } = require('./Managers/RenderManager');

((async () => {
  const game = new Engine();

  const testObjectFile = game.assetsManager.addAsset('test.yaml');

  await game.assetsManager.loadAssets();

  var r = (await buildLevelRender(game.assetsManager.getAsset(testObjectFile)))[0];

  game.renderManager.addRenderTarget(r);

  game.setup();

  game.run(() => {});
})())