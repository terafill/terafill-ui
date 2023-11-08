export const loginSuccessHook = () => {
	if (chrome)
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			function (tabs) {
				const currentTab = tabs[0];

				// Send a message to the content script
				chrome.tabs.sendMessage(currentTab.id, {
					message: "popup_script_login_trigger",
				});
				console.warn("Message sent to tab");
			}
		);
};
