// background.js


/**
 * 复制文本
 * 参考：[bumble-org/clipboard: Use the clipboard with ease in Chrome extensions.](https://github.com/bumble-org/clipboard)
 * @param {*} str 
 */
function copyText(str) {
	// Create hidden input with text
	const el = document.createElement('textarea');
	el.value = str;
	document.body.append(el);

	// Select the text and copy to clipboard
	el.select();
	const success = document.execCommand('copy');
	el.remove();

	return success ?
		Promise.resolve(str) :
		Promise.reject(new Error('Unable to write to clipboard'));
}

/**
 * 显示提示框
 * @param {*} str 
 * @param {*} title 
 */
function msgbox(str, title) {
	chrome.notifications.create(null, {
		type: 'basic',
		iconUrl: 'img/icon.png',
		title: title || 'Info',
		message: str
	});
}

/**
 * 拼接markdown链接文本
 * tab属性见：[chrome.tabs - Google Chrome](https://developer.chrome.com/extensions/tabs#type-Tab)
 * @param {*} tab 
 */
function extractLink(tab) {
	let title = tab.title;
	let url = tab.url;

	return  `[${title}](${url})`;
}

chrome.contextMenus.create({
	title: "Copy MarkDown Link",
	onclick: function () {
		chrome.tabs.getSelected(function (tab) {
				console.dir(tab);
				// chrome.tabs.sendRequest(tab.id,jsonData, callBack);
				copyText(extractLink(tab))
					.then( () => msgbox('Copy Success!'));
			})
		}
	});

	