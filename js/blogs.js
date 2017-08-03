(function(window, document, AjaxManager, ClassManager, undefined) {
    // TODO change url to just /blogs

    var link = document.querySelector("link[rel=\"import\"][href=\"/html/templates/blog.html\"]");
    var blogsContainer = document.querySelector(".main-content");
    if (link instanceof Node && blogsContainer instanceof Element) {
        document.addEventListener("DOMContentLoaded", function(event) {
            AjaxManager.getBlogs().then(function(response) {
                try {
                    var blogs = JSON.parse(response);
                    if (Array.isArray(blogs) && blogs.length > 0) {
                        var templateContent = link.import.querySelector("template").content;
                        var blogWrapper = templateContent.querySelector(".blog"),
                            blogTitle = blogWrapper.querySelector(".blog-title"),
                            blogImage = blogWrapper.querySelector("img"),
                            blogExcerp = blogWrapper.querySelector(".blog-excerp");
                        var featuredIndex = getFeaturedRandom(blogs.length);
                        var blogClone;

                        for (var i = 0; i < blogs.length; i++) {
                            if (i == featuredIndex) {
                                ClassManager.addClassToSelf(blogWrapper, "featured");
                            }

                            blogTitle.innerHTML = blogs[i].title;
                            blogImage.src = blogs[i].thumbnail;
                            blogExcerp.innerHTML = blogs[i].excerp;
                            blogClone = document.importNode(templateContent, true);

                            if (i == featuredIndex) {
                                blogsContainer.prepend(blogClone);                             
                                ClassManager.removeClassFromSelf(blogWrapper, "featured");
                            } else {
                                blogsContainer.appendChild(blogClone);
                            }
                        }
                    }
                } catch (error) {
                    console.log("error", error);
                    // JSON failed to parse
                    // link.import failed
                    // querySelector("template") returned null, so .content failed
                    // getting blogWrapper, blogTitle, blogImage, blogExcerp failed
                }
            }).catch(function(response) {
                console.log("error", response);
            });
        });

        function getFeaturedRandom(max) {
            return Math.floor(Math.random() * max);
        }
    }
})(window, document, window.AjaxManager, window.ClassManager);