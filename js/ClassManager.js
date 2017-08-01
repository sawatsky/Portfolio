(function(window, TypeValidator, undefined) {
    window.ClassManager = {
        toggleClass: function(node, cls) {
            if (node instanceof Node) {
                this.removeClassFromChildren(node.parentElement, cls);
                this.addClassToSelf(node, cls);
            }
        },

        addClassToSelf: function(element, cls) {
            if (element instanceof Element && TypeValidator.isNonEmptyString(cls)) {
                element.classList.add(cls);
            }
        },

        removeClassFromSelf: function(element, cls) {
            if (element instanceof Element && TypeValidator.isNonEmptyString(cls)) {
                element.classList.remove(cls);
            }
        },

        removeClassFromChildren: function(element, cls) {
            if (element instanceof Element && TypeValidator.isNonEmptyString(cls)) {
                Array.prototype.forEach.call(element.children, function(element) {
                    element.classList.remove(cls);
                });
            }
        }
    };
})(window, window.TypeValidator);