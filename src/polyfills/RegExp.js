<<<<<<< HEAD
;(function () {
  if (typeof window.RegExp === 'undefined') {
    return
  }

  const originalRegExp = window.RegExp

  window.RegExp = function (pattern, flags) {
    if (pattern instanceof originalRegExp && flags === undefined) {
      flags = pattern.flags
    }

    if (flags) {
      if (
        !Object.prototype.hasOwnProperty.call(
          originalRegExp.prototype,
          'unicodeSets',
        )
      ) {
        if (flags.includes('v')) {
          flags = flags.replace('v', 'u')
        }
      }

      if (
        !Object.prototype.hasOwnProperty.call(
          originalRegExp.prototype,
          'hasIndices',
        )
      ) {
        if (flags.includes('d')) {
          flags = flags.replace('d', '')
=======
(function () {
  if (typeof window.RegExp === "undefined") {
    return;
  }

  const originalRegExp = window.RegExp;

  window.RegExp = function (pattern, flags) {
    if (pattern instanceof originalRegExp && flags === undefined) {
      flags = pattern.flags;
    }

    if (flags) {
      if (!originalRegExp.prototype.hasOwnProperty("unicodeSets")) {
        if (flags.includes("v")) {
          flags = flags.replace("v", "u");
        }
      }

      if (!originalRegExp.prototype.hasOwnProperty("hasIndices")) {
        if (flags.includes("d")) {
          flags = flags.replace("d", "");
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        }
      }
    }

<<<<<<< HEAD
    return new originalRegExp(pattern, flags)
  }
  window.RegExp.prototype = originalRegExp.prototype
})()
=======
    return new originalRegExp(pattern, flags);
  };
  window.RegExp.prototype = originalRegExp.prototype;
})();
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
