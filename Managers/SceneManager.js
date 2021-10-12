class SceneObject {
  position;
  abstract;
  callback;

  changeCallback(callback) {
    this.callback = callback;
  }

  constructor(position, callback = () => {}, abstract) {
    this.callback = callback;
    this.abstract = Boolean(abstract);
    if (!this.abstract)
      this.position = position;
  }
}

class SceneManager {
  objects = []; // vector<SceneObject>;

  addObject(object) {
    if (object instanceof SceneObject) {
      this.objects.push(object);
    } else {
      console.log(`${object.constructor.name} is not instance of SceneObject`);
    }
  }

  setObjects(objects) {
    this.objects = [];
    objects.forEach(object => {
      if (object instanceof SceneObject) {
        this.objects.push(object);
      } else {
        console.log(`${object.constructor.name} is not instance of SceneObject`);
      }
    })
  }

  update() {
    this.objects.forEach(object => {
      object.callback();
    })
  }
}

module.exports = SceneManager;