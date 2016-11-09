import { Component, Input } from '@angular/core';

import { DINTerminalGroup } from '../structures/all';
import { Rail } from '../structures/all';
import { ItemService } from '../item.service';

@Component({
    selector: 'DINTerminalGroup',
    styles: [`
        .din-terminal-group {
            position: relative;
            float: left;
            border-left: 0.4mm dashed gray;
        }

        .din-terminal-group .name {
            position: absolute;
            top: 40mm;
            width: 100%;
            padding: 0.5mm 1mm;
            font-family: monospace;
            font-weight: bold;
            display: block;
            z-index: 50;
            font-size: 5mm;
            line-height: 5.5mm;
        }
    `],
    template: `
        <div ngClass="din-terminal-group" [style.height]="current_rail.height + 'mm'">
            <span ngClass="name">{{item.group_name}}{{item.group_id}}</span>
            <DINTerminal *ngFor="let terminal of item.terminals" [current_rail]="current_rail" [item]="terminal" ></DINTerminal>
        </div>
    `
})

export class DINTerminalGroupComponent {
    @Input() item: DINTerminalGroup;
    @Input() current_rail: Rail;
}
