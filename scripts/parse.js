(function(global) {

    var buttonInfo = new Array();
    var inputinfo = new Array();
    var currentInput = 0;
    var parserInsert = true;

    /** This converts to keycodes to real characters. Language dependency included. Calls executeKey to show the keys in effect **/
    function handleParsedKeyCode(keyCode, e, possible_socket) {

        var mychar = String.fromCharCode(e.which);

        switch (keyCode) {

            case 249 :
                executeParsedKey(151, mychar, possible_socket); // high two becomes ( for french keyboard
                return true;
                break;

            case 178:
                executeParsedKey(40, mychar, possible_socket); // high two becomes ( for french keyboard
                return true;
                break;

            case 224:
                executeParsedKey(133, mychar, possible_socket); // a accent


                return true;
            case 232:
                executeParsedKey(138, mychar, possible_socket); // e accent


                return true;
                break;
            case 231:
                executeParsedKey(135, mychar, possible_socket); // ca


                return true;
                break;
            case 233:
                executeParsedKey(130, mychar, possible_socket); // e accent

                return true;
                break;
            case 176 :
                executeParsedKey(167, mychar, possible_socket);
                return true;
                break;
            case 96 : // opening single quote - convert to standard single quote due to cursor right bug on single quote
                executeParsedKey(39, mychar, possible_socket);
                return true;
                break;
            case 219 : // bracket right
                executeParsedKey(93, mychar, possible_socket);
                return true;
                break;
            case 221: // bracket left
                executeParsedKey(91, mychar, possible_socket);
                return true;
                break;
            case 220 : // UE or backslash
                if (e.shiftKey) {
                    executeParsedKey(154, mychar, possible_socket);
                } else {
                    executeParsedKey(92, mychar, possible_socket);
                }
                return true;
                break;
            case 214 :
                executeParsedKey(153, mychar, possible_socket);
                return true;
                break;
            case 196 :
                executeParsedKey(142, mychar, possible_socket);
                return true;
                break;
            case 228 :
                executeParsedKey(132, mychar, possible_socket);
                return true;
                break;
            case 246 :
                executeParsedKey(148, mychar, possible_socket);
                return true;
                break;
            case 252 :
                executeParsedKey(129, mychar, possible_socket);
                return true;
                break;
            case 191:
                executeParsedKey(47, mychar, possible_socket);
                return true;
                break;
            case 222: // single/double quote
                if (!e.shiftKey) {
                    executeParsedKey(39, mychar, possible_socket);
                } else {
                    executeParsedKey(34, mychar, possible_socket); // double quote
                }
                return true;
                break;
            case 192 :
                executeParsedKey(39, mychar, possible_socket);
                return true;
                break;
            case 48 :
                if (!e.shiftKey) {
                    executeParsedKey(48, mychar, possible_socket);
                } else {
                    executeParsedKey(61, mychar, possible_socket);
                }
                return true;
                break;
            case 223: // sz
                executeParsedKey(225, possible_socket);
                break;
            case 13 :
                executeParsedKey(13, mychar, possible_socket);
                break;
            case 180 : // single quote above sz
                executeParsedKey(39, mychar, possible_socket);
                return true;
                break;
            case 39 : // right
                if (e.shiftKey) {

                    executeParsedKey(39, mychar, possible_socket);
                }
                return true;
                break;
            case 40 : // down
                if (e.shiftKey) {

                    executeParsedKey(40, mychar, possible_socket);
                }
                return true;
                break;
            case 37: // left, %
                if (e.shiftKey) {

                    executeParsedKey(37, mychar, possible_socket);
                }
                return true;
                break;
            case 38: // up
                if (e.shiftKey) {

                    executeParsedKey(38, mychar, possible_socket);
                }
                return true;
                break;
            case 8: // backspace
                parsed_showCharacter(true, possible_socket);
                myinput = inputinfo[currentInput - 1];

                if (myinput.cursorposx > 0)
                {
                    myinput.currentvalue = myinput.currentvalue.substring(0, myinput.cursorposx - 1) + myinput.currentvalue.substring(myinput.cursorposx);

                    var fgColor = new Array(255, 255, 0);
                    var bgColor = new Array(0, 0, 255);
                    for (var i = myinput.cursorposx - 1; i < myinput.currentvalue.length; i++) {
                        parsed_drawChar(ctx, myinput.currentvalue.charCodeAt(i), fgColor, bgColor, myinput.positionx + i, parsed_getCursorPosY(), possible_socket);
                    }
                    parsed_drawChar(ctx, 32, fgColor, bgColor, myinput.currentvalue.length + myinput.positionx, parsed_getCursorPosY(), possible_socket);
                    myinput.cursorposx--;
                    parsed_setCursorPosX(parsed_getCursorPosX() - 1, possible_socket);


                }
                inputinfo[currentInput - 1] = myinput;

                parsed_redrawCursor(possible_socket);
                return true;
                break;

            default :



                executeParsedKey(keyCode, mychar, possible_socket);

                return true;
                break;
        }
        return false;
    }

    global.handleParsedKeyCode = handleParsedKeyCode;

    /** This gets called due when a different event gets called **/
    function handleParsedKeyCode2(keyCode, e, possible_socket) {

        switch (keyCode) {
            case 32 : // space
                var type = inputinfo[currentInput - 1];
                if (type == "checkbox")
                {

                    var fgColor = new Array(255, 255, 0);
                    var bgColor = new Array(0, 0, 255);
                    parsed_drawChar(ctx, 88, fgColor, bgColor, parsed_getCursorPosX(), parsed_getCursorPosY(), possible_socket);
                }

            case 39 : // cursor right


                if (!e.shiftKey) {
                    if (!e.ctrlKey) {
                        console.log("GOING RIGHT");
                        myinput = inputinfo[currentInput - 1];
                        if (myinput.cursorposx < myinput.currentvalue.length - 1) {
                            //alert(myinput.currentvalue.length-1);
                            console.log("Setting cursor position to " + parsed_getCursorPosX() + 1);
                            parsed_setCursorPosX(parsed_getCursorPosX() + 1, possible_socket);

                            myinput.cursorposx++;
                            inputinfo[currentInput] = myinput;
                        }
                    } else {


                    }
                } else {



                }
                return true;
                break;
            case 40 : // cursor down

                myinput = inputinfo[currentInput - 1];
                if (myinput.type == "textarea")
                {
                    //alert("On textarea - need to increase cursorY");
                    // Please add a check where cursor is
                    
                    console.log(parsed_getCursorPosY()-myinput.positiony+"<"+myinput.rows);
                    if ((parsed_getCursorPosY()-myinput.positiony+1) < myinput.rows ) {
                    
                    parsed_setCursorPosY(parsed_getCursorPosY() + 1, possible_socket);
                    myinput.cursorposy++;
                    
                    }
                    return;
                }

                if (!e.shiftKey) {
                    if (!e.ctrlKey) {
                        console.log("GOING DOWN");
                        /*
                         if (cursorPosY<getDisplayHeight()-1) {
                         cursorPosY++;
                         parsed_redrawCursor();
                         }
                         } else {
                         }*/

                        if (currentInput < inputinfo.length) {
                            currentInput++;
                            //alert(inputinfo[currentInput].type);
                            setFocusOnInputField(possible_socket);

                        }

                    } else {

                    }
                }
                return true;
                break;
            case 37: // cursor left, %

                if (!e.shiftKey) {
                    if (!e.ctrlKey) {

                        myinput = inputinfo[currentInput - 1];
                        //alert(myinput.cursorposx);
                        if (myinput.cursorposx > 0) {
                            console.log("GOING LEFT");
                            parsed_setCursorPosX(parsed_getCursorPosX() - 1, possible_socket);
                            myinput.cursorposx--;
                            inputinfo[currentInput] = myinput;
                        }

                    } else {

                    }
                } else {




                }
                return true;
                break;
            case 38: // cursor up

                myinput = inputinfo[currentInput - 1];
                var carryThrough = true;
                if (myinput.type == "textarea")
                {
                    var carryThrough = false;
                 
                   
                    if (myinput.cursorposy > 0)
                    {

                        parsed_setCursorPosY(parsed_getCursorPosY() - 1, possible_socket);
                        myinput.cursorposy--;
                        return;
                    } else {
                        alert("myinput.cursorposy:"+myinput.cursorposy);
                        carryThrough = true;
                    }
                }

                if (carryThrough)
                {

                    if (!e.shiftKey) {
                        if (!e.ctrlKey) {
                            console.log("GOING UP");
                            if (currentInput > 0) {
                                alert("currentInput: "+currentInput);
                                currentInput--;
                                setFocusOnInputField(possible_socket);

                            }

                            /*if (cursorPosY>0) {
                             cursorPosY--;
                             parsed_redrawCursor();
                             }*/
                        } else {

                        }
                    } else {

                    }

                }

                break;
            default:

                return true;
                break;
        }
        return false;
    }

    global.handleParsedKeyCode2 = handleParsedKeyCode2;

    


    function executeParsedKey(keyCode, character, possible_socket) {
        parsed_showCharacter(false, possible_socket);
        var fgColor = new Array(255, 255, 0);
        var bgColor = new Array(0, 0, 255);

        myinput = inputinfo[currentInput - 1];
        if (myinput.type == "textarea")
        {          //*** before were currentRow , didnt work on showing "I am on column columnvalue". With cursorposx it works

            // Add special handling for the cursor y - vertical navigation
            if (parserInsert == false) {

                // This somehow does not seem to get called
                var myascii = screenCharacterArray[parsed_getCursorPosY()][parsed_getCursorPosX()][0];


                parsed_drawChar(ctx, keyCode, fgColor, bgColor, parsed_getCursorPosX(), parsed_getCursorPosY(), possible_socket);

                if (parsed_getCursorPosX() < getDisplayWidth() - 2) {
                    parsed_setCursorPosX(parsed_getCursorPosX(), possible_socket);
                }
                parsed_showCharacter(true, possible_socket);
                parsed_redrawCursor(possible_socket);
            } else {
                // TODO

                // This however is getting called
                myinput = inputinfo[currentInput - 1];
                console.log("X:" + parsed_getCursorPosX() + "Y: " + parsed_getCursorPosY());
                parsed_drawChar(ctx, keyCode, fgColor, bgColor, parsed_getCursorPosX(), parsed_getCursorPosY(), possible_socket);

             
                var character = String.fromCharCode(keyCode);
                console.log("character:" + character);

                // Here the character is getting overwritten when the cursor is at the end of the text field
                if (myinput.cursorposx == myinput.currentvalue.length) {
                   
                    myinput.currentvalue[myinput.cursorposx] = character; //The character is added to the currentvalue array
                } else {
                    // otherwise we want to implement inserting here
                    // We start at the position here because the first character stays the same (or becomes a new character).
                    // All characters following the first character get moved one to the right.
                   
                    for (var i = 1; i < myinput.length-1; i++) { // All characters get positioned one character to the right
                        // Example. String is:
                        // "12345678"
                        // We insert.
                        // Result will be:
                        // "a12345678"
                        // Now we must move every character at the top (12345678) one to the right.
                        // That means the character at 
                        // 1 becomes a
                        // 2 becomes 1
                        // 3 becomes 2
                        // 4 becomes 3
                        // 5 becomes 4
                        // 6 becomes 5
                        // 7 becomes 6
                        // 8 becomes 7
                        // EMPTY becomes 8
                        // the formular for this is:
                        var val = String(myinput.currentvalue[myinput.cursorposy]); // Convert to String
                        // There is a syntax difference between substring and substr
                       
                        var previouscharacter = val.substring(i-1,i); // Get the single character, i.e. "e".
                        
                        myinput.currentvalue[myinput.cursorposy][i]=previouscharacter; // Set the character at the index of i to the previous character
                        
                    }
                    myinput.currentvalue[myinput.cursorposx] = character;
                            
                }
                console.log((myinput.cursorposx + 1) + ">" + myinput.length);

                //WHEN CURSORX IS IN THE LAST POSITION OF THE INPUT
                if (myinput.cursorposx + 2 > myinput.length) {
                    console.log("END");
                    console.log("myinput.cursorposx: " + (myinput.cursorposx + 2) + " > " + myinput.length);

                 
                 
                   // I think there must get inserted a character somewhere

                    //WHEN CURSORX IS IN THE INPUT AND NOT THE LAST POSITION
                } else {
                    console.log("INCREASING");
                    console.log("myinput.currentvalue:" + myinput.currentvalue);
                    //not neccessary
                    //for (var i = myinput.cursorposx; i < myinput.currentvalue.length; i++) {
                    //console.log(myinput.currentvalue.charCodeAt(i));
                    //parsed_drawChar(ctx, myinput.currentvalue[i].charCodeAt(0), fgColor, bgColor, myinput.positionx+i, parsed_getCursorPosY(), possible_socket);
                    //}

                    var newPosX = parseInt(myinput.cursorposx) + parseInt(myinput.positionx) + 1;
                    console.log("myinput.cursorposx:" + myinput.cursorposx + " myinput.positionx:" + myinput.positionx);
                    console.log("Setting cursor pos to " + newPosX);
                    console.log("NEW X (INCREASING): " + newPosX);
                    parsed_setCursorPosX(newPosX, possible_socket);
                    myinput.cursorposx++;
                }

                inputinfo[currentInput - 1] = myinput;


            }


        } else {


            if (parserInsert == false) {
                var myascii = screenCharacterArray[parsed_getCursorPosY()][parsed_getCursorPosX()][0];


                parsed_drawChar(ctx, keyCode, fgColor, bgColor, parsed_getCursorPosX(), parsed_getCursorPosY(), possible_socket);

                if (parsed_getCursorPosX() < getDisplayWidth() - 2) {
                    parsed_setCursorPosX(parsed_getCursorPosX(), possible_socket);
                }
                parsed_showCharacter(true, possible_socket);
                parsed_redrawCursor(possible_socket);
            } else {
                // STANDARD INPUT FIELD, NO TEXTAREA


                myinput = inputinfo[currentInput - 1];
                console.log("X:" + parsed_getCursorPosX() + "Y: " + parsed_getCursorPosY());
                parsed_drawChar(ctx, keyCode, fgColor, bgColor, parsed_getCursorPosX(), parsed_getCursorPosY(), possible_socket);

                while (myinput.currentvalue.length < myinput.cursorposx)
                {

                    myinput.currentvalue += " ";
                }
                var character = String.fromCharCode(keyCode);
                console.log("character:" + character);

                if (myinput.cursorposx < myinput.currentvalue.length) {

                    console.log("INSERT");
                    myinput.currentvalue = myinput.currentvalue.substring(0, myinput.cursorposx) + character + myinput.currentvalue.substring(myinput.cursorposx);

                } else {
                    console.log("ADD");
                    myinput.currentvalue += character;
                }


                if (myinput.currentvalue.length >= myinput.length) {

                    myinput.currentvalue = myinput.currentvalue.substring(0, myinput.length);
                }

                console.log((myinput.cursorposx + 1) + ">" + myinput.length);

                if (myinput.cursorposx+1 >= myinput.length) {
                    parsed_setCursorPosX(myinput.cursorposx+myinput.positionx, possible_socket);
                } else {

                    console.log("INCREASING");
                    console.log("myinput.currentvalue:" + myinput.currentvalue);
                    //Pinta valor cuando estás llendo a la derecha
                    for (var i = myinput.cursorposx; i < myinput.currentvalue.length; i++) {
                        parsed_drawChar(ctx, myinput.currentvalue.charCodeAt(i), fgColor, bgColor, myinput.positionx + i, parsed_getCursorPosY(), possible_socket);
                    }

                    var newPosX = parseInt(myinput.cursorposx) + parseInt(myinput.positionx) + 1;
                    console.log("myinput.cursorposx:" + myinput.cursorposx + " myinput.positionx:" + myinput.positionx);
                    console.log("Setting cursor pos to " + newPosX);
                    console.log("NEW X (INCREASING): " + newPosX);
                    parsed_setCursorPosX(newPosX, possible_socket);
                    myinput.cursorposx++;
                }

                inputinfo[currentInput - 1] = myinput;


            }

        }

    }

    global.executeParsedKey = executeParsedKey;


    var hexcolours = {"aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
        "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
        "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
        "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
        "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
        "honeydew": "#f0fff0", "hotpink": "#ff69b4",
        "indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
        "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
        "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
        "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead", "navy": "#000080",
        "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
        "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
        "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
        "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00", "yellowgreen": "#9acd32"};

// Whenever a key down gets pressed, this stores the current HTML inside the localstorage object. Also, it copies all HTML to a different div (ascii_input) where it gets rendered.
    function updateAsciiArea() {
        $('#ascii_area').html($('#ascii_input').val());

        localStorage.setItem("html", $('#ascii_textarea').val());
    }

    global.updateAsciiArea = updateAsciiArea;

    function hexToR(h) {
        return parseInt((cutHex(h)).substring(0, 2), 16)
    }

    global.hexToR = hexToR;

    function hexToG(h) {
        return parseInt((cutHex(h)).substring(2, 4), 16)
    }

    global.hexToG = hexToG;

    function hexToB(h) {
        return parseInt((cutHex(h)).substring(4, 6), 16)
    }

    global.hexToB = hexToB;

    function cutHex(h) {
        return (h.charAt(0) == "#") ? h.substring(1, 7) : h
    }

    global.cutHex = cutHex;

    function clearScreen() {
        ctx = document.getElementById("ansi").getContext("2d");
        ctx.fillStyle = 0;
        ctx.fillRect(0, 0, document.getElementById('ansi').width, document.getElementById('ansi').height);
    }

    global.clearScreen = clearScreen;

    function switchbutton() {
        if ($('#switchbutton').val() == 'Show Ascii') {
            clearScreen();
            $('#switchbutton').val('Show HTML');
            $('#ansi').show();
            $('#ascii_html').hide();
            $('#ascii_content').html("<div>" + $('#ascii_textarea').val() + "</div>");
            calculateContent();
        } else {
            $('#switchbutton').val('Show Ascii');
            $('#ansi').hide();
            $('#ascii_html').show();
        }
    }

    global.switchbutton = switchbutton;

// This gets called fro mthe prototype function and stores all style css commands inside this.styles, for example for "left:20px", we have this.styles['left'] with the value "20px" in the end.
    function parseCSS(that) {
        this.styles = {};
        if (typeof (that.attr('style')) != "undefined") {
            this.items = {};
            this.stylestemp = that.attr('style').split(';');

            var c = '';
            for (var x = 0, l = this.stylestemp.length; x < l; x++) {
                c = this.stylestemp[x].split(':');
                var key = typeof (c[0]) == "string" ? c[0].trim() : "";


                this.styles[key] = typeof (c[1]) == "string" ? c[1].trim() : "";

            }
        }

    }

    global.parseCSS = parseCSS;

// If you need to get a certain css command, call this, for example this.get("left").
    parseCSS.prototype.get = function(what) {
        if (typeof (this.styles[what]) != "undefined") {
            return this.styles[what];
        } else {
            return "";
        }
    }

// This gets the current color as rgb array
    parseCSS.prototype.getColor = function() {

        var color = this.get('color');

        if (color == "") {
            rgb_color = {};
            rgb_color[0] = 255;
            rgb_color[1] = 255;
            rgb_color[2] = 255;
        } else
        if (typeof (hexcolours[color]) != "undefined") {
            var color = hexcolours[color];
            var rgb_color = new Array();
            rgb_color[0] = hexToR(color);
            rgb_color[1] = hexToG(color);
            rgb_color[2] = hexToB(color);
        } else {
            var rgb_color = new Array();
            rgb_color[0] = hexToR(color);
            rgb_color[1] = hexToG(color);
            rgb_color[2] = hexToB(color);
        }
        return rgb_color;
    }


// This gets the current background color as rgb array
    parseCSS.prototype.getBackgroundColor = function()
    {
        var backgroundcolor = this.get('background-color');

        if (backgroundcolor == "") {

            rgb_backgroundcolor = {};
            rgb_backgroundcolor[0] = 0;
            rgb_backgroundcolor[1] = 0;
            rgb_backgroundcolor[2] = 0;
        } else if (typeof (hexcolours[color]) != "undefined") {
            var color = hexcolours[color];
            var rgb_color = new Array();
            rgb_backgroundcolor[0] = hexToR(color);
            rgb_backgroundcolor[1] = hexToG(color);
            rgb_backgroundcolor[2] = hexToB(color);
        } else {
            var rgb_backgroundcolor = new Array();
            rgb_backgroundcolor[0] = hexToR(color);
            rgb_backgroundcolor[1] = hexToG(color);
            rgb_backgroundcolor[2] = hexToB(color);
        }
        return rgb_backgroundcolor;
    }

// This gets called when an input field gets encountered while rendering the HTML
    function renderInput(that, positionx, positiony, possible_socket) {

        defaultvalue = that.val();
        if (typeof (defaultvalue) == "undefined")
            defaultvalue = "";

        positionx = positionx + that.parent().text().length;
        var name = that.attr('name');
        var length = that.attr('length');
        if (typeof (length) == "undefined")
            length = 20;
        var type = that.attr('type');
        var value = that.attr('value');

        if (typeof (value) == "undefined")
            value = "";
        if (type == "text") {

            var fgColor = new Array(255, 255, 0);
            var bgColor = new Array(0, 0, 255);
            for (var i = 0; i < length; i++) {
                var asciiCode = 32;
                if (i < value.length)
                {
                    asciiCode = value.charCodeAt(i);
                }

                parsed_drawChar(ctx, asciiCode, fgColor, bgColor, positionx + i, positiony, possible_socket);
            }
        }

        var inputArray = {"name" : that.attr('name'), "type": "text", "cursorposx": defaultvalue.length, "positionx": positionx, "positiony": positiony, "length": length, "currentvalue": defaultvalue, "defaultvalue": defaultvalue};
        inputinfo.push(inputArray);

    }

    global.renderInput = renderInput;
a
// This gets called when an input field gets encountered while rendering the HTML
    function renderTextarea(that, positionx, positiony, possible_socket) {

        //alert("TEXTAREA POSITIONY:"+positiony);

        //defaultvalue=that.val();
        //if (typeof(defaultvalue)=="undefined") defaultvalue="";

        //positionx = positionx + that.parent().text().length;
        var propAttrRows = parseInt(that.attr("rows"));
        var propAttrCols = parseInt(that.attr("cols"));

        var fgcolor = new Array(255, 255, 0);
        var bgcolor = new Array(0, 0, 255);

        for (var x = positionx; x < positionx + propAttrCols; x++) {
            for (var y = positiony; y < positiony + propAttrRows; y++) {
                printthat(" ", x, y, fgcolor, bgcolor, possible_socket);
            }
        }
        // For every column one string - modify it according to the cursor position by using substring and concatenation using +" " and similar
        var yarray = new Array();
        for (var i = 0; i < propAttrCols; i++)
        {
            yarray.push("");
        }

        var inputArray = {"type": "textarea", "rows" : propAttrRows, "cols" : propAttrCols, "positionx": positionx, "positiony": positiony, "length": propAttrCols, "currentvalue": yarray, "defaultvalue": yarray, "cursorposx": defaultvalue.length, "cursorposy" : 0};
     
        inputinfo.push(inputArray);

    }

    global.renderTextarea = renderTextarea;



// calculateContent gets called from the function switchbutton, when the user makes the canvas get shown
    function calculateContent(possible_socket) {

        if (typeof (ctx) == "undefined")
            ctx = ""; // check, new

        var newPosX = 0;
        var newPosY = 0;

        // We have two iterations over the given HTML. The first one renders all input fields, the second one all tags again.

        // Either find "input" or "*" tags (which are all elements in the end)
        $('#ascii_content').find("*").each(function() {

            var cssItems = new parseCSS($(this));
            var positionx = parseInt(cssItems.get('left').replace("px", ""));
            var positiony = parseInt(cssItems.get('top').replace("px", ""));
            if (isNaN(positionx))
                positionx = 0;
            if (isNaN(positiony))
                positiony = 0;

            var originalDIV = $(this);
            var parents = $(this).parent();
            var absoluteFound = false;
            var hasChildren = false;
            if (cssItems.get('position') == "absolute") {
                absoluteFound = true;
            }

            // parents[0] is just some kind of iteration, and absoluteFound gets queried in order not to calculate all other parent elements that have
            // a different position (top or left) value. This of course can only get done to left or top, which are coordinates that get regarded as long as an absolute value was found or
            // there are no more parent elements.
            while ((parents[0]) && (absoluteFound == false))
            {
                hasChildren = true;
                // We still have this array of tags ("input" or "*")
                parents.each(function() {
                    var that = $(this);

                    if (typeof (that.prop) != "undefined")
                    {
                        var propTagName = that.prop('tagName');
                    } else {
                        var propTagName = that[0].name.toString().toUpperCase();
                    }


                    if ((propTagName != "BODY") && (propTagName != "HTML")) {

                        var cssItems = new parseCSS($(this));
                        // This gets the "left" or the "top" value inside the style tag of an element
                        var left = parseInt(cssItems.get('left').replace("px", "")); // Of course we do not use px, the positions are the x and y coordinates of the character
                        var top = parseInt(cssItems.get('top').replace("px", "")); // on the canvas

                        // Parent's left value gets regarded, and added to the current left position. If this is a negative value, + plus - of course makes minus.
                        if ((left != "auto") && (isNaN(left) == false))
                        {
                            positionx = positionx + left;
                        }
                        // The same is true for the "top" value inside a tag
                        if ((top != "auto") && (isNaN(top) == false))
                        {

                            positiony = positiony + top;
                        }

                        // We also check if absolute is set. If so, we do not take parent's positions into regard, because the actual value gets set through the current "left" or "top" values.
                        if (cssItems.get('position') == "absolute")
                        {
                            absoluteFound = true;
                        }



                    }


                });

                // Iterate over the next parent element
                parents = parents.parent();

            }

            if (typeof (originalDIV.prop) != "undefined")
            {
                var propTagName = originalDIV.prop('tagName');
            } else {
                var propTagName = originalDIV[0].name.toString().toUpperCase();
            }


            if (propTagName != "INPUT")
            {
                var cssItems = new parseCSS(originalDIV);
                // Get the "color" and "backlground-color" field from the style tag (if there is any).
                var rgb_color = cssItems.getColor();
                var rgb_backgroundcolor = cssItems.getBackgroundColor();
            }


            // Special checking if the original element is an input element. Here, nothing gets printed.
            if ((propTagName == "INPUT") && (originalDIV.attr('type').toString().toUpperCase() == "BUTTON")) {
                console.log("X:" + positionx + " Y: " + positiony);
                var text = "Submit";
                if (typeof (originalDIV.attr('value')) != "undefined") {
                    text = originalDIV.attr('value');
                }
                var fgcolor = new Array(255, 255, 255);
                var bgcolor = new Array(99, 99, 99);

                printthat(" " + text + " ", positionx, positiony, fgcolor, bgcolor, possible_socket); // Show that text on the canvas
                var button = {"positionx": positionx, "positiony": positiony, "text": text, "bgcolor": bgcolor, "fgcolor": fgcolor, "onclick": originalDIV.attr('onclick')};
                //alert("BUTTON");
                buttonInfo.push(button);

            } else
            if ((propTagName == "TEXTAREA")) {


                renderTextarea(originalDIV, positionx, positiony, possible_socket);
                originalDIV.remove();
            }


            if ((propTagName) == "INPUT") {
                // cursorPosX and cursorPosY are set to 0 by default. By checking this, we find out if we have it to do with the very first input element on the page. We need this to set the cursor position.
                if ((newPosX == 0) && (newPosY == 0)) {
                    // The x position gets stored
                    newPosX = positionx;
                    // The position of the input field changes when we have text standing before it. This is like gettting text(), which does not take any other tags into account - just pure text. 

                    if (originalDIV.parent().text().length > 0) {
                        newPosX = newPosX + originalDIV.parent().text().length;
                    }
                    if (originalDIV.val().length > 0) {
                        newPosX = newPosX + originalDIV.val().length;
                    }

                    // Als, the y position gets stored
                    newPosY = positiony;

                }
                // Making a function call in order to have it shown smoothly

                currentInput = 1;

                renderInput(originalDIV, positionx, positiony, possible_socket);
                // 
                originalDIV.remove();
            } else
            if (hasChildren) { // Special check for hasChildren. See else statement for further information.

                var text = originalDIV.clone().children().remove().end().text().trim(); // Retrieve text not nested in child tags

                printthat(text, positionx, positiony, rgb_color, rgb_backgroundcolor, possible_socket); // Show that text on the canvas
            } else {
                // We set hasChildren when we have found any children elements. Otherwise this is just plain text we find inside the editable textarea. This is special handling,
                // because, since there are no child divs or spans, we would not output anything otherwise.
                var text = originalDIV.html();

                printthat(text, positionx, positiony, rgb_color, rgb_backgroundcolor, possible_socket);
            }


        });

        console.log("newPosX:" + newPosX + " newPosY:" + newPosY);
        if ((newPosX != 0) && (newPosY != 0)) {
            console.log("newPosX:" + newPosX + " newPosY:" + newPosY);
            parsed_setCursorPosX(newPosX, possible_socket);
            parsed_setCursorPosY(newPosY, possible_socket);
            // Now that we have the first input element, we set the position of the blinking cursor where the first input field is located.
        }
    }

    global.calculateContent = calculateContent;


    function checkSelectionOnParsed(x, y, possible_socket) {

       // console.log("type:" + inputinfo[currentInput].type);

        //console.log("inputinfo.length:" + inputinfo.length);
        for (var i = 0; i < inputinfo.length; i++) {


            if (inputinfo[i].type=="textarea") {
                
                 if ( (y >= inputinfo[i].positiony) && (y < inputinfo[i].positiony+inputinfo[i].rows) ) {
                            var maxx = inputinfo[i].positionx + inputinfo[i].length;

                            if ((x > inputinfo[i].positionx) && (x < maxx)) {
                                if (currentInput == i + 1)
                                {
                                    var newvalue = x - inputinfo[i].positionx;

                                    if (newvalue > inputinfo[i].currentvalue.length) {
                                        inputinfo[i].cursorposx = inputinfo[i].currentvalue.length;
                                    } else {
                                        inputinfo[i].cursorposx = newvalue;
                                    }

                                    // X coordinate
                                    parsed_setCursorPosX(inputinfo[i].positionx + inputinfo[i].cursorposx, possible_socket);
                                    // Y coordinate
                                    inputinfo[i].cursorposy = y-inputinfo[i].positiony; // We have to do that twice, once below, and another time here when
                                                                                        // the selection stays
                                    
                                    console.log( inputinfo[i].cursorposy);
                                    parsed_setCursorPosY(y, possible_socket);
                                } else {

                                    // Changing selection - dunno
                                    currentInput = i + 1;
                                    parsed_showCharacter(true, possible_socket);
                                    var newvalue = x - inputinfo[i].positionx;
                                    console.log("i:" + i + " inputinfo.length=" + inputinfo.length);
                                    if (newvalue > inputinfo[i].currentvalue.length) {
                                        inputinfo[i].cursorposx = inputinfo[i].currentvalue.length;
                                    } else {
                                        inputinfo[i].cursorposx = newvalue;
                                    }
                                    
                                    inputinfo[i].cursorposy = y-inputinfo[i].positiony; // We have to do that twice, once above, and another time here when
                                                                                        // the selection changes
                                    
                                     console.log(inputinfo[i].cursorposy);
                                    parsed_setCursorPosX(inputinfo[i].positionx + inputinfo[i].cursorposx, possible_socket);
                                     
                                    parsed_setCursorPosY(y, possible_socket);

                                    return;
                                }
                            }
                        }
                
                
            } else
            if (inputinfo[i].type=="text") {
                
                        if (inputinfo[i].positiony == y) {
                            var maxx = inputinfo[i].positionx + inputinfo[i].length;

                            if ((x > inputinfo[i].positionx) && (x < maxx)) {
                                if (currentInput == i + 1)
                                {
                                    var newvalue = x - inputinfo[i].positionx;

                                    if (newvalue > inputinfo[i].currentvalue.length) {
                                        inputinfo[i].cursorposx = inputinfo[i].currentvalue.length;
                                    } else {
                                        inputinfo[i].cursorposx = newvalue;
                                    }

                                    parsed_setCursorPosX(inputinfo[i].positionx + inputinfo[i].cursorposx, possible_socket);

                                } else {

                                    // Changing selection 
                                    currentInput = i + 1;
                                    parsed_showCharacter(true, possible_socket);
                                    var newvalue = x - inputinfo[i].positionx;
                                    console.log("i:" + i + " inputinfo.length=" + inputinfo.length);
                                    if (newvalue > inputinfo[i].currentvalue.length) {
                                        inputinfo[i].cursorposx = inputinfo[i].currentvalue.length;
                                    } else {
                                        inputinfo[i].cursorposx = newvalue;
                                    }
                                    parsed_setCursorPosX(inputinfo[i].positionx + inputinfo[i].cursorposx, possible_socket);
                                    parsed_setCursorPosY(y, possible_socket);

                                    return;
                                }
                            }
                        }
            
               }
            
        }

        for (var i = 0; i < buttonInfo.length; i++) {

            if (buttonInfo[i].positiony == y)
            {
                var maxx = buttonInfo[i].positionx + buttonInfo[i].text.length;

                if ((x > buttonInfo[i].positionx) && (x < maxx))
                {
                    var onclick = buttonInfo[i].onclick;
                    eval(onclick);
                }

            }
        }


    }

    global.checkSelectionOnParsed = checkSelectionOnParsed;

    function setFocusOnInputField(possible_socket) {


        myinput = inputinfo[currentInput - 1]; // This is also the question, when to use -1 and not 
        //alert("setFocusOnInputField: "+myinput.type);
        //if (myinput.type=="textarea") 
        // {
        //alert("x:"+myinput.cursorposx);
        //alert("y:"+myinput.cursory);
        // }
        myinput.cursorposy=0; // This one changes because below the positiony

        parsed_setCursorPosX(myinput.positionx + myinput.cursorposx, possible_socket);
        parsed_setCursorPosY(myinput.positiony, possible_socket);


    }

    global.setFocusOnInputField = setFocusOnInputField;


    function reset() {
        buttonInfo = new Array();
        inputinfo = new Array();
        currentInput = 0;
        parserInsert = true;
    }

    global.reset = reset;

}(this));