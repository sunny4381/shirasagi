'use strict';

import i18n from 'i18next'
import resources from "../locales";

class CountdownLatch {
  constructor(limit) {
    this.limit = limit;
    this.count = 0;
    this.await = function() {};
  }

  countDown() {
    if (this.limit <= this.count) {
      return;
    }

    this.count = this.count + 1;
    if (this.limit <= this.count) {
      this.await();
    }
  }
}

// private functions
function contentLoaded(latch) {
  document.addEventListener('DOMContentLoaded', () => latch.countDown());
}

function initI18n(latch) {
  i18n.init({
    lng: 'ja',
    fallbackLng: 'en',
    debug: true,
    resources: resources
  }).then(() => latch.countDown());
}

const initHandlers = [ contentLoaded, initI18n ];

export default class SS {
  constructor() {
    this.readyHandlers = [];
    this.readied = false;

    const latch = new CountdownLatch(initHandlers.length);
    latch.await = () => {
      this.readyHandlers.forEach(handler => handler());
      this.readied = true;
    };

    initHandlers.forEach(handler => handler(latch));
  }

  get i18n() {
    return i18n;
  }

  ready(handler) {
    if (this.readied) {
      handler();
      return;
    }

    this.readyHandlers.push(handler);
  }
}
