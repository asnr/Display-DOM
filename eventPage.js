chrome.browserAction.onClicked.addListener(
  // Inject content script to harvest DOMSkeleton, then pass it onto a
  // new tab to be printed
  function(tab) 
  {
    chrome.tabs.executeScript(tab.id, 
			      {file: "contentScript.js"}, 
			      createTabAndPassSkeleton);
  }
);


// retArr[0] contains the URL and DOMSkeleton of the harvesting page
function createTabAndPassSkeleton(retArr) 
{    
  // Create a new tab and pass it the DOM skeleton that was harvested by the 
  // content script. The new tab will take responsibility for printing it.
  chrome.tabs.create({url: chrome.extension.getURL("blankpage.html")}, 
		     passDOMSkeleton);

  function passDOMSkeleton(tab)
  {  
    chrome.tabs.sendMessage(tab.id, retArr[0]);
  }
}
