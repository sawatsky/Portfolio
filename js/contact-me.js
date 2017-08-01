(function(document, ClassManager, AjaxManager, undefined) {
    var form = document.querySelector("#contact-form");
    if (form instanceof Node) {
        var submitButton = form.querySelector("[type=\"submit\"]");
        if (submitButton instanceof Node) {
            /*
             *  Handle the user submitting the form if they click the submit button or press enter on it.
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
                        case 400: // Bad data
                            try {
                                var parsedResponse = JSON.parse(response.error);
                                if (!parsedResponse["Name"] || !parsedResponse["Message"]) {
                                    // Missing name or message
                                    setMessage("Please fill out all fields.", "error");
                                } else if (!parsedResponse["Email"]) {
                                    // Missing email or email incorrectly formatted
                                    setMessage("Please provide a correctly formatted email.", "error");
                                } else {
                                    // Php said 'Bad data' but the response says all the data is valid
                                    setMessage("I honestly don't know what went wrong, but I've been notified!", "error");
                                    AjaxManager.sendErrorReport(data).then(function() {}).catch(function() {});
                                }
                            } catch(error) {
                                // Failed to parse JSON
                                var formElements = form.elements;
                                if ((formElements["Name"] instanceof Element && formElements["Name"].validity != null && !formElements["Name"].validity.valid) ||
                                    (formElements["Message"] instanceof Element && formElements["Message"].validity != null && !formElements["Message"].validity.valid)) {
                                    // Form is technically invalid. Tell them so they have a chance to fix it.
                                    setMessage("Please fill out all fields.", "error");
                                } else if (formElements["Email"] instanceof Element && formElements["Email"].validity != null && !formElements["Email"].validity.valid) {
                                    // Form is technically invalid. Tell them so they have a chance to fix it.
                                    setMessage("Please provide a correctly formatted email.", "error");
                                } else {
                                    // Form is valid...
                                    setMessage("I honestly don't know what went wrong, but I've been notified!", "error");
                                }
                                AjaxManager.sendErrorReport(data).then(function() {}).catch(function() {});
                            }
                            break;
                        case 404: // data wasn't FormData or php file not found
                            setMessage("I honestly don't know what went wrong, but I've been notified!", "error");
                            AjaxManager.sendErrorReport(data).then(function() {}).catch(function() {});
                            break;
                        case 405: // Method Not Allow - i.e. only POST allowed
                            setMessage("All right Mr. Wizard, I've been notified!", "error");
                            AjaxManager.sendErrorReport(data).then(function() {}).catch(function() {});
                            break;
                        case 500: // Email didn't send
                            setMessage("The email servers are throwing a tantrum. You'll have to do this the old-fashioned way: <a href=\"mailto:heather.sawatsky@icloud.com\">heather.sawatsky@icloud.com</a>", "error");
                            break;
                        default: // Unknown status code - HAX!!
                            setMessage("All right Mr. Wizard, I've been notified!", "error");
                            AjaxManager.sendErrorReport(data).then(function() {}).catch(function() {});
                    }
                });
            }

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
})(document, window.ClassManager, window.AjaxManager);