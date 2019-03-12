(() => {
    class ImageFinder {
        constructor() {
            this.knownGalerries = [];
        }

        search(query) {
            return this.searchModule.search(query);
        }

        use(gallery, moduleId) {
            let knownGallery = this.knownGalerries.find((obj) => {
                return obj.gallery === gallery;
            });

            if (!knownGallery) {
                knownGallery = {
                    gallery,
                    searchModules: []
                };
                this.knownGalerries.push(knownGallery);
            }

            let searchModule = knownGallery.searchModules.find((obj) => obj.moduleId === moduleId);
            if (!searchModule) {
                searchModule = {
                    moduleId,
                    module: window.classes.SearchModuleFactory.create(moduleId)
                };
                if (!searchModule.module) {
                    throw new Error('unknown module id');
                }
                knownGallery.searchModules.push(searchModule)
            }

            this.searchModule = searchModule.module;
            return this;
        }
    }

    window.classes = window.classes || {};
    window.classes.ImageFinder = ImageFinder;
})();

