(() => {
    const apiEndpoint = 'https://api.flickr.com/services/rest';
    const apiKey = 'b394136d5dde8d9d0d4f8fc6685386e2';

    window.searchModules = window.searchModules || {};

    window.searchModules.flickr = async query => {
        const url = new URL(apiEndpoint);

        url.search = new URLSearchParams({
            method: 'flickr.photos.search',
            text: query,
            api_key: apiKey,
            format: 'json',
            nojsoncallback: 1
        });

        const result = await fetch(url).then(response => response.json());

        return result.photos.photo.map(imageData => {
            const { id, farm, server, secret, title } = imageData;

            return {
                id,
                title,
                url: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
            };
        });
    };
})();
