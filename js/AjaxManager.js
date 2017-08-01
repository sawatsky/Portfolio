(function(window, XMLHttpRequest, undefined) {
    window.AjaxManager = {
        contactMe: function(data) {
            if (data instanceof FormData) {
                return new Promise(function(resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (this.readyState == 4) {
                            if (this.status == 200) {
                                resolve();
                            } else {
                                reject({ status: this.status, error: this.responseText });
                            }
                        }
                    };
                    xhr.open("POST", "/php/contact-me.php", true);
                    xhr.send(data);
                });
            }
            return Promise.reject({ status: 400, error: "FormData required." });
        },
        sendErrorReport: function(data) {
            if (data instanceof FormData) {
                return new Promise(function(resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (this.readyState == 4) {
                            if (this.status = 200) {
                                resolve();
                            } else {
                                reject(this.status);
                            }
                        }
                    };
                    xhr.open("POST", "/php/error.php", true);
                    xhr.send(data);
                });
            }
            return Promise.reject({ status: 400, error: "FormData required." });
        },
        getBlogs: function() {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        if (this.status = 200) {
                            resolve();
                        } else {
                            reject(this.status);
                        }
                    }
                };
                xhr.open("POST", "/php/error.php", true);
                xhr.send(data);
            });
        },
        getBlog: function(id) {

        }
    };
})(window, window.XMLHttpRequest);