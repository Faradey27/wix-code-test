(() => {

    const FLICKR_API_URI = "https://api.flickr.com/services/rest/";
    const FLICKR_API_KEY = "b394136d5dde8d9d0d4f8fc6685386e2";

    class FlickSearchModule {

        constructor() {
            this._clientAbortControllerMap = new Map();
        }

        search(clientMarker, query) {
            if (this._clientAbortControllerMap.get(clientMarker)) {
                this._clientAbortControllerMap.get(clientMarker).abort();
                this._clientAbortControllerMap.delete(clientMarker);
            }
            this._clientAbortControllerMap.set(clientMarker, new AbortController());

            return fetch(this._buildSearchUrl(query), {
                signal: this._clientAbortControllerMap.get(clientMarker).signal
            }).then(r => {
                this._clientAbortControllerMap.delete(clientMarker);
                return r.json()
            }).then(data => ({
                    query: query,
                    images: data.photos.photo.map(photo => ({
                        id: photo.id,
                        url: FlickSearchModule._buildPhotoUrl(photo),
                        title: photo.title
                    }))
                }));
        }

        _buildSearchUrl(query) {
            let url = new URL(FLICKR_API_URI, );
            url.search = new URLSearchParams({
                "method": "flickr.photos.search",
                "format": "json",
                "text": query,
                "api_key": FLICKR_API_KEY,
                "nojsoncallback": 1
            });
            return url;
        }

        static _buildPhotoUrl(photo) {
            return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_t.jpg";
            // return "http://www.flickr.com/photos/" + ownerId + "/" + photoId;
        }
    }

    window.classes = window.classes || {};
    window.classes.FlickSearchModule = FlickSearchModule;
})();

