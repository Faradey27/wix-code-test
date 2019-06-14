(() => {
    class ImageFinder {
        search(query, moduleId) {
            const { search: searchModules } = window;
            const { isSomething } = window.utils;
            
            if (!isSomething(searchModules[moduleId])) {
                throw new Error(`There is no search module with module id: ${moduleId}`)
            }

            const result = searchModules[moduleId](query);
            
            return Promise.resolve(result);
        }
    }

    window.classes = window.classes || {};
    window.classes.ImageFinder = ImageFinder;
})();

