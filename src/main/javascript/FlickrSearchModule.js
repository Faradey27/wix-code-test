(staticImagesData => {

  class FlickrSearchModule {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.resolveMap = {};

      window.jsonFlickrApi = this.jsonFlickrApiResponseHandler.bind(this);
    }

    getApiRequestString(query) {
      return `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.apiKey}&text=${query}&format=json&per_page=10`;
    }

    jsonFlickrApiResponseHandler(data) {
      this.lastDataSet = data.photos.photo.map(this.formatImage);
    }

    search(query) {
      const jsonPScript = document.createElement('script');

      const oldRequest = document.querySelector(`#query-${query}`);
      if (oldRequest) {
        oldRequest.onload = () => {
          console.log('canceled');
        };

        oldRequest.remove();
      }

      jsonPScript.setAttribute('src', this.getApiRequestString(query));
      jsonPScript.setAttribute('data-query', query);
      jsonPScript.setAttribute('id', `query-${query}`);
      document.body.appendChild(jsonPScript);

      const resultsPromise = new Promise(resolve => {
        this.resolveMap[query] = resolve;
      });

      const that = this;

      jsonPScript.onload = function () {

        const attrQuery = this.attributes['data-query'];

        that.resolveMap[attrQuery.nodeValue](that.formatSearchResult(attrQuery.nodeValue, that.lastDataSet));
      };

      return resultsPromise;
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
        url: originalImage.secret,
        title: originalImage.title,
      };
    }
  }

  window.classes = window.classes || {};
  window.classes.FlickrSearchModule = FlickrSearchModule;
})(window.data.staticImagesData);

