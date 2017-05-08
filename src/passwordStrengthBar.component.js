"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PasswordStrengthBarComponent = PasswordStrengthBarComponent_1 = (function () {
    function PasswordStrengthBarComponent() {
        this.colors = ['#cc3333', '#ff9900', '#ffcc00', '#99cc00', '#70e435'];
    }
    PasswordStrengthBarComponent.measureStrength = function (p) {
        var _force = 0;
        var _regex = /[-[\]{}!@%&_=~()*+?.,\/\\^$|#\s]/g; // "
        var _lowerLetters = /[a-z]+/.test(p);
        var _upperLetters = /[A-Z]+/.test(p);
        var _numbers = /[0-9]+/.test(p);
        var _symbols = _regex.test(p);
        var _spaces = /\s/g.test(p);
        var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];
        var _passedMatches = 0;
        for (var _i = 0, _flags_1 = _flags; _i < _flags_1.length; _i++) {
            var _flag = _flags_1[_i];
            _passedMatches += _flag === true ? 1 : 0;
        }
        _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
        _force += _passedMatches * 10;
        // penalty (short password)
        _force = (p.length <= 6) ? Math.min(_force, 10) : _force;
        // penalty (poor variety of characters)
        _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
        _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
        _force = (_passedMatches === 3) ? Math.min(_force, 30) : _force;
        _force = (_passedMatches === 4 && _force <= 58) ? Math.min(_force, 40) : _force;
        // penalty for spaces
        _force = _spaces ? 0 : _force;
        return _force;
    };
    PasswordStrengthBarComponent.prototype.getColor = function (s) {
        var idx = 0;
        var strength = '';
        if (s <= 10) {
            idx = 0;
            strength = 'Very weak';
        }
        else if (s <= 20) {
            idx = 1;
            strength = 'Weak';
        }
        else if (s <= 30) {
            idx = 2;
            strength = 'Medium';
        }
        else if (s <= 40) {
            idx = 3;
            strength = 'Strong';
        }
        else {
            idx = 4;
            strength = 'Very strong';
        }
        return {
            idx: idx + 1,
            col: this.colors[idx],
            text: strength
        };
    };
    PasswordStrengthBarComponent.prototype.getStrengthIndexAndColor = function (password) {
        return this.getColor(PasswordStrengthBarComponent_1.measureStrength(password));
    };
    PasswordStrengthBarComponent.prototype.ngOnChanges = function (changes) {
        var password = changes['passwordToCheck'].currentValue;
        this.setBarColors(5, '#758694');
        if (password) {
            var c = this.getStrengthIndexAndColor(password);
            this.setBarColors(c.idx, c.col, c.text);
        }
    };
    PasswordStrengthBarComponent.prototype.setBarColors = function (count, col, text) {
        for (var _n = 0; _n < count; _n++) {
            this['bar' + _n] = col;
        }
        this.text = text;
    };
    return PasswordStrengthBarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PasswordStrengthBarComponent.prototype, "passwordToCheck", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PasswordStrengthBarComponent.prototype, "barLabel", void 0);
PasswordStrengthBarComponent = PasswordStrengthBarComponent_1 = __decorate([
    core_1.Component({
        selector: 'ng2-password-strength-bar',
        styles: ["\n    ul#strengthBar {\n        display:inline;\n        list-style:none;\n        margin:0;\n        margin-left:15px;\n        padding:0;\n        vertical-align:2px;\n    }\n    .point:last {\n        margin:0 !important;\n    }\n    .point {\n        background:#DDD;\n        border-radius:2px;\n        display:inline-block;\n        height:5px;\n        margin-right:1px;\n        width:20px;\n    }"],
        template: "\n    <div id=\"strength\" #strength>\n        <small>{{barLabel}}</small>\n        <ul id=\"strengthBar\">\n            <li class=\"point\" [style.background-color]=\"bar0\"></li><li class=\"point\" [style.background-color]=\"bar1\"></li><li class=\"point\" [style.background-color]=\"bar2\"></li><li class=\"point\" [style.background-color]=\"bar3\"></li><li class=\"point\" [style.background-color]=\"bar4\"></li>\n        </ul>\n\n        <div class=\"text-indicator\" [style.color]=\"bar0\">{{text}}</div>\n    </div>\n"
    })
], PasswordStrengthBarComponent);
exports.PasswordStrengthBarComponent = PasswordStrengthBarComponent;
var PasswordStrengthBarComponent_1;
//# sourceMappingURL=passwordStrengthBar.component.js.map