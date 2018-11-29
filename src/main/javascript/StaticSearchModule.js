(staticImagesData => {

  class StaticSearchModule {
    search(query) {
      const searchRe = new RegExp(query, 'mi');
      const searchResults = staticImagesData.filter(image => image.title.match(searchRe));

      return this.formatSearchResult(query, searchResults.map(this.formatImage));
    }

    formatSearchResult(query, searchResults) {
      return {
        query,
        images: searchResults,
      };
    }

    formatImage(originalImage) {
      return {
        id: originalImage.id,
        url: originalImage.url,
        title: originalImage.title,
      };
    }
  }

  window.classes = window.classes || {};
  window.classes.StaticSearchModule = StaticSearchModule;
})(window.data.staticImagesData);

