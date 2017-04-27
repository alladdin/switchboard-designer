import { Component, Input } from '@angular/core';

import { SwitchBoard } from '../structures/all';

@Component({
    selector: 'Designer',
    styles: [`
    `],
    template: `
        <svg *ngIf="switchboard"
            [attr.width]="(switchboard.width * getZoom()) + 'mm'"
            [attr.height]="(switchboard.height * getZoom()) + 'mm'"
            (mousemove)="onMouseMove($event)"
            (mousedown)="onMouseDown($event)"
            (mouseup)="onMouseUp($event)"
            (mouseleave)="onMouseUp($event)"
        >
            <svg:defs>
                <svg:pattern id="din-rail-symbol" x="0" y="0" width="50mm" height="50mm" patternUnits="userSpaceOnUse"
                    [inlineSVG]="'images/din-rail-symbol.svg'"
                ></svg:pattern>
            </svg:defs>
            <svg [inlineSVG]="'images/screw-heads.svg'"></svg>
            <svg:g SwitchBoard *ngIf="switchboard" [ui]="ui" [item]="switchboard"
                [attr.transform]="'scale('+getZoom()+')'"
            ></svg:g>
        </svg>
    `
})

export class DesignerComponent {
    @Input() switchboard: SwitchBoard;
    @Input() ui: any;

    getZoom():number {
        return (this.ui.zoom.current * this.ui.zoom.current * 2 + 50)/140;
    }

    onMouseDown(event: any): void {
        if (this.ui.action){
            this.ui.action.designerMouseDown(event);
        }
    }

    onMouseMove(event: any): void {
        this.ui.cursor_pos.x = (event.offsetX*this.switchboard.width/event.currentTarget.width.baseVal.value).toFixed(1);
        this.ui.cursor_pos.y = (event.offsetY*this.switchboard.height/event.currentTarget.height.baseVal.value).toFixed(1);

        if (this.ui.action){
            this.ui.action.designerMouseMove(event, this.ui.cursor_pos.x, this.ui.cursor_pos.y);
        }
    }

    onMouseUp(event: any): void {
        if (this.ui.action){
            this.ui.action.designerMouseUp(event);
        }
    }
}

