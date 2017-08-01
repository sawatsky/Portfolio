(function(document, AjaxManager, undefined) {
    document.addEventListener("DOMContentLoaded", function(event) {
        AjaxManager.getBlogs().then(function(response) {

        }).catch(function(response) {

        });
    });
})(document, window.AjaxManager);