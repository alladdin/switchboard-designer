import { Component, OnInit } from '@angular/core';

import { SwitchBoard } from '../structures/all';
import { SwitchBoardService } from '../switchboard.service';

@Component({
    selector: 'SwitchBoard',
    styles: [`
        .switchboard {
            display: block;
            position: relative;
            background-color: #eee;
        }
    `],
    template: `
        <div *ngIf="current_switchboard" ngClass="switchboard"
                [style.width]="current_switchboard.width + 'mm'"
                [style.height]="current_switchboard.height + 'mm'">
            <h2>{{current_switchboard.name}}</h2>
            <Rail *ngFor="let rail of current_switchboard.rails" [current_rail]="rail" ></Rail>
        </div>
    `
})

export class SwitchBoardComponent implements OnInit {
    current_switchboard: SwitchBoard;

    constructor(
        private switchboard_service: SwitchBoardService
    ) {}

    loadSwitchBoard(): void {
        this.switchboard_service.getSwitchBoard(1).then(switchboard => this.current_switchboard = switchboard);
    }

    ngOnInit(): void {
        this.loadSwitchBoard();
    }
}
