<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Name = trim(str_replace(array("\r", "\n"), array(" ", " "), strip_tags(stripslashes($_POST["Name"]))));
    $EmailFrom = filter_var(trim($_POST["Email"]), FILTER_SANITIZE_EMAIL);
    $Message = wordwrap(str_replace("\n.", "\n..", strip_tags(stripslashes(trim($_POST["Message"])))), 70);
    
    $ValidName = !empty($Name);
    $ValidEmailFrom = !!filter_var($EmailFrom, FILTER_VALIDATE_EMAIL);
    $ValidMessage = !empty($Message);
    
    if ($ValidName && $ValidEmailFrom && $ValidMessage) {
        $EmailTo = "heather.sawatsky@icloud.com";
        $Subject = "$Name sent you a message.";
        $Body = "From: $Name <$EmailFrom>\n\n$Message\n";
        $Headers = "MIME-Version: 1.0\r\nContent-type:text/html;charset=UTF-8\r\nFrom: <$EmailFrom>";

        $success = mail($EmailTo, $Subject, $Body, $Headers);
        if ($success) {
            http_response_code(200);
        } else {
            http_response_code(500);
        }
    } else {
        http_response_code(400);
        echo "{\"Name\":\"$ValidName\",\"Email\":\"$ValidEmailFrom\",\"Message\":\"$ValidMessage\"}";
    }
} else {
    http_response_code(405);
}
?>