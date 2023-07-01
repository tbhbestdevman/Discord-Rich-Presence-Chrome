```javascript
let userSettings = {};

function startPresence() {
  chrome.runtime.sendMessage({ message: 'startPresence' });
}

function stopPresence() {
  chrome.runtime.sendMessage({ message: 'stopPresence' });
}

function updateSettings() {
  chrome.storage.sync.set({ userSettings }, function() {
    console.log('Settings are saved');
  });
}

document.getElementById('startButton').addEventListener('click', startPresence);
document.getElementById('stopButton').addEventListener('click', stopPresence);

chrome.storage.sync.get(['userSettings'], function(result) {
  if (result.userSettings) {
    userSettings = result.userSettings;
  }
});

window.addEventListener('unload', updateSettings);
```