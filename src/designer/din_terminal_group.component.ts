import { Component, Input } from '@angular/core';

import { DINTerminalGroup, DINTerminal } from '../structures/all';
import { ControlComponent } from './control.component';

@Component({
    selector: '[DINTerminalGroup]',
    styles: [`
    `],
    template: `
        <svg ngClass="din-terminal-group grabable"
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
            <svg ngClass="border"
                [attr.x]="0"
                [attr.y]="0"
                [attr.width]="item.display.width + 'mm'"
                [attr.height]="(item.display.height - 40) + 'mm'"
                [attr.viewBox]="'0 0 ' + item.display.width + ' ' + (item.display.height - 40)"
            >
                <svg:path
                    [attr.d]="
                        ' M 2 0 h -2 v 2'
                        +' M 2 ' + (item.display.height - 40) + ' h -2 v -2'
                        +' M ' + (item.display.width - 2) + ' 0 h 2 v 2'
                        +' M ' + (item.display.width - 2) + ' ' + (item.display.height - 40) + ' h 2 v -2'
                    "
                    [attr.fill]="'none'"
                />
            </svg>
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
            <svg:g *ngIf="item.dimension_error">
                <svg ngClass="dimension-error"
                    [inlineSVG]="'/images/exclamation-triangle.svg'"
                    [attr.x]="(item.display.width - 7)/2 +'mm'"
                    y="18mm"
                    width="7mm"
                    height="7mm"
                ></svg>
            </svg:g>
        </svg>
    `
})

export class DINTerminalGroupComponent extends ControlComponent {
    @Input() item: DINTerminalGroup;

}
