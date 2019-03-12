(() => {
    class BaseSearch {

        search(query) {
            if (this.reject) this.reject('aborted');

            this.process = new Promise((resolve, reject) => {
                this.reject = reject;
                this.getImages(query).then(images => {
                    this.reject = null;
                    resolve({
                        query,
                        images
                    });
                });
            });

            return this.process;
        }

        getImages() {
            throw new Error('should be implemented by extended class');
        }
    }

    class StaticSearch extends BaseSearch {

        getImages(query) {
            const foundedImages = window.data.staticImagesData.reduce((founded, image) => {
                if (image.title.indexOf(query) !== -1) {
                    founded.push({
                        id: image.id,
                        url: image.url,
                        title: image.title
                    });
                }
                return founded;
            }, []);

            return Promise.resolve(foundedImages);
        }
    }

    class FlickSearch extends BaseSearch {
        constructor(apiKey) {
            super();
            this.apiKey = apiKey;
        }

        getImages(query) {
            return new Promise((resolve, reject) => {
                const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.apiKey}&text=${encodeURI(query)}&format=json&nojsoncallback=1`;
                const xhr = new XMLHttpRequest();

                xhr.open('GET', url, true);
                xhr.send();

                xhr.onreadystatechange = function () {
                    if (xhr.readyState != 4) return;

                    if (xhr.status != 200) {
                        reject(xhr.status + ': ' + xhr.statusText);
                    } else {
                        resolve(JSON.parse(xhr.responseText).photos.photo);
                    }
                };
            });
        }
    }

    class SearchModuleFactory {

        create(type) {
            switch (type) {
                case 'static':
                    return new StaticSearch();
                case 'flickr':
                    return new FlickSearch('b394136d5dde8d9d0d4f8fc6685386e2');
                default:
                    return null;
            }
        }
    }

    const staticSearch = new StaticSearch();
    const flickSearch = new FlickSearch('b394136d5dde8d9d0d4f8fc6685386e2');

    window.classes = window.classes || {};
    window.classes.SearchModuleFactory = new SearchModuleFactory();
})();

