(() => {
    class ImageFinder {

        constructor(modules) {
            this._modules = modules || {};
        }

        getModules() {
            return this._modules;
        }

        register(moduleId, moduleInstance) {
            this._modules[moduleId] = moduleInstance;
        }

        search(clientMarker, query, moduleId) {
            if (!this._modules[moduleId]) throw new Error("requested module `" + moduleId + "` not found");
            return this._modules[moduleId].search(clientMarker, query);
        }
    }

    window.classes = window.classes || {};
    window.classes.ImageFinder = ImageFinder;
})();

