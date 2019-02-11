(() => {
  const createNode = (tagName, className) => {
    const node = document.createElement(tagName);

    if (className) {
      node.classList.add(className);
    }

    return node;
  };

  const createSearchModulePicker = moduleIds => {
    const selectNode = createNode('select');

    for (const id of moduleIds) {
      const option = createNode('option');
      option.value = id;
      option.text = id;
      selectNode.appendChild(option);
    }

    return selectNode;
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
      this._searchModulePicker = createSearchModulePicker(this._imageFinder.getSearchModuleIds());

      this._viewNode.appendChild(this._controlsNode);
      this._controlsNode.appendChild(this._searchModulePicker);
      this._controlsNode.appendChild(this._queryInputNode);
      this._controlsNode.appendChild(this._searchBtnNode);
      this._viewNode.appendChild(this._resultsNode);
    }

    _setFunctionality() {
      this._searchBtnNode.addEventListener('click', () => this._onSearchButtonClick());
    }

    _onSearchButtonClick() {
      this.doSearch(this._queryInputNode.value, this._searchModulePicker.value);
    };

    _onSearchResultReady = ({ images }) => {
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
      if (this._searchPending) {
        // Cancel previous search
        this._searchPending.cancel();
      }

      this._searchPending = createCancellablePromise(this._imageFinder.search(query, moduleId));

      this._searchPending.then(result => {
        this._searchPending = undefined;
        this._onSearchResultReady(result);
      });
    }

    addToNode(node) {
      node.appendChild(this._viewNode);
    }
  }

  window.classes = window.classes || {};
  window.classes.Gallery = Gallery;
})();

const createCancellablePromise = promise => {
  let isCancelled = false;

  const wrap = new Promise((resolve, reject) => {
    promise.then(value => {
      if (!isCancelled) {
        resolve(value);
      }
    });

    promise.catch(reject);
  });

  wrap.cancel = () => {
    isCancelled = true;
  };

  return wrap;
}
