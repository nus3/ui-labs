export class EventEmitter {
  #listeners;

  constructor() {
    this.#listeners = new Map();
  }

  on(eventName, listener) {
    if (!this.#listeners.has(eventName)) {
      this.#listeners.set(eventName, new Set());
    }
    this.#listeners.get(eventName).add(listener);
  }

  off(eventName, listener) {
    if (!this.#listeners.has(eventName)) {
      return;
    }
    this.#listeners.get(eventName).delete(listener);
  }

  emit(eventName, data) {
    const listeners = this.#listeners.get(eventName);
    if (!listeners) {
      return;
    }

    for (const listener of listeners) {
      try {
        listener(eventName, data);
      } catch (error) {
        console.error(`Error in event listener: ${error}`);
      }
    }
  }
}
