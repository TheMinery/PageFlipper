<?php
function rssParse ($url) {
    $fileContents= file_get_contents($url);
    $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
    $fileContents = trim(str_replace('"', "'", $fileContents));
    $simpleXml = simplexml_load_string($fileContents);
    $json = json_encode($simpleXml);
    return $json;
}

?>

<!DOCTYPE html>
<html>
<head>

</head>
<body>
<?php print_r(rssParse('https://weather.gc.ca/rss/city/on-137_e.xml')); ?>
</body>