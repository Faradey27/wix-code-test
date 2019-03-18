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

    flickrSearch(query) {
      return new Promise(resolve => {
        this.xhr = new XMLHttpRequest();
  
        let flickrAPI = `http://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=b394136d5dde8d9d0d4f8fc6685386e2`;
            flickrAPI += `&text=${query}`;
            flickrAPI += "&format=json";
            flickrAPI += "&nojsoncallback=1";
        this.xhr.open("GET", flickrAPI, true);
        this.xhr.send();
  
        this.xhr.onload = () => {
            if (this.xhr.readyState === 4 && this.xhr.status === 200) {
              let result = JSON.parse(this.xhr.responseText);
              const returnResult = {
                query: query,
                images: result.photos.photo.map(foundItem => ({
                  id: foundItem.id,
                  url: foundItem.url,
                  title: foundItem.title,
                }))
              };
              return resolve(returnResult)
            } 
        };
      })
    }

    async search(query, moduleId, cancelled) {
      try {
        switch (moduleId) {
          case 'static':
            return this.static(query)
          case 'flickr':
            return await this.flickrSearch(query, cancelled);
          default:
            throw Error('Not found');
        }
      }
      catch(err) {
        throw Error('Not found');
      }
    }
  }

  window.classes = window.classes || {};
  window.classes.ImageFinder = ImageFinder;
})();

