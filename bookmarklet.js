window.waiAriaView = function (stylesheetRootUrl) {

	function hideHiddenNodes(element) {

		if (window.getComputedStyle(element).display === "none" || element.getAttribute('aria-hidden') ===  "true") {
			element.style.cssText = "display:none !important;	";
		}

		for (var i = 0; i < element.children.length; i++) {
			hideHiddenNodes(element.children[i]);
		}
	}

	hideHiddenNodes(document.body);


	for (var i = 0; i < document.styleSheets.length; i++) {
		document.styleSheets[i].disabled = true;
	}


	var roles = document.createElement('link');
	roles.href = stylesheetRootUrl + 'wai-aria-roles.css';
	roles.rel = 'stylesheet';
	roles.type= 'text/css';
	document.head.appendChild(roles);

	var hoverEffects = document.createElement('link');
	hoverEffects.href = stylesheetRootUrl + 'grid-hover-effects.css';
	hoverEffects.rel = 'stylesheet';
	hoverEffects.type= 'text/css';
	document.head.appendChild(hoverEffects);

}