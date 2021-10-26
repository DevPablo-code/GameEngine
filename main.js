const Engine = require('./Engine');
const buildLevelRender = require('./Functions/buildLevelRender');
const { Animation } = require('./Managers/AnimationsManager');
const { RenderTarget } = require('./Managers/RenderManager');

((async () => {
  const game = new Engine();

  const testObjectFile = game.assetsManager.addAsset('test.yaml');
  const tavernTableAnimation = game.assetsManager.addAsset('./res/taverntableanim.png');

  await game.assetsManager.loadAssets();

  var rs = (await buildLevelRender(game.assetsManager.getAsset(testObjectFile)));

  game.renderManager.createRenderLayer();

  let anim1 = new Animation(game.assetsManager.getAsset(tavernTableAnimation), rs[0].image.width, 1, true);

  game.animationsManager.addAnimation(anim1);

  rs[0].setAnimation(anim1);

  game.renderManager.addRenderTarget(rs[0], 0);
  game.renderManager.addRenderTarget(rs[1], 1);

  game.setup();

  game.run(() => {});
})())