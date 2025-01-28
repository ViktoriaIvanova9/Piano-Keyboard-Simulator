<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Piano-Keyboard-Simulator</title>
    <link rel="stylesheet" type="text/css" href="./assets/css/piano_styles.css?v=1.0">
    <link rel="stylesheet" href="assets/font-awesome/css/font-awesome.min.css">
    <script src="./assets/javascript/piano_actions.js?v=1.0" defer></script>
</head>

<body>
    <div class="container">
        <div class="navigation">
            <a href="includes/handlers/logout.php" class="logout-link">
                <i class="icon-signout icon-3x"></i>
                <span>Log out</span>
            </a>
        </div>
        <div class="piano-container">
            <div class="button-wrapper-one">
                <div class="button-label">RECORD</div>
                <button id="record-btn" onclick="toggle(this)">
                    <div class="dot"></div>
                </button>
                <div class="button-label">PLAY</div>
                <button id="play-btn" onclick="toggle(this)">
                    <div class="dot"></div>
                </button>
            </div>
            <div class="button-wrapper-two">
                <div class="button-label">DOWNLOAD</div>
                <button id="download-btn" onclick="toggle(this)">
                    <div class="dot"></div>
                </button>
                <div class="button-label">SONG</div>
                <button id="play-imported-btn" onclick="toggle(this)">
                    <div class="dot"></div>
                </button>

            </div>
            <!-- <div class="input-container">
                    <input type="file" id="import-file" accept=".json">
            </div> -->
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
                <li class="piano-keys white-key" data-key="15" data-note="o"></li>
                <li class="piano-keys black-key" data-key="16" data-note="0"></li>
                <li class="piano-keys white-key" data-key="17" data-note="p"></li>
                <li class="piano-keys white-key" data-key="18" data-note="["></li>
                <li class="piano-keys black-key" data-key="19" data-note="a"></li>
                <li class="piano-keys white-key" data-key="20" data-note="z"></li>
                <li class="piano-keys black-key" data-key="21" data-note="s"></li>
                <li class="piano-keys white-key" data-key="22" data-note="x"></li>
                <li class="piano-keys black-key" data-key="23" data-note="d"></li>
                <li class="piano-keys white-key" data-key="24" data-note="c"></li>

                <li class="piano-keys white-key" data-key="25" data-note="v"></li>
                <li class="piano-keys black-key" data-key="26" data-note="g"></li>
                <li class="piano-keys white-key" data-key="27" data-note="b"></li>
                <li class="piano-keys black-key" data-key="28" data-note="h"></li>
                <li class="piano-keys white-key" data-key="29" data-note="n"></li>
                <li class="piano-keys white-key" data-key="30" data-note="m"></li>
                <li class="piano-keys black-key" data-key="31" data-note="k"></li>
                <li class="piano-keys white-key" data-key="32" data-note=","></li>
                <li class="piano-keys black-key" data-key="33" data-note="l"></li>
                <li class="piano-keys white-key" data-key="34" data-note="."></li>
                <li class="piano-keys black-key" data-key="35" data-note=";"></li>
                <li class="piano-keys white-key" data-key="36" data-note="/"></li>
            </ul>
            <div class="button-wrapper-three">
                <div class="button-label">PEDAL</div>
                <button id="pedal-btn" onclick="toggle(this)">
                    <div class="dot"></div>
                </button>
                <div class="button-label">KEYS</div>
                <button id="show-keys" onclick="toggle(this)">
                    <div class="dot"></div>
                </button>
            </div>
        </div>
    </div>
</body>

</html>
