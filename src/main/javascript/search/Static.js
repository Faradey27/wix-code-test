(() => {
    const { containsCaseInsensitive, isSomething } = window.utils;

    function staticSearchModule(query) {
        const toReturn = {
            query,
            images: []
        };

        if (!isSomething(query) || query === '') {
            return;
        }

        const images = window.data.staticImagesData || [];

        toReturn.images = images.reduce(
            (acc, {id, url, title}) => {
                if (!containsCaseInsensitive(title, query)) {
                    return acc;
                }

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



    window.search = window.search || {};
    window.search.static = staticSearchModule;
})();

