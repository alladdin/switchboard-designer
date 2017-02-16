import { Component, Input } from '@angular/core';

import { Rail, Control } from '../structures/all';
import { ControlComponent } from './control.component';

@Component({
    selector: '[Rail]',
    styles: [`
        .rail {
            cursor: default;
        }

        .rail.selected > rect.rail-background {
            fill-opacity: 0.4 !important;
        }

        .rail > .name {
            font-size: 10mm;
            font-weight: bold;
        }
    `],
    template: `
        <svg *ngIf="item" ngClass="rail"
            [class.selected]="isSelected()"
            [attr.x]="item.display.x + 'mm'"
            [attr.y]="item.display.y + 'mm'"
            [attr.width]="item.display.width + 'mm'"
            [attr.height]="item.display.height + 'mm'"
        >
            <svg:rect class="rail-background"
                [attr.width]="item.display.width + 'mm'"
                [attr.height]="item.display.height + 'mm'"
                stroke="none"
                fill="#f99"
                fill-opacity="0"
            />
            <svg:rect
                [attr.x]="0"
                [attr.y]="((item.display.height - 50)/2) + 'mm'"
                [attr.width]="item.display.width + 'mm'"
                [attr.height]="'50mm'"
                stroke="none"
                fill="url(#din-rail-symbol)"
            />
            <svg:g *ngIf="item.dimension_error">
                <svg ngClass="dimension-error"
                    [inlineSVG]="'/images/exclamation-triangle.svg'"
                    x="1mm"
                    y="7mm"
                    width="15mm"
                    height="15mm"
                ></svg>
            </svg:g>
            <svg:text ngClass="name"
                x="1mm"
                y="11mm"
            >
                {{item.name}}
            </svg:text>
            <svg:g DINObject
                *ngFor="let control of item.controls"
                [item]="control"
                [ui]="ui"
            ></svg:g>
        </svg>
    `
})

export class RailComponent extends ControlComponent {
    @Input() item: Rail;

}

