var defaultDisplayValue = "block";
var nodeClassName = "node";
var treeListClassName = "treeList";
var leafClassName = "leaf";
var nodeTextClassName = "nodeText";


chrome.runtime.onMessage.addListener(populatePage);

// Attach behaviours to the buttons
document.getElementById("expandTree").addEventListener(
  'click', toggleWholeTree(defaultDisplayValue));
document.getElementById("collapseTree").addEventListener(
  'click', toggleWholeTree("none"));


function populatePage(pageInfo, sender, sendResponse)
{ 
  // Print depth of tree and URL of page it was harvested from
  document.getElementById('treeDepth').textContent = 
    "DOM tree of '" + pageInfo.pageURL + "' has depth " +
    String(findDepth(pageInfo.pageSkeleton));

  // Print the DOM skeleton tree which is passed in by the event page.
  var rootItem = document.createElement('LI');
  displayTreeSkeleton(pageInfo.pageSkeleton,
		      rootItem);
  document.getElementById('rootList').appendChild(rootItem);
}


// Recursive print tree function
function displayTreeSkeleton(tree, parentElt)
{
  // Fill in the text
  var textNode = document.createTextNode(tree.nodeName);
  
  if (tree.children && tree.children.length > 0)
  {
    // The list item text will expand and collapse a subtree; wrap it with
    // a span element to give tighter control of styling.
    var textWrapper = document.createElement('SPAN');
    textWrapper.appendChild(textNode);
    textWrapper.classList.add(nodeTextClassName);
    textWrapper.addEventListener('click', toggleSubTree);    
    parentElt.appendChild(textWrapper);

    parentElt.classList.add(nodeClassName);  

    // Print subtree
    var list = document.createElement('UL');
    list.classList.add(treeListClassName);
    list.style.display = "none";  // Page starts off with tree collapsed
    parentElt.appendChild(list);

    // Recurse down children sub-trees
    for (var i = 0; i < tree.children.length; i++)
    {
      var item = document.createElement('LI');
      list.appendChild(item);
      displayTreeSkeleton(tree.children[i], item);      
    }    
  }
  else
  {
    parentElt.appendChild(textNode);
    parentElt.classList.add(leafClassName);
  }
  
}
    
function toggleSubTree(event)
{
  if (!this.parentNode.childNodes[1] ||
      this.parentNode.childNodes[1].nodeName.toUpperCase() !== "UL")
  {
    console.log("Error in toggleSubTree(), assumption about tree structure is incorrect");
  }
  else if (event.eventPhase == Event.AT_TARGET // Defensive
	   && this.parentNode.childNodes[1].style)
  {
    if (this.parentNode.childNodes[1].style.display == defaultDisplayValue)
      this.parentNode.childNodes[1].style.display = "none";
    else
      this.parentNode.childNodes[1].style.display = defaultDisplayValue;

    event.stopPropagation();
  }
}

function toggleWholeTree(newDisplayValue)
{
  return function() {
    var treeItems = document.getElementsByClassName(treeListClassName);
    for (var i = 0; i < treeItems.length; i++)
      treeItems[i].style.display = newDisplayValue;
  };
}

function findDepth(tree) 
{
  var treeDepth = 0;

  if (tree.children)
  {    
    for (var i = 0; i < tree.children.length; i++)
    {
      var branchDepth = findDepth(tree.children[i]) + 1;
      if (branchDepth > treeDepth)
	treeDepth = branchDepth;
    }
  }
  
  return treeDepth;
}
