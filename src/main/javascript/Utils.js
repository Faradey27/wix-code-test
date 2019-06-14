(() => {
    // TODO: Maybe enum
    // Possible cache options: default, no-store, reload, no-cache, force-cache
    function fetchData(path, cache = 'default') {
        return new Promise((resolve, reject) => {
            fetch(path, { cache: cache })
                .then((response) => response.ok ? resolve(response) : reject(response));
        });
    }


    function isSomething(value) {
        return value !== undefined && value !== null;
    }

    function containsCaseInsensitive(value, compare) {
        if (!isSomething(value) || !isSomething(compare)) {
            return false;
        }
        return value.toLowerCase().includes(compare.toLowerCase())
    }

    function incrementFactory(start) {
        let inc = start || 0;
        return () => {
            return inc++;
        }
    }

    window.utils = window.utils || {};
    window.utils.fetchData = fetchData;
    window.utils.isSomething = isSomething;
    window.utils.containsCaseInsensitive = containsCaseInsensitive;
    window.utils.incrementFactory = incrementFactory;
})();

