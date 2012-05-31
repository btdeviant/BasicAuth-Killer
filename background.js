var gPendingCallbacks = [];
var bkg = chrome.extension.getBackgroundPage();

bkg.console.log("Listening");
chrome.webRequest.onAuthRequired.addListener(handleAuthRequest,
  {urls: ["<all_urls>"]}, ["asyncBlocking"]);

function processPendingCallbacks() {

  bkg.console.log("Calling back with credentials");
  var callback = gPendingCallbacks.pop();
  callback({authCredentials: {username: "<>",
                              password: "<>"}});
}

function handleAuthRequest(details, callback) {
  gPendingCallbacks.push(callback);
  processPendingCallbacks();
}