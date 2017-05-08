import {Component, OnChanges, Input, SimpleChange} from '@angular/core';

@Component({
    selector: 'ng2-password-strength-bar',
    styles: [`
    ul#strengthBar {
        display:inline;
        list-style:none;
        margin:0;
        margin-left:15px;
        padding:0;
        vertical-align:2px;
    }
    .point:last {
        margin:0 !important;
    }
    .point {
        background:#DDD;
        border-radius:2px;
        display:inline-block;
        height:5px;
        margin-right:1px;
        width:20px;
    }`],
    template: `
    <div id="strength" #strength>
        <small>{{barLabel}}</small>
        <ul id="strengthBar">
            <li class="point" [style.background-color]="bar0"></li><li class="point" [style.background-color]="bar1"></li><li class="point" [style.background-color]="bar2"></li><li class="point" [style.background-color]="bar3"></li><li class="point" [style.background-color]="bar4"></li>
        </ul>

        <div class="text-indicator" [style.color]="bar0">{{text}}</div>
    </div>
`
})
export class PasswordStrengthBarComponent implements OnChanges {
    @Input() passwordToCheck: string;
    @Input() barLabel: string;
    bar0: string;
    bar1: string;
    bar2: string;
    bar3: string;
    bar4: string;
    text: string;

    private colors = ['#cc3333', '#ff9900', '#ffcc00', '#99cc00', '#70e435'];

    private static measureStrength(p: string) {
        let _force = 0;
        const _regex = /[-[\]{}!@%&_=~()*+?.,\/\\^$|#\s]/g; // "

        const _lowerLetters = /[a-z]+/.test(p);
        const _upperLetters = /[A-Z]+/.test(p);
        const _numbers = /[0-9]+/.test(p);
        const _symbols = _regex.test(p);
        const _spaces = /\s/g.test(p);

        const _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];

        let _passedMatches = 0;
        for (let _flag of _flags) {
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
        _force = (_passedMatches === 4 && _force  <= 58) ? Math.min(_force, 40) : _force;

        // penalty for spaces
        _force = _spaces ? 0 : _force;

        return _force;

    }
    private getColor(s: number) {
        let idx = 0;
        let strength = '';

        if (s <= 10) {
            idx = 0;
            strength = 'Very weak'
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
    }

    getStrengthIndexAndColor(password: string) {
        return this.getColor(PasswordStrengthBarComponent.measureStrength(password));
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
        let password = changes['passwordToCheck'].currentValue;
        this.setBarColors(5, '#758694');
        if (password) {
            let c = this.getStrengthIndexAndColor(password);
            this.setBarColors(c.idx, c.col, c.text);
        }
    }
    private setBarColors(count: number, col: string, text?: string) {
        for (let _n = 0; _n < count; _n++) {
            this['bar' + _n] = col;
        }

        this.text = text;
    }
}
