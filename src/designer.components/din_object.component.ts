import { Component, Input } from '@angular/core';

import { DINObject } from '../structures/all';
import { Rail } from '../structures/all';

@Component({
    selector: 'DINObject',
    template: `
        <div [ngSwitch]="item.constructor.name">
            <DINDevice *ngSwitchCase="'DINDevice'" [item]="item" [current_rail]="current_rail" [ui]="ui"></DINDevice>
            <DINTerminal *ngSwitchCase="'DINTerminal'" [item]="item" [current_rail]="current_rail" [ui]="ui"></DINTerminal>
            <DINTerminalGroup *ngSwitchCase="'DINTerminalGroup'" [item]="item" [current_rail]="current_rail" [ui]="ui"></DINTerminalGroup>
            <div *ngSwitchDefault>Unknown: {{item.constructor.name}}</div>
        </div>
    `
})

export class DINObjectComponent {
    @Input() item: DINObject;
    @Input() current_rail: Rail;
    @Input() ui: any;
}
