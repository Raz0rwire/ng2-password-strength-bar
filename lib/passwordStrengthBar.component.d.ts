import { OnChanges, SimpleChange } from '@angular/core';
export declare class PasswordStrengthBarComponent implements OnChanges {
    passwordToCheck: string;
    barLabel: string;
    bar0: string;
    bar1: string;
    bar2: string;
    bar3: string;
    bar4: string;
    text: string;
    private colors;
    private static measureStrength(p);
    private getColor(s);
    getStrengthIndexAndColor(password: string): {
        idx: number;
        col: string;
        text: string;
    };
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    private setBarColors(count, col, text?);
}
