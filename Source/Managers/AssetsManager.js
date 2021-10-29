class AssetsManager {
  assets;
  assetsLoaded;

  constructor(engine) {
    this.engine = engine;
    this.assets = new Map();
    this.assetsLoaded = 0;
  }

  addAsset(path) {
    const id = this.assets.size + 1;
    this.assets.set(id, {
      path: path,
      value: null,
    })
    return id;
  }

  getAsset(id) {
    return this.assets.get(id).value;
  }

  loadAssets() {
    const loads = [];
    for (let [key, value] of this.assets) {
      if (value.value == null) {
        const path = value.path;
        const ext = path.slice(path.lastIndexOf('.') + 1);
        switch (ext) {
          case 'png' || 'jpg': {
            loads.push(new Promise((resolve, reject) => {
              const image = new Image();
              image.onload = () => {
                value.value = image;
                this.assetsLoaded++;
                image.onload = null;
                image.onerror = null;
                resolve();
              }
              image.onerror = () => {
                this.assetsLoaded++;
                image.onload = null;
                image.onerror = null;
                console.log(`Failed to load asset with ${path} path. Maybe the path is invalid`);
                resolve();
              }
              image.src = path;
            }))
            break;
          }
          default: {
            loads.push(new Promise(async (resolve, reject) => {
              try {
                const file = await fetch(path);
                if (!file.ok) {
                  console.log(`Failed to load asset with ${path} path. Maybe the path is invalid`);
                } else {
                  value.value = await file.text();
                }
                this.assetsLoaded++;
                resolve();
              } catch(err) {
                this.assetsLoaded++;
                console.log(`Failed to load asset with ${path} path. Maybe the path is invalid`);
                resolve();
              }
            }))
          }
        }
      }
    }
    return Promise.all(loads);
  }

  unloadAssets() {
    this.assets.clear();
  }

  isAllAssetsLoaded() {
    return this.assetsLoaded == this.assets.size;
  }
}

module.exports = AssetsManager;