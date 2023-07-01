```javascript
let tabId;
let presenceStatus = false;
let userSettings = {
  startAutomatically: false,
  showNotifications: true,
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ userSettings });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'startPresence') {
    startPresence();
    sendResponse({ status: 'Presence started' });
  } else if (request.message === 'stopPresence') {
    stopPresence();
    sendResponse({ status: 'Presence stopped' });
  } else if (request.message === 'updateSettings') {
    userSettings = request.settings;
    chrome.storage.sync.set({ userSettings });
    sendResponse({ status: 'Settings updated' });
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  tabId = activeInfo.tabId;
});

function startPresence() {
  presenceStatus = true;
  // Implement Discord rich presence start logic here
}

function stopPresence() {
  presenceStatus = false;
  // Implement Discord rich presence stop logic here
}

function updateSettings(newSettings) {
  userSettings = newSettings;
  chrome.storage.sync.set({ userSettings });
}
```