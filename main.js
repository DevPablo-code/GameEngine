const Engine = require('./Engine');
const buildLevelRender = require('./Functions/buildLevelRender');
const { RenderTarget } = require('./Managers/RenderManager');

((async () => {
  const game = new Engine();

  const testObjectFile = game.assetsManager.addAsset('test.yaml');

  await game.assetsManager.loadAssets();

  var rs = (await buildLevelRender(game.assetsManager.getAsset(testObjectFile)));

  game.renderManager.createRenderLayer();

  game.renderManager.addRenderTarget(rs[0], 0);
  game.renderManager.addRenderTarget(rs[1], 1);

  game.setup();

  game.run(() => {});
})())