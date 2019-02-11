(() => {
    window.searchModules = window.searchModules || {};

    window.searchModules.static = async query => {
        return window.data.staticImagesData
            .filter(imageData => {
                return imageData.title.includes(query);
            }).map(({ id, url, title }) => {
                return { id, url, title };
            });
    };
})();
