<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (!empty($_SERVER["PATH_INFO"])) {
        $pathbits = explode("/", $_SERVER["PATH_INFO"]);
        if (count($pathbits) == 0) {
            // shouldn't be possible, but fetch all blogs
        } else if (count($pathbuts) > 1) {
            // unknown number of parameters, do nothing
        } else {
            if (ctype_digit($pathbits[0])) {
                // found ID, fetch that ID
            } else {
                // unknown parameter, do nothing
            }
        }
    } else {
        // fetch all blogs
    }
    $path = $_SERVER["PATH_INFO"];
    //if path contains ID - only fetch ID
    // else fetch all
} else {
    http_response_code(405);
}
?>