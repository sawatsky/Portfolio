(function(window, document, ClassManager, AjaxManager, undefined) {
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

    /*
     *  Handle the Contact Form functionality
     *  The user can press the submit button at any time, which will send the form's data to the php
     *      where it will be verified. If valid data, an email is sent. Otherwise, an error is thrown
     *      and control returns back to the user where they must correct the issue.
     * 
     *  200: Data was valid and email sent.
     *  400: The data was invalid. Either the data wasn't of type FormData, the Name, Email, or Message
     *          was missing, or the email was malformed.
     *  404: File Not Found. The php file wasn't found.
     *  405: Method Not Allowed. Only POST is allowed. Somehow another method was sent to the php file.
     *  500: Mail server error. The data was valid, but the email failed to send. Nothing I can do.
     */
    var form = document.querySelector("#contact-form");
    if (form instanceof Node) {
        var submitButton = form.querySelector("[type=\"submit\"]");
        if (submitButton instanceof Node) {
            /*
             *  The user can click the submit button or can press enter key.
             */
            submitButton.onclick = function(event) {
                event.preventDefault();
                handleSubmit();
            };
            submitButton.onkeypress = function(event) {
                event.preventDefault();

                if (event.keyCode == '13' || event.which == '13') {
                    handleSubmit();
                }
            };

            /*
             *  Send the form data to the php, where it is verified. Parse the response and notify the user
             *      based on the response. Send myself reports about programmer errors.
             */
            function handleSubmit() {
                var data = new FormData(form);
                AjaxManager.contactMe(data).then(function() {
                    // 200

                    form.reset();
                    setMessage("Message sent!", "success");
                }).catch(function(response) {
                    data.append("Status", response.status);
                    data.append("Error", response.error);

                    // 400, 404, 405, 500
                    switch(response.status) {
                        case 400:
                            /*
                             *  Missing/malformed data
                             *  If the JSON parses, check which fields have errors and tell the user.
                             *  If the JSON fails to parse, manually check if the form is valid. If the form
                             *      is invalid, tell the user to give them a chance to fix it. Send a report
                             *      to myself.
                             */
                            try {
                                var parsedResponse = JSON.parse(response.error);
                                if (!parsedResponse["Name"] || !parsedResponse["Message"]) {
                                    setMessage("Please fill out all fields.", "error");
                                } else if (!parsedResponse["Email"]) {
                                    setMessage("Please provide a correctly formatted email.", "error");
                                } else {
                                    setMessage("I honestly don't know what went wrong, but I've been notified!", "error");
                                    AjaxManager.sendErrorReport(data).then(function() {}).catch(function() {});
                                }
                            } catch(error) {
                                // Failed to parse JSON
                                var formElements = form.elements;
                                if ((formElements["Name"] instanceof Element && formElements["Name"].validity != null && !formElements["Name"].validity.valid) ||
                                    (formElements["Message"] instanceof Element && formElements["Message"].validity != null && !formElements["Message"].validity.valid)) {
                                    setMessage("Please fill out all fields.", "error");
                                } else if (formElements["Email"] instanceof Element && formElements["Email"].validity != null && !formElements["Email"].validity.valid) {
                                    setMessage("Please provide a correctly formatted email.", "error");
                                } else {
                                    setMessage("I honestly don't know what went wrong, but I've been notified!", "error");
                                }
                                AjaxManager.sendErrorReport(data).then(function() {}).catch(function() {});
                            }
                            break;
                        case 404:
                            setMessage("I honestly don't know what went wrong, but I've been notified!", "error");
                            AjaxManager.sendErrorReport(data).then(function() {}).catch(function() {});
                            break;
                        case 405:
                            setMessage("All right Mr. Wizard, I've been notified!", "error");
                            AjaxManager.sendErrorReport(data).then(function() {}).catch(function() {});
                            break;
                        case 500:
                            setMessage("The email servers are throwing a tantrum. You'll have to do this the old-fashioned way: <a href=\"mailto:heather.sawatsky@icloud.com\">heather.sawatsky@icloud.com</a>", "error");
                            break;
                        default: // Unknown status code - HAX!!
                            setMessage("All right Mr. Wizard, I've been notified!", "error");
                            AjaxManager.sendErrorReport(data).then(function() {}).catch(function() {});
                    }
                });
            }

            /*
             *  Notifies the user of the status of their POST request by setting some html text
             */
            var messageElement = form.querySelector(".contact-form-message");
            function setMessage(message, cls) {
                if (messageElement instanceof Element) {
                    messageElement.innerHTML = message;
                    ClassManager.addClassToSelf(messageElement, cls);
                    window.setTimeout(function() {
                        ClassManager.removeClassFromSelf(messageElement, cls);
                        messageElement.innerHTML = "";
                    }, 3000);
                }
            }
        }
    }
})(window, document, window.ClassManager, window.AjaxManager);