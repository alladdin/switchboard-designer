import { Component, Input, OnInit, HostListener } from '@angular/core';

import { SwitchBoard, Rail } from '../structures/all';
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
        <svg *ngIf="item"
            [attr.width]="(item.width * getZoom()) + 'mm'"
            [attr.height]="(item.height * getZoom()) + 'mm'"
        >
            <svg:defs>
                <svg:pattern id="din-rail-symbol" x="0" y="0" width="50mm" height="50mm" patternUnits="userSpaceOnUse"
                    [inlineSVG]="'images/din-rail-symbol.svg'"
                ></svg:pattern>
            </svg:defs>
            <svg:g ngClass="switchboard"
                [attr.transform]="'scale('+getZoom()+')'"
                [class.selected]="isSelected()"
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
                <svg:g Rail *ngFor="let rail of rails" [item]="rail" [ui]="ui" ></svg:g>
            </svg:g>
        </svg>
    `
})

export class SwitchBoardComponent extends ControlComponent implements OnInit {
    @Input() ui: any;
    @Input() id: string;
    item: SwitchBoard;

    rails: Rail[];

    constructor(
        private switchboard_service: SwitchBoardService
    ) { super() }

    loadSwitchBoard(): void {
        this.switchboard_service.getControl(this.id)
            .subscribe(control => {
                this.item = <SwitchBoard>control;
                this.loadRails();
            });
    }

    getZoom():number {
        return (this.ui.zoom.current * this.ui.zoom.current * 2 + 50)/140;
    }

    loadRails(): void {
        this.switchboard_service.getControls(this.item.rails)
            .subscribe(controls => {
                this.rails = <Rail[]>controls;
            });
    }

    ngOnInit(): void {
        this.loadSwitchBoard();
    }

    @HostListener('click', ['$event'])
    onClick(event: any): void {
        this.setSelected();
        event.preventDefault();
        event.stopPropagation();
    }
}
