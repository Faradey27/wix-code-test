(() => {
    class StaticSearchModule {

        search(clientMarker, query) {
            let queryResult = window.data.staticImagesData.filter(v => v.title.includes(query));

            return Promise.resolve({
                query: query,
                images: queryResult.map(v => ({
                    id: v.id,
                    url: v.url,
                    title: v.title
                }))
            });
        }
    }

    window.classes = window.classes || {};
    window.classes.StaticSearchModule = StaticSearchModule;
})();

