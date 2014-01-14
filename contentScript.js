// Structure of the DOMSkeleton tree
var DOMSkeleton = function() {
  this.nodeName = null;
  this.nodeType = null;
  this.children = null;
}


var skeleton = new DOMSkeleton();

extractDOMSkeleton(document, skeleton);

// Return the URL and skeleton to the event page
var returnObj = {pageURL: document.URL, pageSkeleton: skeleton};
returnObj;

  
function extractDOMSkeleton (node, bone) 
{
  bone.nodeName = node.nodeName;
  bone.nodeType = node.nodeType;
  if (node.hasChildNodes()) 
  {
    bone.children = new Array();
    // From https://developer.mozilla.org/en-US/docs/Web/API/Node#Examples got:
    // "for (var childNode = node.firstChild; childNode; childNode = node.nextSibling)"
    // but this doesn't seem to work -- node.nextSibling returns null instead of
    // the next node. In any case, the following loop works as expected.
    for (var i = 0; i < node.childNodes.length; i++)
    {
      var childBone = new DOMSkeleton();
      extractDOMSkeleton(node.childNodes[i], childBone);
      bone.children.push(childBone);
    }
  }
}

