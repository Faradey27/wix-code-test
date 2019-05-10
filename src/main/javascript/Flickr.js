(() => {

  class FlickrModule extends window.classes.SearchModule {
    constructor() {
      super('flickr');
    }

    search(query) {
      return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b394136d5dde8d9d0d4f8fc6685386e2&format=json&nojsoncallback=1&text=${query}&extras=url_o`).then((resp) => resp.json()).then((reponse) => {
        const images = (reponse.photos.photo||[]).map((photo) => {
          return {url: photo.url_o, id: photo.id, title: photo.title};
        });
        return {images, query};
      });
    }
  }

  window.classes = window.classes||{};
  window.classes.FlickrModule = FlickrModule;
})();