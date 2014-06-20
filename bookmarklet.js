window.waiAriaView = function (stylesheetRootUrl) {

	function hideHiddenNodes(element) {

		if (window.getComputedStyle(element).display === "none" || element.getAttribute('aria-hidden') ===  "true") {
			element.style.cssText = "display:none !important;	";
		}

		for (var i = 0; i < element.children.length; i++) {
			hideHiddenNodes(element.children[i]);
		}
	}


	function removePresentationNodes() {
		var elements = document.querySelectorAll('[role=presentation],div:not([role]),span:not([role])');
		for (var i=0; i < elements.length; i++) {
			var el = elements[i];
			var childNodes = el.childNodes;
			var childNodesClone = [];
			for (var j=childNodes.length-1; j >= 0; j--) {
				childNodesClone[j] = childNodes[j];
			}
			for (var j=0; j < childNodesClone.length; j++) {
				el.parentNode.insertBefore(childNodesClone[j], el);
			}

			el.parentNode.removeChild(el);
		}
	};

	function resolveLabelForElement(el) {
		var labelTag;
		var labelledById;

		if ((labelledById = el.getAttribute('aria-labelledby')) && (labelTag = document.getElementById(labelledById)) ) {
			return labelTag.innerText;
		}

		if (el.getAttribute('aria-label')) {
			return	el.getAttribute('aria-label');
		}

		if (el.id && (labelTag = document.querySelector('label[for="' + el.id + '"]')) ) {
			return labelTag.innerText;
		}

		return  el.getAttribute('alt') || el.getAttribute('title');
	};

	function matchInputsWithLabels() {
		var inputs = document.querySelectorAll('input,select,textarea');
		for (var i=0; i < inputs.length; i++) {
			var el = inputs[i];
			var wrapper = document.createElement('div');
			var label = document.createElement('span');
			label.setAttribute('aria-hidden', 'true');
			label.innerText = resolveLabelForElement(el);
			el.parentNode.insertBefore(wrapper, el);
			wrapper.appendChild(label)
			wrapper.appendChild(el);
		}
	};


	function replaceImagesWithText() {
		var imgs = document.querySelectorAll('img');
		for (var i=0; i < imgs.length; i++) {
			var el = imgs[i];
			var label = document.createElement('span');
			label.setAttribute('aria-hidden', 'true');
			label.setAttribute('data-aria-view', 'Alternative text for an img tag');
			label.innerText = resolveLabelForElement(el);
			el.parentNode.insertBefore(label, el);
		}
	};

	window.waiAriaViewData = window.waiAriaViewData || {};

	window.waiAriaViewData.enabled = !window.waiAriaViewData.enabled;

	console.log(window.waiAriaViewData);

	if (window.waiAriaViewData.enabled) {
		window.waiAriaViewData.cachedHTML = document.body.innerHTML;

		hideHiddenNodes(document.body);


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
		removePresentationNodes();
		matchInputsWithLabels();
		replaceImagesWithText();

	} else {
		document.body.innerHTML = window.waiAriaViewData.cachedHTML;

		for (var i = 0; i < document.styleSheets.length; i++) {
			document.styleSheets[i].disabled = false;
		}

		document.head.removeChild(window.waiAriaViewData.roles);
		document.head.removeChild(window.waiAriaViewData.hoverEffects);

	}


};