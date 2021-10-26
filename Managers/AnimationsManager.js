const math = require('mathjs');

class Animation {
  playing;
  currentFrame;
  nextFrameProgress;
  frameWidth;
  frameRate;
  animationImage;

  constructor(image = new Image(), frameWidth = 0, frameRate = 30, play = false) {
    this.currentFrame = 1;
    this.nextFrameProgress = 0;
    this.frameWidth = frameWidth;
    this.frameRate = frameRate;
    this.animationImage = image;
    this.playing = play;
  }

  setImage(path) {
    this.animationImage.src = path;
  }

  setFrameWidth(width) {
    this.frameWidth = width;
  }

  setFrameHeight(height) {
    this.frameHeight = height;
  }

  setFrameRate(frameRate) {
    this.frameRate = frameRate;
  }
}

class AnimationsManager {
  currentTick;
  tickRate;
  tickFunction;
  animations;

  constructor(engine) {
    this.engine = engine;
    this.currentTick = 0;
    this.tickRate = 60;
    this.animations = [];
  }

  addAnimation(animation) {
    this.animations.push(animation);
  }

  removeAnimation(animation) {
    const animationIndex = this.animations.indexOf(animation);
    this.animations.splice(animationIndex, 1);
  }

  setup() {
    this.tickFunction = () => {
      this.currentTick += 1;
      this.animations.forEach((animation) => {
        if (animation.playing) {
          animation.nextFrameProgress = math.add(math.fraction(animation.nextFrameProgress), math.fraction(animation.frameRate, this.tickRate));
          if (animation.nextFrameProgress.valueOf() >= 1) {
            if (animation.currentFrame == animation.animationImage.width / animation.frameWidth) {
              animation.currentFrame = Math.trunc(animation.nextFrameProgress.valueOf());
            } else {
              animation.currentFrame += Math.trunc(animation.nextFrameProgress.valueOf());
            }
            animation.nextFrameProgress = math.subtract(animation.nextFrameProgress, Math.trunc(animation.nextFrameProgress.valueOf()));
          }
        }
      })
      if (this.currentTick == this.tickRate) {
        this.currentTick = 0;
      }
      setTimeout(this.tickFunction, 1000 / this.tickRate);
    } 
    setTimeout(this.tickFunction, this.tickFunction, 1000 / this.tickRate);
  }
}

module.exports = { AnimationsManager, Animation };