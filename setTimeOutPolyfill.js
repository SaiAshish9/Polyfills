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


To view and understand polyfills in a browser, you can take several approaches. Polyfills are typically implemented as JavaScript files that add functionality to older browsers that do not support certain modern JavaScript features.

### Viewing Polyfills in Browser

1. **Check Loaded Scripts in DevTools**:
    - Open the Developer Tools (usually accessible by pressing `F12` or `Ctrl+Shift+I`).
    - Navigate to the "Sources" or "Debugger" tab (depending on the browser).
    - Here, you can see all the JavaScript files loaded by the webpage, including polyfills.
    - Look for files that might be named something like `polyfill.js` or libraries known to include polyfills (e.g., `core-js`, `babel-polyfill`).

2. **Check Network Requests**:
    - In the Developer Tools, go to the "Network" tab.
    - Reload the page to see all the resources being loaded.
    - Look for JavaScript files in the list that may contain polyfills.

3. **Inspect Global Objects**:
    - Open the Developer Console in Developer Tools.
    - Check for the presence of polyfilled features by looking for methods or properties that may not be natively available in older browsers. For example:
      ```javascript
      console.log('Promise' in window); // Check if Promise is available
      console.log('fetch' in window);   // Check if Fetch API is available
      ```

### Example of Viewing Polyfills in the Console
If you are using a library like `core-js` for polyfilling, you can see which features are being polyfilled by looking at the library's documentation or by examining the source code.

### Example Polyfill Integration
Here's an example of how you might include polyfills in your project:

1. **Using a CDN**:
    ```html
    <script src="https://cdn.jsdelivr.net/npm/core-js-bundle/minified.js"></script>
    ```

2. **Using npm**:
    - Install core-js: `npm install core-js`
    - Import the polyfills in your JavaScript file:
      ```javascript
      import 'core-js/stable';
      import 'regenerator-runtime/runtime';
      ```

### Checking if a Feature is Polyfilled
You can check if a feature is polyfilled by examining the source code of the polyfill or by testing the presence of the feature in the console.

For example, to check if `Array.prototype.includes` is polyfilled:
```javascript
if (!Array.prototype.includes) {
  console.log('Array.prototype.includes is polyfilled');
}
```

### Summary
To view and verify polyfills in the browser:
- Use the Developer Tools to check loaded scripts and network requests.
- Inspect global objects in the console to see if certain features are available.
- Include polyfills via CDNs or npm packages and verify their presence by checking the availability of modern JavaScript features.

These steps will help you understand which polyfills are being loaded and used in your web application.
