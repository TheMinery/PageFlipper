<?php

//echo 'foo';
date_default_timezone_set('America/Toronto');

include('./CalFileParser.php');

$cal = new CalFileParser();

$arCalConference = $cal->parse('https://outlook.office365.com/owa/calendar/c5442ed2c52f432f8a848d9a8975f8d5@theminery.com/4a96e7f80425489e9df4af236e0ee9c07269803195692693419/calendar.ics');
$arCalMeeting = $cal->parse('https://outlook.office365.com/owa/calendar/159896db09b34ffb967424656bcbab59@theminery.com/141079b1c7ee4daaa6722fa1925fa95212132363614565888136/calendar.ics');
//$startingDate = strtotime('last monday', strtotime('next sunday'));
$startingDate = strtotime('yesterday');
$endingDate = strtotime('+9 days', $startingDate);
$arConference = getCurrentEvents($arCalConference, $startingDate, $endingDate);
$arMeeting = getCurrentEvents($arCalMeeting, $startingDate, $endingDate);
//$arEvents = array();
//$dateToday = strtotime('midnight');



//pr($arCal);

//$arDates = getCalDates($startingDate);
$thisDay = $startingDate;
?>
<!DOCTYPE html>
<html>
<head>
<title>WRKHUB Conference Room</title>
<meta http-equiv="refresh" content="300">
<link rel="stylesheet" type="text/css" href="./css/cfp.css" />
</head>
<body>
<!-- <?php print_r($arCalMeeting); ?> -->
<!-- <?php print_r($arMeeting); ?> -->
<section>
    <table id=tblCalendar">
        <tr>    
            <th>&#160;</th>
            <th>Conference<br />Room<br />Schedule</th>
            <th>Meeting<br />Room<br />Schedule</th>
        </tr>
        <?php for($i=0; $i<7; $i++) : ?>
        <?php $thisDay = strtotime('+1 day', $thisDay); ?>
        <?php if ((date('w', $thisDay) != 0) && (date('w', $thisDay) != 6)) : ?>
        <tr>
            <td width="30%"><div><?php echo date('l', $thisDay); ?></div><div><?php echo date('F j, Y', $thisDay); ?></div></td>
            <td width="35%"><?php echo eventsForDate($thisDay, $arConference); ?></td>
            <td width="35%"><?php echo eventsForDate($thisDay, $arMeeting); ?></td>
        </tr>
        <?php endif; ?>
        <?php endfor; ?>
    </table>
</section>
</html>

<?php


function getCurrentEvents($arCal, $startingDate, $endingDate) {
    $arEvents = array();
    foreach ($arCal as $calEvent) {
        if (($calEvent['DTSTART']->getTimestamp() > $startingDate) && ($calEvent['DTSTART']->getTimestamp() < $endingDate))  {
            array_push($arEvents, $calEvent);
        }
    }
    return $arEvents;
}

function eventsForDate($thisDate, $arEvents) {
    $out = '';
    $tomorrow = strtotime('tomorrow', $thisDate);
    foreach($arEvents as $event) {
        if (($event['DTSTART']->getTimestamp() > $thisDate) && ($event['DTSTART']->getTimestamp() < $tomorrow)) {
            //$out .= '<!-- DTSTART = ' . date('Y-m-d H:i:s', $event['DTSTART']->getTimestamp()) . ' - DTEND = ' . date('Y-m-d H:i:s', $event['DTEND']->getTimestamp()) . ' -->' . "\n";
            $out .= '<div>' . date('H:i', $event['DTSTART']->getTimestamp()) . ' - ' . date('H:i', $event['DTEND']->getTimestamp()) . '</div>' . "\n";
        }
    }
    $out = ($out == '') ? 'NOTHING<br />SCHEDULED':$out;
    return $out;
}

/*function getCalDates($startDate) {
    $arOut = array();
    $thisDate = $startDate;
    for ($i = 0; $i < 12; $i ++) {
        $thisDate = strtotime('+' . $i . ' days', $startDate);
        if ((date('D', $thisDate) != "Sat") && (date('D', $thisDate) != "Sun")) {
            array_push($arOut, $thisDate);
        }
    }
    return $arOut;
}


function getWeek($offset) {
    $thisMonday = strtotime('last monday', strtotime('next sunday'));
    $lastMonday = strtotime('last monday', $thisMonday);
    $nextMonday = strtotime('next monday', $thisMonday);
    $out = null;
    switch ($offset) {
        case -1:
            $out = $lastMonday;
            break;
        case 0:
            $out = $thisMonday;
            break;
        case 1:
            $out = $nextMonday;
            break;
    }
    return date('M j', $out) . ' - ' . date('M j', strtotime('next friday', $out));
}*/