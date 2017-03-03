import { Component, Input, HostListener } from '@angular/core';

import { SwitchBoard } from '../structures/all';
import { ControlComponent } from './control.component';

@Component({
    selector: '[SwitchBoard]',
    styles: [`
        .switchboard {
            cursor: default;
        }

        .switchboard > .name {
            font-size: 15mm;
            font-weight: bold;
        }

        .switchboard.selected > rect {
            stroke: rgba(255,92,92,0.8) !important;
        }
    `],
    template: `
        <svg:g ngClass="switchboard"
            [class.selected]="isSelected()"
            [class.grab]="ui.action && ui.action.in_drag"
            [class.mode-move]="ui.tool === 'MOVE'"
        >
            <svg:rect
                [attr.width]="item.width + 'mm'"
                [attr.height]="item.height + 'mm'"
                stroke="#999"
                stroke-width="2mm"
                fill="#eee"
            />
            <svg:text ngClass="name"
                x="5mm"
                y="20mm"
            >
                {{item.name}}
            </svg:text>
            <svg:g Rail *ngFor="let rail of item.controls" [item]="rail" [ui]="ui" ></svg:g>
            <svg:g *ngIf="ui.selected">
                <svg:g Dimension *ngIf="ui.selected.dimension_display.horizontal"
                    [outer_length]="ui.selected.parent_control.display.width"
                    [inner_length]="ui.selected.display.width"
                    [position]="ui.selected.display.x"
                    [x]="ui.selected.parent_control.abs_display_x"
                    [y]="ui.selected.abs_display_y
                        + ui.selected.display.height
                        + ui.selected.dimension_display.offset.y"
                    [spacing]="ui.selected.dimension_display.spacing.y"
                ></svg:g>
                <svg:g Dimension *ngIf="ui.selected.dimension_display.vertical"
                    [outer_length]="ui.selected.parent_control.display.height"
                    [inner_length]="ui.selected.display.height"
                    [position]="ui.selected.display.y"
                    [y]="ui.selected.parent_control.abs_display_y"
                    [x]="ui.selected.abs_display_x
                        - ui.selected.dimension_display.offset.x"
                    [spacing]="ui.selected.dimension_display.spacing.x"
                    [vertical]="true"
                ></svg:g>
            </svg:g>
        </svg:g>
    `
})

export class SwitchBoardComponent extends ControlComponent {
    @Input() item: SwitchBoard;
}
