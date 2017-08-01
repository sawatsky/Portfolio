(function(window, document, ClassManager, undefined) {
    /*
     *  Handle window.location.hash change
     *  Allow users to type any hash in, but don't do anything if hash isn't recognized
     *  Automatically reroute empty hash to default content
     */
    window.onhashchange = (function onhashchange() {
        switch(window.location.hash) {
            case "#":
            case "": window.location.hash = getDefaultContent(); break;
            default: navigateByHash(window.location.hash);
        }

        return onhashchange;

        /*
         *  Default content is always the first child in the collection of content
         *  Protect against users deleting collection of children, or the children in collection
         */
        function getDefaultContent() {
            var firstChild = document.querySelector(".main-content > *:first-child");
            if (firstChild instanceof Element) {
                return firstChild.getAttribute("content") || window.location.hash;
            }
            return window.location.hash;
        }
        
        /*
         *  Navigate based on the hash
         *  If the hash is recognized, grab the associated element and toggle 'selected'
         */
        function navigateByHash(hash) {
            var content = document.querySelector(".main-content > [content=\"" + hash + "\"]");
            ClassManager.toggleClass(content, "selected");
        }
    })();

    /*
     *  Handle clicking the navigation links
     *  querySelectorAll returns an empty list if no elements are found,
     *      automatically protecting against users messing with the html
     *  Reroute to default content if user messed with attributes
     */
    document.querySelectorAll(".site-navigation > [content]").forEach(function(node) {
        node.onclick = function() {
            window.location.hash = node.getAttribute("content") || "";
        };
    });
})(window, document, window.ClassManager);