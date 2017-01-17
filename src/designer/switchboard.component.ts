import { Component, Input, OnInit } from '@angular/core';

import { SwitchBoard } from '../structures/all';
import { SwitchBoardService } from '../switchboard.service';
import { ControlComponent } from './control.component';

@Component({
    selector: 'SwitchBoard',
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
        <svg *ngIf="current_switchboard"
            [attr.width]="(current_switchboard.width * getZoom()) + 'mm'"
            [attr.height]="(current_switchboard.height * getZoom()) + 'mm'"
        >
            <svg:defs>
                <svg:pattern id="din-rail-symbol" x="0" y="0" width="50mm" height="50mm" patternUnits="userSpaceOnUse"
                    [inlineSVG]="'images/din-rail-symbol.svg'"
                ></svg:pattern>
            </svg:defs>
            <svg:g ngClass="switchboard"
                [attr.transform]="'scale('+getZoom()+')'"
                [class.selected]="isSelected(current_switchboard)"
                (click)="setSelected($event, current_switchboard)"
            >
                <svg:rect
                    [attr.width]="current_switchboard.width + 'mm'"
                    [attr.height]="current_switchboard.height + 'mm'"
                    stroke="#999"
                    stroke-width="2mm"
                    fill="#eee"
                />
                <svg:text ngClass="name"
                    x="5mm"
                    y="20mm"
                >
                    {{current_switchboard.name}}
                </svg:text>
                <svg:g Rail *ngFor="let rail of current_switchboard.rails" [id]="rail" [ui]="ui" ></svg:g>
            </svg:g>
        </svg>
    `
})

export class SwitchBoardComponent extends ControlComponent implements OnInit {
    @Input() ui: any;
    @Input() id: string;
    current_switchboard: SwitchBoard;

    constructor(
        private switchboard_service: SwitchBoardService
    ) { super() }

    loadSwitchBoard(): void {
        this.switchboard_service.getControl(this.id)
            .subscribe(control => this.current_switchboard = <SwitchBoard>control);
    }

    getZoom():number {
        return (this.ui.zoom.current * this.ui.zoom.current * 2 + 50)/140;
    }

    ngOnInit(): void {
        this.loadSwitchBoard();
    }
}
