const $ = require('jquery');

class InputManager {
  lastInput = new Map();
  newInput = new Map();

  constructor() {
    $(document).on('mousedown', (event) => {
      this.newInput.set(`mb${event.which}`, {
        state: 'pressed',
        position: [event.clientX, event.clientY],
      })
    })

    $(document).on('mouseup', (event) => {
      this.newInput.set(`mb${event.which}`, {
        state: 'released',
        position: [event.clientX, event.clientY],
      })
    })

    $(document).on('keydown', (event) => {
      this.newInput.set(event.code.replace('Key',  ''), {
        state: 'pressed',
      })
    })

    $(document).on('keyup', (event) => {
      this.newInput.set(event.code.replace('Key',  ''), {
        state: 'released',
      })
    })
  }

  update() {
    this.lastInput = this.newInput;
    if (this.lastInput.size != 0) {
      console.log(this.lastInput)
    }
    this.newInput = new Map();
  }
}

module.exports = InputManager;