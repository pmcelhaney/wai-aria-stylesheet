window.waiAriaView = function (stylesheetRootUrl) {

	function hideHiddenNodes(element) {

		if (window.getComputedStyle(element).display === "none" || element.getAttribute('aria-hidden') ===  "true") {
			element.style.cssText = "display:none !important;	";
		}

		for (var i = 0; i < element.children.length; i++) {
			hideHiddenNodes(element.children[i]);
		}
	};

	function disablePresentationElements(element) {
		var elements = document.querySelectorAll('[role=presentation]');
		while (elements.length) {
			elements[0].outerHTML = '<!--' + elements[0].nodeName + '-->' + elements[0].innerHTML + '<!--/' + elements[0].nodeName + '->';
			elements = document.querySelectorAll('[role=presentation]');
		}
	}


	window.waiAriaViewData = window.waiAriaViewData || {};

	window.waiAriaViewData.enabled = !window.waiAriaViewData.enabled;

	console.log(window.waiAriaViewData);

	if (window.waiAriaViewData.enabled) {

		window.waiAriaViewData.cachedHTML = document.body.innerHTML;

		hideHiddenNodes(document.body);

		disablePresentationElements();

		for (var i = 0; i < document.styleSheets.length; i++) {
			document.styleSheets[i].disabled = true;
		}

		var roles = document.createElement('link');
		roles.href = stylesheetRootUrl + 'wai-aria-roles.css';
		roles.rel = 'stylesheet';
		roles.type= 'text/css';
		document.head.appendChild(roles);
		window.waiAriaViewData.roles = roles;

		var hoverEffects = document.createElement('link');
		hoverEffects.href = stylesheetRootUrl + 'grid-hover-effects.css';
		hoverEffects.rel = 'stylesheet';
		hoverEffects.type= 'text/css';
		document.head.appendChild(hoverEffects);

		window.waiAriaViewData.hoverEffects = hoverEffects;
	} else {

		document.body.innerHTML = window.waiAriaViewData.cachedHTML;

		for (var i = 0; i < document.styleSheets.length; i++) {
			document.styleSheets[i].disabled = false;
		}
	}



}