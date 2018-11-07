<?php

//$objWeather = json_decode(rssParse('https://weather.gc.ca/rss/city/on-137_e.xml'));
//$objNews = json_decode(rssParse('https://www.cbc.ca/cmlink/rss-topstories'));
$objNews = simplexml_load_file('https://www.cbc.ca/cmlink/rss-topstories');
?>

<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="./css/weather.css" />
<script src="/js/news.js" />
</head>
<body>
<!--<?php /*print_r($objNews);*/ ?>-->
<section>
    <?php for ($i=0; $i<count($objNews->channel->item); $i++) : ?>
    <div><?php echo $objNews->channel->item[$i]->title; ?></div>
    <?php endfor; ?>
</section>
</body>
</html>