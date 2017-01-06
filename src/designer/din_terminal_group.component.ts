import { Component, Input } from '@angular/core';

import { DINTerminalGroup } from '../structures/all';
import { Rail } from '../structures/all';
import { ItemService } from '../item.service';
import { ControlComponent } from './control.component';

@Component({
    selector: 'DINTerminalGroup',
    styles: [`
        .din-terminal-group {
            position: relative;
            float: left;
            border-left: 0.4mm dashed gray;
        }

        .din-terminal-group.selected {
            background-color: rgba(255,128,128,0.4);
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
        <div ngClass="din-terminal-group"
                    [class.selected]="isSelected(item)"
                    (click)="setSelected($event, item)"
                    [style.height]="current_rail.height + 'mm'">
            <span ngClass="name"
                    (click)="setSelected($event, item)">
                {{item.name}}
            </span>
            <DINTerminal *ngFor="let terminal of item.terminals" [current_rail]="current_rail" [id]="terminal" [ui]="ui" ></DINTerminal>
        </div>
    `
})

export class DINTerminalGroupComponent extends ControlComponent {
    @Input() item: DINTerminalGroup;
    @Input() current_rail: Rail;
    @Input() ui: any;

    constructor (
    ){ super() }
}
