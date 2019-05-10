(() => {
  class ImageFinder {
    modules = [];
    galleries = new Map();

    search(query, moduleId, galleryId, callback) {
      const module = this.modules.find((item) => {
        return item.id === moduleId;
      });

      if (module === undefined) {
        throw new Error('Unknown module');
      }

      this.galleries.set(galleryId, callback);

      const promise = module.search(query);

      promise.then((result) => {
        this.galleries.get(galleryId)(result);
      });
    }

    registerModule(module) {
      this.modules.push(module);
    }
  }

  window.classes = window.classes||{};
  window.classes.ImageFinder = ImageFinder;
})();
