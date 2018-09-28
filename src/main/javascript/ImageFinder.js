(() => {
  class ImageFinder {
    constructor(modules) {
      this._modules = modules
    }

    get modules() {
      return this._modules;
    }

    search(query, moduleId) {
      const module = this._modules[moduleId];

      if (!module) {
        throw new Error('Unknown module');
      }

      return module.search(query);
    }
  }

  window.classes = window.classes || {};
  window.classes.ImageFinder = ImageFinder;
})();

