<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Piano-Keyboard-Simulator</title>
    <link rel="stylesheet" type="text/css" href="./assets/css/piano_styles.css?v=1.0">
    <script src="./assets/javascript/piano_actions.js?v=1.0" defer></script>
</head>

<body>
    <div class="container">
        <div class="controls">
            <button id="record-btn">Start Recording</button>
            <button id="play-btn" disabled>Play Recording</button>
        </div>
        <div class="piano-container">
            <ul class="piano-keys-list">
                <li class="piano-keys white-key" data-key="01" data-note="q"></li>
                <li class="piano-keys black-key" data-key="02" data-note="2"></li>
                <li class="piano-keys white-key" data-key="03" data-note="w"></li>
                <li class="piano-keys black-key" data-key="04" data-note="3"></li>
                <li class="piano-keys white-key" data-key="05" data-note="e"></li>
                <li class="piano-keys white-key" data-key="06" data-note="r"></li>
                <li class="piano-keys black-key" data-key="07" data-note="5"></li>
                <li class="piano-keys white-key" data-key="08" data-note="t"></li>
                <li class="piano-keys black-key" data-key="09" data-note="6"></li>
                <li class="piano-keys white-key" data-key="10" data-note="y"></li>
                <li class="piano-keys black-key" data-key="11" data-note="7"></li>
                <li class="piano-keys white-key" data-key="12" data-note="u"></li>
                <li class="piano-keys white-key" data-key="13" data-note="i"></li>
                <li class="piano-keys black-key" data-key="14" data-note="9"></li>
                <li class="piano-keys white-key" data-key="15" data-note="d5"></li>
                <li class="piano-keys black-key" data-key="16" data-note="d#5"></li>
                <li class="piano-keys white-key" data-key="17" data-note="e5"></li>
                <li class="piano-keys white-key" data-key="18" data-note="f5"></li>
                <li class="piano-keys black-key" data-key="19" data-note="f#5"></li>
                <li class="piano-keys white-key" data-key="20" data-note="g5"></li>
                <li class="piano-keys black-key" data-key="21" data-note="g#5"></li>
                <li class="piano-keys white-key" data-key="22" data-note="a5"></li>
                <li class="piano-keys black-key" data-key="23" data-note="a#5"></li>
                <li class="piano-keys white-key" data-key="24" data-note="b5"></li>
                <li class="piano-keys white-key" data-key="25" data-note="c6"></li>
                <li class="piano-keys black-key" data-key="26" data-note="c#6"></li>
                <li class="piano-keys white-key" data-key="27" data-note="d6"></li>
                <li class="piano-keys black-key" data-key="28" data-note="d#6"></li>
                <li class="piano-keys white-key" data-key="29" data-note="e6"></li>
                <li class="piano-keys white-key" data-key="30" data-note="f6"></li>
                <li class="piano-keys black-key" data-key="31" data-note="f#6"></li>
                <li class="piano-keys white-key" data-key="32" data-note="g6"></li>
                <li class="piano-keys black-key" data-key="33" data-note="g#6"></li>
                <li class="piano-keys white-key" data-key="34" data-note="a6"></li>
                <li class="piano-keys black-key" data-key="35" data-note="a#6"></li>
                <li class="piano-keys white-key" data-key="36" data-note="b6"></li>
            </ul>
        </div>
    </div>
</body>

</html>
