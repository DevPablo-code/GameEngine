const Engine = require('./Engine');
const { RenderTarget } = require('./Managers/RenderManager');

const game = new Engine();

var r = new RenderTarget();
r.setImage('./res/taverntable.png');
r.setPosition([200, 200]);
r.setSize([1.0, 1.0]);

game.renderManager.addRenderTarget(r);

game.setup();

game.run(() => {});