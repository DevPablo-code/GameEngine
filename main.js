const Engine = require('./Engine');
const buildLevelRender = require('./Functions/buildLevelRender');
const { RenderTarget } = require('./Managers/RenderManager');

((async () => {
  const game = new Engine();

  var r = (await buildLevelRender('./test.yaml'))[0];

  game.renderManager.addRenderTarget(r);

  game.setup();

  game.run(() => {});
})())