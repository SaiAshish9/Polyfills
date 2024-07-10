(function() {
  var timers = [];
  var counter = 0;

  function setTimeoutPolyfill(callback, delay) {
    var id = counter++;
    var start = Date.now();

    function check() {
      if (Date.now() - start >= delay) {
        callback();
        clearInterval(timers[id]);
        delete timers[id];
      }
    }

    timers[id] = setInterval(check, 1);
    return id;
  }

  function clearTimeoutPolyfill(id) {
    clearInterval(timers[id]);
    delete timers[id];
  }

  // Expose the polyfill to the global scope
  window.setTimeoutPolyfill = setTimeoutPolyfill;
  window.clearTimeoutPolyfill = clearTimeoutPolyfill;
})();

// Usage
setTimeoutPolyfill(() => {
  console.log('This will run after 1000ms');
}, 1000);
