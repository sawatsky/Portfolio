(function(window, document, undefined) {
	window.onhashchange = (function onhashchange() {
		var hash = !window.location.hash ? "#" : window.location.hash;

		if (hash == "#") {
			document.querySelector(".body-content").classList.remove("expanded");
		}

		if (hash == "#about-me") {
			document.querySelector(".body-content").classList.add("expanded");
		} else {
			
		}

		var a = document.querySelector(".my-content > *[location='" + hash +"']");
		toggleSelected(a.parentNode, a);
		var b = document.querySelector(".section-content > *:first-child");
		toggleSelected(b.parentNode, b);

		return onhashchange;
	})();

	document.querySelectorAll(".menu-icon, .close-icon").forEach(function(node) {
		node.onclick = function() {
			document.querySelector(".menu").classList.toggle("hidden");
		}
	});

	document.querySelectorAll(".my-content > *").forEach(function(node) {
		node.onclick = function() {
			if (!node.classList.contains("selected")) {
				toggleSelected(node.parentNode, node);

				var newLocation = node.getAttribute("location");
				window.location.hash = newLocation;
		}
		}
	});

	function toggleSelected(parent, node) {
		Array.prototype.forEach.call(parent.children, function(node) {
			node.classList.remove("selected");
		});

		if (node) {
			node.classList.add("selected");
		}
	}
})(window, document);