```javascript
let tabId;
let presenceStatus = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'startPresence') {
    startPresence();
  } else if (request.message === 'stopPresence') {
    stopPresence();
  } else if (request.message === 'updateSettings') {
    updateSettings(request.data);
  }
});

function startPresence() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    tabId = tabs[0].id;
    presenceStatus = true;
    chrome.runtime.sendMessage({message: 'startPresence', data: {tabId: tabId, presenceStatus: presenceStatus}});
  });
}

function stopPresence() {
  presenceStatus = false;
  chrome.runtime.sendMessage({message: 'stopPresence', data: {tabId: tabId, presenceStatus: presenceStatus}});
}

function updateSettings(data) {
  chrome.storage.sync.set({userSettings: data}, function() {
    chrome.runtime.sendMessage({message: 'updateSettings', data: data});
  });
}
```