<?php
/*function rssParse ($url) {
    $fileContents= file_get_contents($url);
    $fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
    $fileContents = trim(str_replace('"', "'", $fileContents));
    $simpleXml = simplexml_load_string($fileContents);
    $json = json_encode($simpleXml);
    return $json;
}*/

//$objWeather = json_decode(rssParse('https://weather.gc.ca/rss/city/on-137_e.xml'));
//$objNews = json_decode(rssParse('https://www.cbc.ca/cmlink/rss-topstories'));
//$objWeather = simplexml_load_file('https://weather.gc.ca/rss/city/on-137_e.xml');
//$objNews = simplexml_load_file('https://www.cbc.ca/cmlink/rss-topstories');
//$jsonWeather = file_get_contents('https://api.darksky.net/forecast/c7329eeb25fbeb17e6b06f902ba9575a/40.7127,-74.0059?units=ca');
?>

<!DOCTYPE html>
<html>
<head>

    <script src="./js/weather.js"></script>
<link rel="stylesheet" type="text/css" href="./css/weather.css" />
</head>
<body>
<!--<?php /*print_r($objNews);*/ ?>-->
<div id="weather">
    <div id="date"><span><?php echo date('l'); ?></span><span><?php echo date('F j'); ?></span><span></span></div>
    <div id="main"><div id="city">London</div><canvas id="icon1" width="160" height="100"></canvas></div>
    <div id="tmp" ><span id="temperature"></span>&#176;</div>
    <div id="deets">
        <div>
            <div>Real Feel: <span id="realFeel"></span>&#176;</div>
            <div>Wind: <span id="wind"></span>km/h</div>
        </div>
        <div>
            <div>Press: <span id="pressure"></span>hPa</div>
            <div>Humid: <span id="humidity"></span>%</div>
        </div>
        <div>
            <div>UV Index: <span id="uv"></span></div>
            <div>Cloud: <span id="cloud"></span>%</div>
        </div>
</div>
</body>
</html>