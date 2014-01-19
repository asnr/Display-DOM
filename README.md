Display DOM
-----------

A Chrome extension to print the structure of a page's DOM tree in a new tab.
More precisely, the DOM tree is traversed using the Node.childNodes property
and the nodeName is printed for every node visited.

Some elements end up being more prominent than they are in your debugger, for
example the many [whitespace #text
nodes](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Whitespace_in_the_DOM)
or a second 'html node' which represents the document type declaration.


### Install and run

1.  Clone the repository.
2.  Follow [these instructions](https://developer.chrome.com/extensions/getstarted.html#unpacked)
    A new button should appear next to the address bar.
3.  Press this button when visiting a web page.


