const $ = require('jquery');
const { KeyboardEvent, MouseEvent } = require('./EventsManager');

class InputManager {
  constructor(engine) {
    this.engine = engine; 
  }

  setup() {
    
    $(this.engine.renderManager.canvas).on('mousedown touchstart', (event) => {
      const canvasRect = event.target.getBoundingClientRect();
      const positionScale = [this.engine.renderManager.canvas.width / canvasRect.width, this.engine.renderManager.canvas.height / canvasRect.height];
      const mouseEvent = new MouseEvent('Button', 'Pressed', {
        button: event.which,
        position: [((event.clientX ? event.clientX : event.originalEvent.touches[0].clientX) - canvasRect.left) * positionScale[0], ((event.clientY ? event.clientY : event.originalEvent.touches[0].clientY) - canvasRect.top) * positionScale[1]],
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        altKey: event.altKey,
      })
      this.engine.eventsManager.emit(mouseEvent);
    })

    $(this.engine.renderManager.canvas).on('mouseup touchend', (event) => {
      const canvasRect = event.target.getBoundingClientRect();
      const positionScale = [this.engine.renderManager.canvas.width / canvasRect.width, this.engine.renderManager.canvas.height / canvasRect.height];
      const mouseEvent = new MouseEvent('Button', 'Released', {
        button: event.which,
        position: [((event.clientX ? event.clientX : event.originalEvent.touches[0].clientX) - canvasRect.left) * positionScale[0], ((event.clientY ? event.clientY : event.originalEvent.touches[0].clientY) - canvasRect.top) * positionScale[1]],
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        altKey: event.altKey,
      })
      this.engine.eventsManager.emit(mouseEvent);
    })

    $(this.engine.renderManager.canvas).on('wheel', (event) => {
      const canvasRect = event.target.getBoundingClientRect();
      const positionScale = [this.engine.renderManager.canvas.width / canvasRect.width, this.engine.renderManager.canvas.height / canvasRect.height];
      let subcategory = 'Wheel';
      let action;
      let args = {
        position: [((event.clientX ? event.clientX : event.originalEvent.touches[0].clientX) - canvasRect.left) * positionScale[0], ((event.clientY ? event.clientY : event.originalEvent.touches[0].clientY) - canvasRect.top) * positionScale[1]],
        delta: [event.originalEvent.deltaX, event.originalEvent.deltaY],
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        altKey: event.altKey,
      }
      if (event.originalEvent.deltaY) {
        if (event.originalEvent.deltaY > 0) {
          action = 'ScrollDown';
        } else {
          action = 'ScrollUp';
        }
      } else {
        if (event.originalEvent.deltaX > 0) {
          action = 'ScrollRight';
        } else {
          action = 'ScrollLeft';
        }
      }

      const mouseEvent = new MouseEvent(subcategory, action, args);
      this.engine.eventsManager.emit(mouseEvent);
    })

    $(this.engine.renderManager.canvas).on('mousemove touchmove', (event) => {
      const canvasRect = event.target.getBoundingClientRect();
      const positionScale = [this.engine.renderManager.canvas.width / canvasRect.width, this.engine.renderManager.canvas.height / canvasRect.height];
      const mouseEvent = new MouseEvent('Cursor', 'Move', {
        position: [((event.clientX ? event.clientX : event.originalEvent.touches[0].clientX) - canvasRect.left) * positionScale[0], ((event.clientY ? event.clientY : event.originalEvent.touches[0].clientY) - canvasRect.top) * positionScale[1]],
        delta: [event.originalEvent.movementX, event.originalEvent.movementY],
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        altKey: event.altKey,
      })
      this.engine.eventsManager.emit(mouseEvent);
    })

    $(document).on('keydown', (event) => {
      const keyboardEvent = new KeyboardEvent('Pressed', {
        keyValue: event.key,
        keyCode: event.code,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        altKey: event.altKey,
      })
      this.engine.eventsManager.emit(keyboardEvent);
    })

    $(document).on('keyup', (event) => {
      const keyboardEvent = new KeyboardEvent('Released', {
        keyValue: event.key,
        keyCode: event.code,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        altKey: event.altKey,
      })
      this.engine.eventsManager.emit(keyboardEvent);
    })
  }
} 

module.exports = InputManager;