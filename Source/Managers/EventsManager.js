class Event {
  category ;
  subcategory;
  action;
  args;

  constructor(category = '', subcategory = '', action = '', args = {}) {
    this.category = category;
    this.subcategory = subcategory;
    this.action = action;
    this.args = args;
  }
}

class KeyboardEvent extends Event {
  constructor(action, args) {
    super('Keyboard', null, action, args);
  }
}

class MouseEvent extends Event {
  constructor(subcategory, action, args) {
    super('Mouse', subcategory, action, args);
  }
}

class LevelEvent extends Event {
  constructor(subcategory, action, args) {
    super('Level', subcategory, action, args);
  }
}

class WindowEvent extends Event {
  constructor(subcategory, action, args) {
    super('Window', subcategory, action, args);
  }
}

class EventsManager {   
  events;

  constructor(engine) {
    this.engine = engine;
    this.events = new Map();
  }

  addListener(event, callback) {
    if (!this.events.has(event)) {  
      this.events.set(event, []);
    }
    const listeners = this.events.get(event);
    return listeners.push(callback) - 1;
  }

  removeListener(event, listenerIndex) {
    if (this.events.has(event)) {
      const listeners = this.events.get(event);
      listeners.splice(listenerIndex, 1);
    }
  }

  removeListeners(event) {
    this.events.delete(event);
  }

  clearEvents() {
    this.events.clear();   
  }

  getEventListeners(event) {
    return this.events.get(event) || [];
  }

  emit(event) {
    const listeners = [...this.getEventListeners(event.category), ...this.getEventListeners(`${event.category}.${event.subcategory}`), ...this.getEventListeners(`${event.category}.${event.subcategory}.${event.action}`)];
    listeners.forEach((listener) => {
      listener(event);
    })
  }
}

module.exports = { EventsManager, Event, KeyboardEvent, MouseEvent, LevelEvent, WindowEvent };