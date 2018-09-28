(() => {
  class FlickrModule {
    constructor(apiKey, apiUrl = 'https://api.flickr.com/services/rest/') {
      this._apiKey = apiKey;
      this._apiUrl = apiUrl;
    }

    get name() {
      return 'Flickr';
    }

    search(query) {
      return this._makeRequest(
        'flickr.photos.search',
        {
          text: query,
          perpage: 100,
          extras: 'url_q'
        }
      )
        .then(result => result.photos.photo)
        .then(list => ({
          query,
          images: list.map(({id, title, url_q}) => ({id, title, url: url_q}))
        }))

    }

    _makeRequest(method, params) {
      const query = new URLSearchParams({
        ...params,
        method,
        api_key: this._apiKey,
        format: 'json'
      });

      const url = this._apiUrl + '?' + query.toString();

      return loadJSONP(url, 'jsonFlickrApi').then(response => {
        if (response.stat !== 'ok') {
          throw response;
        }

        return response;
      });
    }
  }

  window.classes = window.classes || {};
  window.classes.FlickrModule = FlickrModule;

  function loadJSONP(src, callbackName, ttl = 100) {
    if (typeof window[callbackName] !== 'undefined') {
      return new Promise((resolve, reject) => {
        if (ttl <= 0) {
          reject(new Error('Callback "window.' + callbackName+ '" busy too long'))
        } else {
          setTimeout(() => resolve(loadJSONP(src, callbackName, ttl - 1)), 100)
        }
      })
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;

      window[callbackName] = response => {
        delete window[callbackName];
        return resolve(response);
      };

      script.addEventListener('error', (...args) => {
        delete window[callbackName];
        reject(...args)
      });

      document.body.appendChild(script);
    })
  }


})();

