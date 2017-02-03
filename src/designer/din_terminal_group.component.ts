import { Component, Input } from '@angular/core';

import { DINTerminalGroup, DINTerminal } from '../structures/all';
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
            [class.selected]="isSelected()"
            [attr.width]="item.display.width + 'mm'"
            [attr.height]="(item.display.height - 40) + 'mm'"
            [attr.x]="item.display.x + 'mm'"
            y="20mm"
        >
            <svg:rect
                [attr.width]="item.display.width + 'mm'"
                [attr.height]="(item.display.height - 40) + 'mm'"
                stroke="none"
                fill="#f99"
                fill-opacity="0"
            />
            <svg:line
                [attr.x1]="0"
                [attr.y1]="0"
                [attr.x2]="0"
                [attr.y2]="(item.display.height - 40) + 'mm'"
                stroke-width="0.8mm"
                stroke="black"
                stroke-dasharray="3mm, 3mm"
            />
            <svg:g DINTerminal
                *ngFor="let control of item.controls"
                [item]="control"
                [ui]="ui"
            ></svg:g>
            <svg:text ngClass="name"
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

}
