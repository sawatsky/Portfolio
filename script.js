(function(window, document, undefined) {
	/*
	 *	On location.hash change, modify the display of the page
	 */
	window.onhashchange = (function onhashchange() {
		var hash = !window.location.hash ? "#" : window.location.hash;

		// 'Expand' .body-content
		if (hash == "#") {
			document.querySelector(".body-content").classList.remove("expanded");
		} else if (hash == "#about-me") {
			document.querySelector(".body-content").classList.add("expanded");
		}

		// 'Select' menu item
		var a = document.querySelector(".my-content > *[location='" + hash +"']");
		toggleSelected(a.parentNode, a);

		// 'Select' .section-content
		var b = document.querySelector(".section-content > *:first-child");
		toggleSelected(b.parentNode, b);

		return onhashchange;
	})();


	/*
	 *	On click of the .menu-icon or .close-icon, toggle menu 'expanded'
	 *	Since, on page load/refresh, the menu is always 'not expanded', toggle will start toggling from the correct state
	 */
	document.querySelectorAll(".menu-icon, .close-icon").forEach(function(node) {
		node.onclick = function() {
			document.querySelector(".menu").classList.toggle("expanded");
		}
	});


	/*
	 *	On click on a menu item, change the location.hash or location.href
	 */
	document.querySelectorAll(".my-content > *[location]").forEach(function(node) {
		node.onclick = function() {
			if (!node.classList.contains("selected")) {
				window.location.hash = node.getAttribute("location");;
			}
		}
	});


	/*
	 *	Takes a parent node, unselects all the children, then selects the given child
	 */
	function toggleSelected(parent, node) {
		Array.prototype.forEach.call(parent.children, function(node) {
			node.classList.remove("selected");
		});

		if (node) {
			node.classList.add("selected");
		}
	}
})(window, document);