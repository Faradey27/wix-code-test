(() => {
  const createNode = (tagName, className) => {
    const node = document.createElement(tagName);

    if (className) {
      node.classList.add(className);
    }

    return node;
  };

  class Gallery {
    constructor(imageFinder) {
      this._requestNames = {};
      this._options = [];
      this._imageFinder = imageFinder;
      this._createInterface();
      this._setFunctionality();
    }

    _createInterface() {
      this._viewNode = createNode('div', 'gallery');
      this._resultsNode = createNode('div', 'galleryItems');
      this._controlsNode = createNode('div', 'galleryControls');
      this._queryInputNode = createNode('input');
      this._selectModuleNode = createNode('select');
      this._searchBtnNode = createNode('button', 'search');
      this._searchBtnNode.innerText = 'Search';

      this._viewNode.appendChild(this._controlsNode);
      this._controlsNode.appendChild(this._queryInputNode);
      this._controlsNode.appendChild(this._selectModuleNode);
      this._controlsNode.appendChild(this._searchBtnNode);
      this._viewNode.appendChild(this._resultsNode);
    }

    _setFunctionality() {
      this._searchBtnNode.addEventListener('click', () => this._onSearchButtonClick());
      const selectNode = this._selectModuleNode;
      Object.keys(window.ImageFinderModules).forEach(key => {
        const option = createNode('option');
        option.innerText = key;
        selectNode.appendChild(option);
        this._options.push(key);
      })
    }

    _onSearchButtonClick() {
      this.doSearch(this._queryInputNode.value, this._options[this._selectModuleNode.selectedIndex]);
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

    doSearch(query, module) {
      this._requestNames[module] = this._requestNames[module] || 0;
      const requestId = ++this._requestNames[module];

      this._imageFinder
        .search(query, module)
        .then((...args) => {
          if (requestId === this._requestNames[module]) {
            this._onSearchResultReady(...args)
          }
        });
    }

    addToNode(node) {
      node.appendChild(this._viewNode);
    }
  }

  window.classes = window.classes || {};
  window.classes.Gallery = Gallery;
})();
