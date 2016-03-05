var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var dice = (function (_super) {
        __extends(dice, _super);
        //public image: createjs.Bitmap;
        function dice(imageString, x, y) {
            _super.call(this, imageString);
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this.x = x;
            this.y = y;
            //create event listeners for mouseover and mouseout events
            //this.image.on("mouseover", this.OnOver, this);
            //this.image.on("mouseout", this.OnOut, this);
            this.on("mouseover", this.OnOver, this);
            this.on("mouseout", this.OnOut, this);
        }
        //public methods
        dice.prototype.OnOver = function (event) {
            //this.image.alpha = 0.8;
            this.alpha = 0.8;
        };
        dice.prototype.OnOut = function (event) {
            //this.image.alpha = 1.0;
            this.alpha = 1.0;
        };
        return dice;
    })(createjs.Bitmap);
    objects.dice = dice;
})(objects || (objects = {}));
//# sourceMappingURL=dice.js.map