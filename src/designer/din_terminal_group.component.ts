import { Component, Input } from '@angular/core';

import { DINTerminalGroup } from '../structures/all';
import { ItemService } from '../item.service';
import { ControlComponent } from './control.component';

@Component({
    selector: '[DINTerminalGroup]',
    styles: [`
        .din-terminal-group {
            position: relative;
            float: left;
            border-left: 0.4mm dashed gray;
            cursor: default;
        }

        .din-terminal-group.selected > rect {
            fill-opacity: 0.4 !important;
        }

        .din-terminal-group .name {
            font-family: monospace;
            font-weight: bold;
            font-size: 5mm;
        }
    `],
    template: `
        <svg ngClass="din-terminal-group"
            [class.selected]="isSelected(item)"
            (click)="setSelected($event, item)"
            [attr.width]="item.width + 'mm'"
            [attr.height]="(parent_height - 40) + 'mm'"
            [attr.x]="item.x + 'mm'"
            y="20mm"
        >
            <svg:rect
                [attr.width]="item.width + 'mm'"
                [attr.height]="(parent_height - 40) + 'mm'"
                stroke="none"
                fill="#f99"
                fill-opacity="0"
            />
            <svg:line
                [attr.x1]="0"
                [attr.y1]="0"
                [attr.x2]="0"
                [attr.y2]="(parent_height - 40) + 'mm'"
                stroke-width="0.8mm"
                stroke="black"
                stroke-dasharray="3mm, 3mm"
            />
            <svg:g DINTerminal
                *ngFor="let terminal of item.terminals"
                [parent_height]="parent_height - 40"
                [id]="terminal"
                [ui]="ui"
            ></svg:g>
            <svg:text ngClass="name"
                (click)="setSelected($event, item)"
                x="1mm"
                y="20mm"
            >
                {{item.name}}
            </svg:text>
        </svg>
    `
})

export class DINTerminalGroupComponent extends ControlComponent {
    @Input() item: DINTerminalGroup;
    @Input() parent_height: number;
    @Input() ui: any;

    constructor (
    ){ super() }
}
