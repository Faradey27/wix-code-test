(() => {
  class SearchModule {
    id = '';

    constructor(id) {
      this.id = id;
    }

    search() {
      console.log('Search by query');
    }
  }

  window.classes = window.classes||{};
  window.classes.SearchModule = SearchModule;
})();
