(function(window, document, undefined) {
	var _bodyContent = document.querySelector(".body-content"),
		_sectionContent = document.querySelector(".body-content .section-content"),
		_menu = document.querySelector("menu");

	/*
	 *	On location.hash change, modify the display of the page
	 */
	window.onhashchange = (function onhashchange() {
		var hash = !window.location.hash ? "#" : window.location.hash;

		// 'Expand' .body-content
		if (hash == "#") {
			_bodyContent.classList.remove("expanded");
			_toggleClass(_sectionContent, null, "selected");
			_toggleClass(_sectionContent, null, "last-selected");
		} else {
			// 'Last Select' .section-content
			var lastSelected = _sectionContent.querySelector("*.selected");
			if (lastSelected) {
				_toggleClass(lastSelected.parentNode, lastSelected, "last-selected");
			}
			
			// 'Select' .section-content
			var selection = _sectionContent.querySelector("*[section='" + hash + "']");
			_toggleClass(selection.parentNode, selection, "selected");

			_bodyContent.classList.add("expanded");
		}

		// 'Select' menu item
		var menuItem = _menu.querySelector("menu-items > *[location='" + hash +"']");
		_toggleClass(menuItem.parentNode, menuItem, "selected");

		return onhashchange;
	})();


	/*
	 *	On click of the menu-icon, toggle menu 'expanded'
	 *	Since, on page load/refresh, the menu is always 'not expanded', toggle will start toggling from the correct state
	 */
	_menu.querySelectorAll("menu-icon").forEach(function(node) {
		node.onclick = function() {
			_menu.classList.toggle("expanded");
			_bodyContent.classList.toggle("menu-open");
		}
	});


	/*
	 *	On click of a menu item, change the location.hash
	 */
	_menu.querySelectorAll("menu-items > *[location]").forEach(function(node) {
		node.onclick = function() {
			window.location.hash = node.getAttribute("location");
		}
	});


	/*
	 *	Takes a parent node, unselects all the children, then selects the given child if given
	 */
	function _toggleClass(parent, node, cls) {
		if (parent instanceof Element) {
			Array.prototype.forEach.call(parent.children, function(node) {
				node.classList.remove(cls);
			});
		}

		if (node instanceof Element) {
			node.classList.add(cls);
		}
	}
})(window, document);