import { Component, Input, OnInit } from '@angular/core';

import { DINObject } from '../structures/all';
import { Rail } from '../structures/all';

@Component({
    selector: 'DINObject',
    template: `
        <div [ngSwitch]="item.constructor.name">
            <DINDevice *ngSwitchCase="'DINDevice'" [item]="item" [current_rail]="current_rail"></DINDevice>
            <DINTerminal *ngSwitchCase="'DINTerminal'" [item]="item" [current_rail]="current_rail"></DINTerminal>
            <DINTerminalGroup *ngSwitchCase="'DINTerminalGroup'" [item]="item" [current_rail]="current_rail"></DINTerminalGroup>
            <div *ngSwitchDefault>Unknown: {{item.constructor.name}}</div>
        </div>
    `
})

export class DINObjectComponent {
    @Input() item: DINObject;
    @Input() current_rail: Rail;
}


