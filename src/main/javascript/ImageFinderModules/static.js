(() => {
  window.ImageFinderModules = window.ImageFinderModules || {};

  const array = window.data.staticImagesData;

  Object.assign(window.ImageFinderModules, {
    static: (query) => {
      return {
        query,
        images: array.reduce((acc, {id, url, title}) => {
          if (title.indexOf(query) !== -1) {
            acc.push({id, url, title});
          }
          return acc;
        }, [])
      };
    }
  });
})();
