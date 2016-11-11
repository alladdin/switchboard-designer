import { Component, OnInit } from '@angular/core';

import { SwitchBoard } from './structures/all';
import { SwitchBoardService } from './switchboard.service';

@Component({
    selector: 'my-app',
    styles: [`
        .top-toolbar {
            position: fixed;
            right: 30px;
            top: 30px;
        }

        .top-toolbar .button {
            cursor: pointer;
        }

        .top-toolbar .button circle {
            fill: rgb(32,32,192);
        }

        .top-toolbar .button text {
            fill: rgb(255,255,255);
        }

        .top-toolbar .button:hover circle {
            fill: rgb(64,64,221);
        }

        .top-toolbar .zoom path {
            fill: rgba(0,0,128,0.4);
            stroke: rgba(0,0,128,0.4);
            stroke-width: 1;
        }

        .top-toolbar .zoom text {
            fill: rgb(255,255,255);
        }
    `],
    template: `
        <div class="side app-panel">
            <h1>Switchboard designer</h1>
        </div>
        <div class="main app-panel">
            <SwitchBoard [ui]="ui" [current_switchboard]="current_switchboard"></SwitchBoard>
            <div ngClass="top-toolbar">
                <svg width="140" height="60">
                    <g class="zoom">
                        <path d="M 30 0 h 80 a 30 30 0 0 0 0 60 h -80 a 30 30 0 0 0 0 -60 z" />
                        <text x="70" y="37" text-anchor="middle" font-size="20">{{ui.zoom.current}}</text>
                    </g>
                    <g class="button" (click)="zoomIn($event)" (mousedown)="$event.preventDefault()">
                        <circle cx="30" cy="30" r="30" />
                        <text x="30" y="40" text-anchor="middle" font-size="30">+</text>
                    </g>
                    <g class="button" (click)="zoomOut($event)" (mousedown)="$event.preventDefault()">
                        <circle cx="110" cy="30" r="30" />
                        <text x="110" y="40" text-anchor="middle" font-size="30">&minus;</text>
                    </g>
                </svg>
            </div>
        </div>
    `
})

export class AppComponent implements OnInit {
    public ui: any = {
        selected: [],
        zoom: {
            current: 5,
            min: 1,
            max: 9
        }
    };
    public current_switchboard: SwitchBoard;

    constructor(
        private switchboard_service: SwitchBoardService
    ) {}

    loadSwitchBoard(): void {
        this.switchboard_service.getSwitchBoard(1).then(switchboard => this.current_switchboard = switchboard);
    }

    ngOnInit(): void {
        this.loadSwitchBoard();
    }

    zoomIn(event: any): void {
        event.preventDefault();
        event.stopPropagation();
        if (this.ui.zoom.current < this.ui.zoom.max){
            this.ui.zoom.current++;
        }
    }

    zoomOut(event: any): void {
        event.preventDefault();
        event.stopPropagation();
        if (this.ui.zoom.current > this.ui.zoom.min){
            this.ui.zoom.current--;
        }
    }
}
