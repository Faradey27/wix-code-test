window.modules = window.modules || {};
(() => {  
    const scope = {};

    window.modules.flickr = async (query, id) => {
        if (!scope[id]) {
            scope[id] = {};
        }

        return new Promise(resolve => {
            if (scope[id].signal) {
                scope[id].controller.abort();
            }

            scope[id].controller = new AbortController();
            scope[id].signal = scope[id].controller.signal;
            
            fetch(`https://api.flickr.com/services/rest/?q=${query}&api_key=b394136d5dde8d9d0d4f8fc6685386e2&method=flickr.photos.getRecent&format=json&nojsoncallback=1`, { signal: scope[id].signal })
                    .then(response => response.json())
                    .then((json) => {            
                        resolve(json.photos.photo);
                    }).catch(() => {})
        });
    }

})()