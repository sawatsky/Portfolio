(function(window, undefined) {
    window.TypeValidator = {
        isNonEmptyString: function(str) {
            return (typeof str === "string" || str instanceof String) && str.length > 0;
        }
    };
})(window);