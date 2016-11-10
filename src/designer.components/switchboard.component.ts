import { Component, OnInit, Input } from '@angular/core';

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
        }

        .switchboard.selected {
            border: 0.8mm solid rgba(255,92,92,0.8);
        }
    `],
    template: `
        <div *ngIf="current_switchboard" ngClass="switchboard"
                [class.selected]="isSelected(current_switchboard)"
                (click)="setSelected($event, [current_switchboard])"
                [style.width]="current_switchboard.width + 'mm'"
                [style.height]="current_switchboard.height + 'mm'">
            <h2 (click)="setSelected($event, [current_switchboard])">{{current_switchboard.name}}</h2>
            <Rail *ngFor="let rail of current_switchboard.rails" [current_rail]="rail" [ui]="ui" ></Rail>
        </div>
    `
})

export class SwitchBoardComponent extends ControlComponent implements OnInit {
    @Input() ui: any;
    current_switchboard: SwitchBoard;

    constructor(
        private switchboard_service: SwitchBoardService
    ) { super() }

    loadSwitchBoard(): void {
        this.switchboard_service.getSwitchBoard(1).then(switchboard => this.current_switchboard = switchboard);
    }

    ngOnInit(): void {
        this.loadSwitchBoard();
    }
}
