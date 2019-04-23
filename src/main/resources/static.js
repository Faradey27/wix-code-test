window.modules = window.modules || {};
window.modules.static = (query) => new Promise((resolve) => {
    resolve(window.data.staticImagesData.filter(img => img.title.indexOf(query) > -1))
})
