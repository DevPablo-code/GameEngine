const Engine = require('../Source/Engine');
const YAML = require('js-yaml');

((async () => {
  const game = new Engine();

  const testObjectFileId = game.assetsManager.addAsset('test.yaml');

  await game.assetsManager.loadAssets();

  const renderObjects = YAML.load(game.assetsManager.getAsset(testObjectFileId)).renderObjects;

  var rs = (await game.sceneManager.buildLevelRender(renderObjects));

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