(() => {
  class ImageFinder {
    module(moduleId) {
      const Module = window.modules && window.modules.find(module => module._name === moduleId)

      if(Module) {
        return new Module()
      } else {
        throw new Error(`Module ${moduleId} not found`)
      }
    }

    async search(query) {
      return this.defaultSearch(query)
    }

    defaultSearch(query) {
      if(!query.length) {
        return { query, images: [] }
      }

      const images = window.data.staticImagesData
        .filter(img => img.title.indexOf(query) !== -1)
        .map(helpers.pluck('id', 'url', 'title'))

      return { query, images };
    }
  }

  window.classes = window.classes || {};
  window.classes.ImageFinder = ImageFinder;
})();
