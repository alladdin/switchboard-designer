import { Component, Input, OnInit } from '@angular/core';

import { DINObject } from '../structures/all';
import { SwitchBoardService } from '../switchboard.service';

@Component({
    selector: '[DINObject]',
    template: `
        <svg:g *ngIf="item" [ngSwitch]="item.constructor.name">
            <svg:g DINDevice *ngSwitchCase="'DINDevice'" [item]="item" [parent_height]="parent_height" [ui]="ui"></svg:g>
            <svg:g DINTerminalGroup *ngSwitchCase="'DINTerminalGroup'" [item]="item" [parent_height]="parent_height" [ui]="ui"></svg:g>
            <svg:text *ngSwitchDefault>Unknown: {{item.constructor.name}}</svg:text>
        </svg:g>
    `
})

export class DINObjectComponent implements OnInit {
    @Input() id: string;
    @Input() parent_height: number;
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
