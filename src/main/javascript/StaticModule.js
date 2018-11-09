(() => {
  class StaticModule {
    async search(query) {
      if(!query.length) {
        return { query, images: [] }
      }

      const images = window.data.staticImagesData
        .filter(img => img.title.indexOf(query) !== -1)
        .map(helpers.pluck('id', 'url', 'title'))

      console.log(images);

      return { query, images };
    }
  }

  StaticModule._name = 'static'
  window.modules = window.modules || [];
  window.modules.push(StaticModule);
})();
