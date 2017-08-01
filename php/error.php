<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Name = $_POST["Name"];
    $Email = $_POST["Email"];
    $Message = $_POST["Message"];
    $Status = $_POST["Status"];
    $Error = $_POST["Error"];

    $EmailTo = "heather.sawatsky@icloud.com";
    $Subject = "An error has occured - Contact Form";
    $Body = "Status: $Status\nError: $Error\n\n<b>Data</b>\nName: <pre>$Name</pre>\nEmail: <pre>$Email</pre>\nMessage: <pre>$Message</pre>";
    $Headers = "MIME-Version: 1.0\r\nContent-type:text/html;charset=UTF-8\r\nFrom: <$$EmailTo>";

    $success = mail($EmailTo, $Subject, $Body, $Headers);
    if ($success) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }
} else {
    http_response_code(405);
}
?>