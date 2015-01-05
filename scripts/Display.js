(function(global) {

var canvas;
var ctx;
var showCharacter;
var redrawCursor;
var numberOfHorizontalCharacters = 160;
var numberOfVerticalCharacters = 80;
Display = function(mynumberOfHorizontalCharacters,mynumberOfVerticalCharacters,mycanvas,myctx,myshowCharacter,myredrawCursor) {
     var x, y, savedX, savedY, foreground, background, bold, inverse;
  
    
     numberOfHorizontalCharacters = mynumberOfHorizontalCharacters;
     numberOfVerticalCharacters = mynumberOfVerticalCharacters;
     showCharacter=myshowCharacter;
     redrawCursor=myredrawCursor;
     canvas = mycanvas;
     ctx = myctx;
     this.homeCursor();
     this.resetAttributes();
}

global.Display = Display;
     
        
Display.prototype.homeCursor = function() {
            this.x = 0;
            this.y = 0;
        }

Display.prototype.resetAttributes = function() {
            foreground = 7;
            background = 0;
            bold = false;
            inverse = false;
}

Display.prototype.setBold = function(value) {
            bold = value;
        }

Display.prototype.setInverse = function(value) {
            inverse = value;
        }

Display.prototype.setPos = function(newX, newY) {
            
            this.setXPos(newX);
            this.setYPos(newY);
        }
        
Display.prototype.setXPos = function(newX) {
   
            showCharacter();
            console.log("XPOS:"+newX);
            this.x = Math.min(numberOfHorizontalCharacters-1, newX);
            if (this.x<0) this.x=0;
            redrawCursor();
          
            //console.log("X:"+this.x);
        }
        
Display.prototype.setYPos = function(newY) {
            showCharacter();
            
            this.y = Math.min(numberOfVerticalCharacters-1, newY);
            console.log("setPos y: "+this.y);
            redrawCursor();
            //console.log("Y:"+y);
        }

Display.prototype.setForeground = function(value) {
            foreground = value;
        }

Display.prototype.setBackground = function(value) {
            background = value;
        }

Display.prototype.clearToEndOfLine = function() {
            var i;
            console.log("WIDTH:"+width);
            for (i = this.x; i < width; ++i) {
                codepage.drawChar(ctx, 0, 0, 0, i, this.y);
            }
        }

Display.prototype.clearScreen = function() {
            this.homeCursor();
            console.log("CTX:"+typeof(ctx));
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

Display.prototype.up = function(num) {
            showCharacter();
            this.y = Math.max(0, this.y - num);
            redrawCursor();
            console.log("UP new y pos: "+this.y);
        }

Display.prototype.down = function(num) {
            showCharacter();
            this.y = Math.min(numberOfVerticalCharacters - 1, this.y + num);
            console.log("DOWN new y pos:"+this.y);
            redrawCursor();
        }

       /* function newLine() {
            x = 0;
            if (y === numberOfVerticalCharacters - 1) {
                //codepage.scrollDisplay(ctx, canvas);
                return true;
            }
            ++y;
           
            return false;
        }*/

Display.prototype.back = function(num) {
            
            this.setXPos(this.x - num);
            
        }

Display.prototype.forward = function(num) {
           
            //if (x === numberOfHorizontalCharacters) { newLine(); }
            this.setXPos(this.x + num);
            
            
        }
        
Display.prototype.linefeed = function() {
             showCharacter();       
             this.setXPos(0);
             redrawCursor();
        }

Display.prototype.getXPos = function() {
            return this.x;
           
        }
        
Display.prototype.getYPos = function() {
            return this.y;
        }
        

        
Display.prototype.savePosition = function() {
            this.savedX = this.x;
            this.savedY = this.y;
        }

Display.prototype.restorePosition = function() {
            this.x = this.savedX;
            this.y = this.savedY;
        }

 global.Display = Display;

 }(this));