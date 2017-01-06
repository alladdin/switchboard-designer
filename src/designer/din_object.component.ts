import { Component, Input, OnInit } from '@angular/core';

import { DINObject } from '../structures/all';
import { SwitchBoardService } from '../switchboard.service';
import { Rail } from '../structures/all';

@Component({
    selector: 'DINObject',
    template: `
        <div *ngIf="item" [ngSwitch]="item.constructor.name">
            <DINDevice *ngSwitchCase="'DINDevice'" [item]="item" [current_rail]="current_rail" [ui]="ui"></DINDevice>
            <DINTerminalGroup *ngSwitchCase="'DINTerminalGroup'" [item]="item" [current_rail]="current_rail" [ui]="ui"></DINTerminalGroup>
            <div *ngSwitchDefault>Unknown: {{item.constructor.name}}</div>
        </div>
    `
})

export class DINObjectComponent implements OnInit {
    @Input() id: string;
    @Input() current_rail: Rail;
    @Input() ui: any;
    private item: DINObject;

    constructor(
        private switchboard_service: SwitchBoardService
    ) { }

    loadItem(): void {
        this.switchboard_service.getControl(this.id)
            .subscribe(control => this.item = <DINObject>control);
    }

    ngOnInit(): void {
        this.loadItem();
    }
}
