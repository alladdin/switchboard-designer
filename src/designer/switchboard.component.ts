import { Component, Input, OnInit } from '@angular/core';

import { SwitchBoard } from '../structures/all';
import { SwitchBoardService } from '../switchboard.service';
import { ControlComponent } from './control.component';

@Component({
    selector: 'SwitchBoard',
    styles: [`
        .switchboard {
            display: block;
            position: relative;
            background-color: #eee;
            border: 0.8mm solid #999;
            transform-origin: 0 0;
        }

        .switchboard > h2 {
            position: absolute;
            display: block;
            top: 2mm;
            left: 2mm;
            z-index:100;
            line-height: 1em;
            margin: 0;
            padding 0;
            font-size: 3em;
        }

        .switchboard.selected {
            border: 0.8mm solid rgba(255,92,92,0.8);
            /*background-color: rgba(255,128,128,0.4);*/
        }
    `],
    template: `
        <div *ngIf="current_switchboard" ngClass="switchboard"
                [style.transform]="'scale('+(this.ui.zoom.current * this.ui.zoom.current * 2 + 50)/140+')'"
                [class.selected]="isSelected(current_switchboard)"
                (click)="setSelected($event, current_switchboard)"
                [style.width]="current_switchboard.width + 'mm'"
                [style.height]="current_switchboard.height + 'mm'">
            <h2 (click)="setSelected($event, current_switchboard)">{{current_switchboard.name}}</h2>
            <Rail *ngFor="let rail of current_switchboard.rails" [id]="rail" [ui]="ui" ></Rail>
        </div>
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

    ngOnInit(): void {
        this.loadSwitchBoard();
    }
}
