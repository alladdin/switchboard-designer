import { Component, Input, OnInit } from '@angular/core';

import { Rail } from '../structures/all';
import { SwitchBoardService } from '../switchboard.service';
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
        <svg *ngIf="current_rail" ngClass="rail"
            [class.selected]="isSelected(current_rail)"
            (click)="setSelected($event, current_rail)"
            [attr.x]="current_rail.x + 'mm'"
            [attr.y]="current_rail.y + 'mm'"
            [attr.width]="current_rail.width + 'mm'"
            [attr.height]="current_rail.height + 'mm'"
        >
            <svg:rect class="rail-background"
                [attr.width]="current_rail.width + 'mm'"
                [attr.height]="current_rail.height + 'mm'"
                stroke="none"
                fill="#f99"
                fill-opacity="0"
            />
            <svg:rect
                [attr.x]="0"
                [attr.y]="((current_rail.height - 50)/2) + 'mm'"
                [attr.width]="current_rail.width + 'mm'"
                [attr.height]="'50mm'"
                stroke="none"
                fill="url(#din-rail-symbol)"
            />
            <svg:text ngClass="name"
                x="1mm"
                y="11mm"
            >
                {{current_rail.name}}
            </svg:text>
            <svg:g DINObject
                *ngFor="let item of current_rail.items"
                [parent_height]="current_rail.height"
                [id]="item"
                [ui]="ui"
            ></svg:g>
        </svg>
    `
})

export class RailComponent extends ControlComponent implements OnInit {
    @Input() id: string;
    current_rail: Rail;
    @Input() ui: any;

    constructor(
        private switchboard_service: SwitchBoardService
    ) { super() }

    loadRail(): void {
        this.switchboard_service.getControl(this.id)
            .subscribe(control => this.current_rail = <Rail>control);
    }

    ngOnInit(): void {
        this.loadRail();
    }
}

