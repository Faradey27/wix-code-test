(() => {
  class ImageFinder {
    constructor() {
      this._searchModules = {};
    }

    addSearchModule(id, searchModule) {
      if (typeof searchModule !== 'function') {
        throw new Error('Search module must be a function');
      }

      this._searchModules[id] = searchModule;
    }

    getSearchModuleIds() {
      return Object.keys(this._searchModules);
    }

    search(query, moduleId) {
      const searchModule = this._searchModules[moduleId];

      if (!searchModule) {
        throw new Error('Module with such id does not exist');
      }

      return searchModule(query).then(images => {
        return { query, images };
      });
    }
  }

  window.classes = window.classes || {};
  window.classes.ImageFinder = ImageFinder;
})();

