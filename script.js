(function(window, document, undefined) {
	/*
	 *	On location.hash change, modify the display of the page
	 */
	window.onhashchange = (function onhashchange() {
		var hash = !window.location.hash ? "#" : window.location.hash;

		// 'Expand' .body-content
		if (hash == "#") {
			document.querySelector(".body-content").classList.remove("expanded");
			_toggleSelected(document.querySelector(".section-content"));
		} else {
			// 'Select' .section-content
			var sectionContent = document.querySelector(".section-content > *[section='" + hash + "']");
			_toggleSelected(sectionContent.parentNode, sectionContent);

			document.querySelector(".body-content").classList.add("expanded");
		}

		// 'Select' menu item
		var menuItem = document.querySelector("menu-items > *[location='" + hash +"']");
		_toggleSelected(menuItem.parentNode, menuItem);

		return onhashchange;
	})();


	/*
	 *	On click of the .menu-icon or .close-icon, toggle menu 'expanded'
	 *	Since, on page load/refresh, the menu is always 'not expanded', toggle will start toggling from the correct state
	 */
	document.querySelectorAll(".menu-icon, .close-icon").forEach(function(node) {
		node.onclick = function() {
			document.querySelector("menu").classList.toggle("expanded");
			document.querySelector(".body-content").classList.toggle("menu-open");
		}
	});


	/*
	 *	On click of a menu item, change the location.hash
	 */
	document.querySelectorAll("menu-items > *[location]").forEach(function(node) {
		node.onclick = function() {
			window.location.hash = node.getAttribute("location");
		}
	});


	/*
	 *	Takes a parent node, unselects all the children, then selects the given child if given
	 */
	function _toggleSelected(parent, node) {
		Array.prototype.forEach.call(parent.children, function(node) {
			node.classList.remove("selected");
		});

		if (node) {
			node.classList.add("selected");
		}
	}
})(window, document);