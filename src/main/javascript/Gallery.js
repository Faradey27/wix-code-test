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
      this._imageFinder = imageFinder;
      this._createInterface();
      this._setFunctionality();
    }

    _createInterface() {
      this._viewNode = createNode('div', 'gallery');
      this._resultsNode = createNode('div', 'galleryItems');
      this._controlsNode = createNode('div', 'galleryControls');
      this._queryInputNode = createNode('input');
      this._searchBtnNode = createNode('button', 'search');
      this._searchBtnNode.innerText = 'Search';

      this._selectModuleNode = createNode('select');
      Object.entries(this._imageFinder.modules).forEach(([key, module])  => {
        const selectOption = createNode('option');
        selectOption.value = key;
        selectOption.innerText = module.name;
        this._selectModuleNode.appendChild(selectOption);
      });

      this._viewNode.appendChild(this._controlsNode);
      this._controlsNode.appendChild(this._queryInputNode);
      this._controlsNode.appendChild(this._searchBtnNode);
      this._controlsNode.appendChild(this._selectModuleNode);
      this._viewNode.appendChild(this._resultsNode);
    }

    _setFunctionality() {
      this._searchBtnNode.addEventListener('click', () => this._onSearchButtonClick());
    }

    _onSearchButtonClick() {
      const text = this._queryInputNode.value;
      const module = this._selectModuleNode.options[this._selectModuleNode.selectedIndex].value;

      this.doSearch(text, module);
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
      if (this._searchPromise) {
        this._searchPromise.cancel();
      }

      this._searchPromise = (() => {
        let canceled = false;

        return {
          promise: Promise.resolve(this._imageFinder.search(query, moduleId))
            .then(searchResults => {
              if (!canceled) {
                this._onSearchResultReady(searchResults);
              }
            }),
          cancel: () => canceled = true
      }
      })();
    }

    addToNode(node) {
      node.appendChild(this._viewNode);
    }
  }

  window.classes = window.classes || {};
  window.classes.Gallery = Gallery;
})();
