(() => {
    class ImageFinder {
      async search(query, moduleId, id) {
        let images = await window.modules[moduleId](query, id);

        return {
          query,
          images: images.map(img => ({
            id: img.id,
            url: img.url,
            title: img.title,
          })),
        };
      }
  }

  window.classes = window.classes || {};
  window.classes.ImageFinder = ImageFinder;
})();

