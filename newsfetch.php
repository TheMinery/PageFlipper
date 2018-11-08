<?php
//$xml = simplexml_load_string(file_get_contents('https://www.cbc.ca/cmlink/rss-topstories'));
//echo $xml;
echo Parse('https://www.cbc.ca/cmlink/rss-topstories');

function Parse($url) {
    $fileContents= file_get_contents($url);
    $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
    $fileContents = trim(str_replace('"', "'", $fileContents));
    $simpleXml = simplexml_load_string($fileContents, 'SimpleXMLElement', LIBXML_NOCDATA);
    $json = json_encode($simpleXml);
    return $json;
}