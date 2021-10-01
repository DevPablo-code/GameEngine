const Engine = require('./Engine');
const { RenderTarget } = require('./Managers/RenderManager');

const game = new Engine();

var r = new RenderTarget();
r.image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png';

game.renderManager.addRenderTarget(r);

game.setup();

game.run(() => {});