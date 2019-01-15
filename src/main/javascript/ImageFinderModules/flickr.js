(() => {
  window.ImageFinderModules = window.ImageFinderModules || {};

  const flickrURL = 'https://api.flickr.com/services/rest/';
  const api_key = 'b394136d5dde8d9d0d4f8fc6685386e2';

  Object.assign(window.ImageFinderModules, {
    flickr: (query) => {

      return flickerRequestJSON(
        'flickr.photos.search',
        {
          api_key,
          text: query,
          page: 1,
          // It's seems Flickr API broken for search method, because request per page don't equal response
          per_page: 200
        }
      ).then(({photos: {photo = []} = {}}) => {
        return {
          query,
          images: photo.map(data => {
            const {id, title} = data;
            return {
              id,
              url: getFlickrPhotoURL(data),
              title
            };
          }).slice(0, 100) // hack to reduce 100, because seems Flickr's API don't work properly
        };
      });

    }
  });

  function flickerRequestJSON(method, data = {}) {
    const getParams = {
      method,
      format: 'json',
      nojsoncallback: '1',
      ...data
    };

    const params = Object
      .keys(getParams)
      .reduce((acc, key) => {
        acc.push(`${key}=${getParams[key]}`);
        return acc;
      }, [])
      .join('&');

    const url = `${flickrURL}?${params}`;

    return fetch(url).then(response => response.json());
  }

  function getFlickrPhotoURL({farm, server, id, secret}) {
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  }

})
();
