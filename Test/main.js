const Engine = require('../Source/Engine');
const { Animation } = require('../Source/Managers/AnimationsManager');
const { RenderTarget } = require('../Source/Managers/RenderManager');

((async () => {
  const game = new Engine();

  const testObjectFile = game.assetsManager.addAsset('test.yaml');

  await game.assetsManager.loadAssets();

  var rs = (await game.sceneManager.buildLevelRender(game.assetsManager.getAsset(testObjectFile)));

  game.eventsManager.addListener('Window.RenderLayers.Created', (event) => {
    console.log(event);
  })

  game.renderManager.createRenderLayer();

  game.renderManager.addRenderTarget(rs[0], 0);
  game.renderManager.addRenderTarget(rs[1], 1);

  game.setup();

  game.run((delta) => {
    console.log(delta);
  });
})())