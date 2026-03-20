<<<<<<< HEAD
;(function () {
  if (window.matchMedia && window.matchMedia('all').addEventListener) {
    return
  }

  const originalMatchMedia = window.matchMedia

  window.matchMedia = function (query) {
    const mediaQueryList = originalMatchMedia(query)

    if (!mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener = function (eventType, listener) {
        if (eventType !== 'change' || typeof listener !== 'function') {
          console.error('Invalid arguments for addEventListener:', arguments)
          return
        }
        mediaQueryList.addListener(listener)
      }
=======
(function () {
  if (window.matchMedia && window.matchMedia("all").addEventListener) {
    return;
  }

  const originalMatchMedia = window.matchMedia;

  window.matchMedia = function (query) {
    const mediaQueryList = originalMatchMedia(query);

    if (!mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener = function (eventType, listener) {
        if (eventType !== "change" || typeof listener !== "function") {
          console.error("Invalid arguments for addEventListener:", arguments);
          return;
        }
        mediaQueryList.addListener(listener);
      };
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    }

    if (!mediaQueryList.removeEventListener) {
      mediaQueryList.removeEventListener = function (eventType, listener) {
<<<<<<< HEAD
        if (eventType !== 'change' || typeof listener !== 'function') {
          console.error('Invalid arguments for removeEventListener:', arguments)
          return
        }
        mediaQueryList.removeListener(listener)
      }
    }

    return mediaQueryList
  }
})()
=======
        if (eventType !== "change" || typeof listener !== "function") {
          console.error(
            "Invalid arguments for removeEventListener:",
            arguments
          );
          return;
        }
        mediaQueryList.removeListener(listener);
      };
    }

    return mediaQueryList;
  };
})();
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
