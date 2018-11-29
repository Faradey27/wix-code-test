((staticImagesData, StaticSearchModule) => {

  class ImageFinder {
    constructor() {
      this.searchModules = {
        default: new StaticSearchModule(),
      };
    }

    addSearchModule(key, mudule) {
      this.searchModules[key] = mudule;
    }

    search(query, searchModuleId) {
      if (searchModuleId && this.searchModules[searchModuleId] === undefined) {
        throw new Error(`Unknown searchModuleId: ${searchModuleId}`);
      }

      const searchModule = searchModuleId ? this.searchModules[searchModuleId] : this.searchModules.default;

      return searchModule.search(query);
    }
  }

  window.classes = window.classes || {};
  window.classes.ImageFinder = ImageFinder;
})(window.data.staticImagesData, window.classes.StaticSearchModule);

