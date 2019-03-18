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
      this._querySelectNode = createNode('select');
      
      let optionFlickr = createNode('option');
      optionFlickr.value = 'flickr';
      optionFlickr.text = 'flickr';
      this._querySelectNode.appendChild(optionFlickr);

      let optionStatic = createNode('option');
      optionStatic.value = 'static';
      optionStatic.text = 'static';
      this._querySelectNode.appendChild(optionStatic);

      this._searchBtnNode = createNode('button', 'search');
      this._searchBtnNode.innerText = 'Search';

      this._viewNode.appendChild(this._controlsNode);
      this._controlsNode.appendChild(this._queryInputNode);
      this._controlsNode.appendChild(this._querySelectNode);
      this._controlsNode.appendChild(this._searchBtnNode);
      this._viewNode.appendChild(this._resultsNode);
    }

    _setFunctionality() {
      this._searchBtnNode.addEventListener('click', () => this._onSearchButtonClick());
    }

    _onSearchButtonClick() {
      this.doSearch(this._queryInputNode.value, this._querySelectNode.value);
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

    async doSearch(query, moduleId) {
      const result = await this._imageFinder.search(query, moduleId);
      return this._onSearchResultReady(result);
    }

    addToNode(node) {
      node.appendChild(this._viewNode);
    }
  }

  window.classes = window.classes || {};
  window.classes.Gallery = Gallery;
})();
