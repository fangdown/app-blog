function CustomEvent(type, options) {
  options = options || {};
  var event = document.createEvent("CustomEvent");
  event.initCustomEvent(
    type,
    options.bubbles || false,
    options.cancelable || false,
    options.detail || null
  );
  return event;
}

CustomEvent.prototype = window.Event.prototype;

const c1 = new CustomEvent("test", {});

// 触发
element.dispatchEvent(c1);
