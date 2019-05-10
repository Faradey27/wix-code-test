(() => {

  class StaticModule extends window.classes.SearchModule {
    constructor() {
      super('static');
    }

    search(query) {
      const images = window.data.staticImagesData.filter((item) => {
        return item.title.includes(query);
      }).map((item) => {
        const {id, url, title} = item;
        return {id, url, title};
      });

      return Promise.resolve({query, images});
    };
  }

  window.classes = window.classes||{};
  window.classes.StaticModule = StaticModule;
})();
