<?php

// enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// collect results via nodeJS polling
$cmd = "node ./poll.js";
$output = shell_exec($cmd);

// print to document
echo "<pre>" . $output . "</pre>";
exit; 

?>
