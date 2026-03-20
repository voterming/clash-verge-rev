<<<<<<< HEAD
;(function () {
  if (typeof window.WeakRef !== 'undefined') {
    return
=======
(function () {
  if (typeof window.WeakRef !== "undefined") {
    return;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  }

  window.WeakRef = (function (weakMap) {
    function WeakRef(target) {
<<<<<<< HEAD
      weakMap.set(this, target)
    }
    WeakRef.prototype.deref = function () {
      return weakMap.get(this)
    }

    return WeakRef
  })(new WeakMap())
})()
=======
      weakMap.set(this, target);
    }
    WeakRef.prototype.deref = function () {
      return weakMap.get(this);
    };

    return WeakRef;
  })(new WeakMap());
})();
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
