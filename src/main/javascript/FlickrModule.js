(() => {
  class FlickrModule {
    constructor() {
      this.apiKey = 'b394136d5dde8d9d0d4f8fc6685386e2'
    }

    async search(query) {
      const results = await this._searchFlickr(query)

      const images = results.photos.photo.map(img => ({
        id: img.id,
        url: `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`,
        title: img.title
      }))

      return { images, query }
    }

    _searchFlickr(query) {
      return new Promise((resolve, reject) => {
        const url = `https://api.flickr.com/services/rest/?
          api_key=${this.apiKey}&
          nojsoncallback=1&
          method=flickr.photos.search&
          per_page=100&
          format=json&
          content_type=7&
          tags=${query}&
          text=${query}`;

        FlickrModule.XHR = new XMLHttpRequest();

        FlickrModule.XHR.onload = function() {
          if(this.status !== 200) {
            reject(`${this.status}: ${this.statusText}`)
          } else {
            resolve(JSON.parse(this.response))
          }
        }

        FlickrModule.XHR.open('get', url, true);
        FlickrModule.XHR.send();
      })
    }
  }

  FlickrModule.XHR = null
  FlickrModule._searches = []
  FlickrModule._name = 'flickr'
  window.modules = window.modules || [];
  window.modules.push(FlickrModule);
})();
