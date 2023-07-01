```javascript
let tabId;
let presenceStatus;
let userSettings;

document.getElementById('startButton').addEventListener('click', startPresence);
document.getElementById('stopButton').addEventListener('click', stopPresence);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'updateSettings') {
    userSettings = request.data;
    updateSettings();
  }
});

function startPresence() {
  chrome.runtime.sendMessage({message: 'startPresence', data: {tabId: tabId}}, (response) => {
    presenceStatus = response.data;
    updateStatusDisplay();
  });
}

function stopPresence() {
  chrome.runtime.sendMessage({message: 'stopPresence', data: {tabId: tabId}}, (response) => {
    presenceStatus = response.data;
    updateStatusDisplay();
  });
}

function updateSettings() {
  document.getElementById('statusDisplay').innerText = userSettings.status;
}

function updateStatusDisplay() {
  document.getElementById('statusDisplay').innerText = presenceStatus;
}

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  tabId = tabs[0].id;
  chrome.runtime.sendMessage({message: 'getPresenceStatus', data: {tabId: tabId}}, (response) => {
    presenceStatus = response.data;
    updateStatusDisplay();
  });
});
```