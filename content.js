let retries = 0;
const maxRetries = 20;

function changeToLiveChat(liveChatSelector) {
	let paperButton = liveChatSelector.querySelector('tp-yt-paper-button');
	if (paperButton) {
		let foundLiveChat = false;
		let dropdownOptions = document.querySelectorAll('tp-yt-paper-item');
		
		dropdownOptions.forEach(function(item) {
			let text = item.innerText.toLowerCase();
			if (text.includes("live chat") || text.includes("czat na żywo")) {
				item.click();
				foundLiveChat = true;
			}
		});
		
		if (!foundLiveChat) {
			let dropdownOptionsBackup = document.querySelectorAll('tp-yt-paper-item[aria-selected="false"]');
			if (dropdownOptionsBackup.length > 0) {
				dropdownOptionsBackup[0].click();
				foundLiveChat = true;
			}
		}
	}
}

function checkLiveChatSelector() {
	let liveChatSelector = document.querySelector('#live-chat-view-selector-sub-menu');
	if (liveChatSelector) {
		changeToLiveChat(liveChatSelector);
	} else if (retries < maxRetries) {
		retries++;
		setTimeout(checkLiveChatSelector, 500);
	}
}

if (document.readyState === "complete" || document.readyState === "interactive") {
	checkLiveChatSelector();
} else {
	window.addEventListener("DOMContentLoaded", checkLiveChatSelector);
}