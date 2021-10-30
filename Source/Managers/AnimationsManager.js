const math = require('mathjs');

class Animation {
  playing;
  currentFrame;
  nextFrameProgress;
  frameWidth;
  frameRate;
  animationImage;
  animationDirection; /* normal, reverse, alternate, alternate-reverse */
  currentDirection;

  constructor(image = new Image(), frameWidth = 0, frameRate = 30, play = false, animationDirection = 'normal') {
    this.nextFrameProgress = 0;
    this.frameWidth = frameWidth;
    this.frameRate = frameRate;
    this.animationImage = image;
    this.playing = play;
    this.animationDirection = animationDirection;
    switch (animationDirection) {
       case 'normal':
       case'alternate': {
        this.currentDirection = 'forward';
        this.currentFrame = 1;
        break;
       }
       case 'reverse':
       case'alternate-reverse': {
        this.currentDirection = 'backward';
        this.currentFrame = this.animationImage.width / this.frameWidth;
        break;
       }
    }
  }

  start() {
    this.playing = true;
  }

  pause() {
    this.playing = false;
  }

  stop() {
    this.playing = false;
    this.currentFrame = 1;
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
            switch (animation.currentDirection) {
              case 'forward': {
                for (let i = 0; i < Math.trunc(animation.nextFrameProgress.valueOf()); i++) {
                  if (animation.currentFrame == animation.animationImage.width / animation.frameWidth) {
                    if (animation.animationDirection == 'alternate' || animation.animationDirection == 'alternate-reverse') {
                      animation.currentFrame = animation.animationImage.width / animation.frameWidth - 1;
                      animation.currentDirection = 'backward';
                    } else {
                      animation.currentFrame = 1;
                    }
                  } else {
                    animation.currentFrame += 1;
                  }
                }
                break;
              }
              case 'backward': {
                for (let i = 0; i < Math.trunc(animation.nextFrameProgress.valueOf()); i++) {
                  if (animation.currentFrame == 1) {
                    if (animation.animationDirection == 'alternate' || animation.animationDirection == 'alternate-reverse') {
                      animation.currentFrame = 2;
                      animation.currentDirection = 'forward';
                    } else {
                      animation.currentFrame = animation.animationImage.width / animation.frameWidth;
                    }
                  } else {
                    animation.currentFrame -= 1;
                  }
                }
                break;
              }
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