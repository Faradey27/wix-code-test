*BONUS* - Init an empty git repository, perform initial commit with what you've received from us and make your own commit(s).

1 Refactor or extend ImageFinder.search() so it will return results from window.data.staticImagesData (use the query on the title field).

The returned results should be in the following format:

```
{
    query: 'veg',
    images: [
        {
            id: '#######',
            url: 'http://image.url',
            title: 'image title'
        }
    ]
}
```

----------------------------------------------

2 Change your ImageFinder implementation so that it will have a way of adding search modules (all modules should return results in the same format).

2.1 Move your base search functionality of window.data.staticImagesData into its own module - name it 'static'.

2.2 ImageFinder should throw an error for unknown modules.

2.3 Refactor or extend Gallery.doSearch() to use your new ImageFinder implementation - it should now accept query and module id:

```
gallery.doSearch(query, moduleId)
```

----------------------------------------------

3 Add a flickr search module to the system using the following credentials:

Flickr api_key: `b394136d5dde8d9d0d4f8fc6685386e2`

3.1 (bonus) Add a drop down menu in gallery to select a search module (static / flickr).

----------------------------------------------

4 Now that search() return results asynchronously, it might cause unwanted old results to be returned before or even AFTER newer queries.
change the search() so that it will cancel old searches if a newer query was passes.

----------------------------------------------

5 Add functionality to your search() so that it will be able to accept requests from multiple galleries and "know" how to return results to the right gallery.
