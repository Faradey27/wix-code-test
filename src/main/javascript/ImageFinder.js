(() => {

  class ImageFinder {

    search(query, module) {
      // defines here to get possibility import modules after ImageFinder
      const modules = window.ImageFinderModules;

      if (modules.hasOwnProperty(module)) {

        return new Promise(resolve => {
          const result = modules[module](query);

          if (result instanceof Promise) {
            return resolve(result);
          } else {
            resolve(result);
          }
        });

      } else {
        throw new Error(`ImageFinder.search() : There is no "${module}" module.`)
      }
    }
  }

  window.classes = window.classes || {};
  window.classes.ImageFinder = ImageFinder;
})();
