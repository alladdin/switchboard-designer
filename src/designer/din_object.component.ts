import { Component, Input } from '@angular/core';

import { DINObject } from '../structures/all';

@Component({
    selector: '[DINObject]',
    template: `
        <svg:g *ngIf="item" [ngSwitch]="item.constructor.name">
            <svg:g DINDevice *ngSwitchCase="'DINDevice'"
                [item]="item"
                [parent_height]="parent_height"
                [ui]="ui"
                [corrected_x]="corrected_x"
            ></svg:g>
            <svg:g DINTerminalGroup *ngSwitchCase="'DINTerminalGroup'"
                [item]="item"
                [parent_height]="parent_height"
                [ui]="ui"
                [corrected_x]="corrected_x"
            ></svg:g>
            <svg:g DINTerminal *ngSwitchCase="'DINTerminal'"
                [item]="item"
                [parent_height]="parent_height - 40"
                [ui]="ui"
                [corrected_x]="corrected_x"
            ></svg:g>
            <svg:text *ngSwitchDefault>Unknown: {{item.constructor.name}}</svg:text>
        </svg:g>
    `
})

export class DINObjectComponent {
    @Input() parent_height: number;
    @Input() ui: any;
    @Input() item: DINObject;
    @Input() corrected_x: number;
}
