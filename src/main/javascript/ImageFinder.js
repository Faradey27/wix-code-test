(() => {
  class ImageFinder {
    search(query) {
      return {
        query: 'demo',
        images: [
          {
            id:'1',
            url:'http://image.shutterstock.com/display_pic_with_logo/347836/99127196/stock-photo-demo-icon-99127196.jpg',
            title:'demo image 1'
          },
          {
            id:'2',
            url:'http://t2.ftcdn.net/jpg/00/30/42/21/400_F_30422159_lzSKGlGNX1YcKGuIFDiEyZbmCF3hacIB.jpg',
            title:'demo image 2'
          }
        ]
      };
    }
  }

  window.classes = window.classes || {};
  window.classes.ImageFinder = ImageFinder;
})();

