(() => {
  const createNode = (tagName, className) => {
    const node = document.createElement(tagName);

    if (className) {
      node.classList.add(className);
    }

    return node;
  };


  class Gallery {
    module = 'static';

    constructor(imageFinder, id) {
      this._imageFinder = imageFinder;
      this._id = Gallery.staticId++;
      console.log(this._id);
      this._createInterface();
      this._setFunctionality();
      this._registerSearchModules();
    }

    _createInterface() {
      this._viewNode = createNode('div', 'gallery');
      this._resultsNode = createNode('div', 'galleryItems');
      this._controlsNode = createNode('div', 'galleryControls');
      this._queryInputNode = createNode('input');
      this._searchBtnNode = createNode('button', 'search');
      this._searchBtnNode.innerText = 'Search';


      this._dropdown = createNode('select', 'dropdown');
      const modules = ['static', 'flickr'];

      for (let i = 0; i < modules.length; i++) {
        var option = document.createElement('option');
        option.value = modules[i];
        option.text = modules[i];
        this._dropdown.appendChild(option);
      }


      this._viewNode.appendChild(this._controlsNode);
      this._controlsNode.appendChild(this._queryInputNode);
      this._controlsNode.appendChild(this._searchBtnNode);
      this._controlsNode.appendChild(this._dropdown);

      this._viewNode.appendChild(this._resultsNode);
    }

    _setFunctionality() {
      this._searchBtnNode.addEventListener('click', () => this._onSearchButtonClick());
      this._dropdown.addEventListener('change', (e) => this._onSearchModuleChange(e.target.value));
    }

    _registerSearchModules() {
      this._imageFinder.registerModule(new window.classes.StaticModule());
      this._imageFinder.registerModule(new window.classes.FlickrModule());
    }

    _onSearchButtonClick() {
      this.doSearch(this._queryInputNode.value, this.module);
    };

    _onSearchModuleChange(module) {
      this.module = module;
      this.doSearch(this._queryInputNode.value, this.module);
    };

    _onSearchResultReady({ images }) {
      this._resultsNode.innerHTML = '';
      const fragmentWithResults = images.reduce((fragment, image) => {
        const imgNode = createNode('img');
        imgNode.setAttribute('src', image.url);
        fragment.appendChild(imgNode);
        return fragment;
      }, document.createDocumentFragment());

      this._resultsNode.appendChild(fragmentWithResults);
    }

    doSearch(query, moduleId) {
      this._imageFinder.search(query, moduleId, this._id, (results) => {
        const searchResults = results;
        this._onSearchResultReady(searchResults);
      });
    }

    addToNode(node) {
      node.appendChild(this._viewNode);
    }
  }

  Gallery.staticId = 0;

  window.classes = window.classes || {};
  window.classes.Gallery = Gallery;
})();
