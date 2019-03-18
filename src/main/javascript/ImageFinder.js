(() => {
  class ImageFinder {

    constructor(moduleId) {
      this.module = moduleId;
      this.xhr = null;
    }

    static(query) {
      if (window.data.staticImagesData) {
        const foundItems = window.data.staticImagesData.filter(dataItem => dataItem.title.includes(query));
        
        if (foundItems) {
          return {
            query: query,
            images: foundItems.map(foundItem => ({
              id: foundItem.id,
              url: foundItem.url,
              title: foundItem.title,
            }))
          };
        }
        else {
          return {};
        }
      }
      else {
        console.log('Oops, staticImagesData does not exist');
      }
    }

    flickr(query) {
      this.flickrSearch(query, result => {
        if (result && result.photos && result.photos.photo) {
          const returnResult = {
            query: query,
            images: result.photos.photo.map(foundItem => ({
              id: foundItem.id,
              url: foundItem.url,
              title: foundItem.title,
            }))
          };
          return returnResult;
        }
        else {
          return {};
        }
      })
    }

    flickrSearch(query, callback) {

      if (this.xhr) {
        this.xhr.abort();
      }
      else {
        this.xhr = new XMLHttpRequest();
  
        let flickrAPI = `http://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=b394136d5dde8d9d0d4f8fc6685386e2`;
            flickrAPI += `&text=${query}`;
            flickrAPI += "&format=json";
            flickrAPI += "&nojsoncallback=1";
        xhr.open("GET", flickrAPI, true);
        xhr.send();
  
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
              let result = JSON.parse(xhr.responseText);
              callback(result);
            } 
        };
      }
    }

    search(query, moduleId) {
      switch (moduleId) {
        case 'static':
          return this.static(query);
        case 'flickr':
          return this.flickr(query)
        default:
          throw "Unknown module!"
      }
    }
  }

  window.classes = window.classes || {};
  window.classes.ImageFinder = ImageFinder;
})();

