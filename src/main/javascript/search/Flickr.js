(() => {

    const { containsCaseInsensitive, isSomething } = window.utils;

    function parseFlickrFactory(query) {
        return ({photos, status}) => {

            // TODO: merge implementation with static
            if (!isSomething(query) || query === '') {
                return;
            }

            const toReturn = {
                query,
                images: []
            };

            const images = photos.photo || [];

            toReturn.images = images.reduce(
                (acc, {id, farm, secret, server, title}) => {
                    if (!containsCaseInsensitive(title, query)) {
                        return acc;
                    }

                    const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

                    return [
                        ...acc,
                        {
                            id,
                            url,
                            title,
                        }
                    ]

                },
                []
            );

            return toReturn;
        }

    }

    const url = 'https://api.flickr.com/services/rest/' +
        '?method=flickr.photos.getRecent' +
        '&api_key=b394136d5dde8d9d0d4f8fc6685386e2' +
        '&per_page=100' +
        '&format=json' +
        '&nojsoncallback=1';

    const { fetchData } = window.utils;

    function flickrSearchModule(query) {
        return fetchData(url)
            .then(
                res => res.json().then(parseFlickrFactory(query))
            )
    }

    window.search = window.search || {};
    window.search.flickr = flickrSearchModule;
})();

