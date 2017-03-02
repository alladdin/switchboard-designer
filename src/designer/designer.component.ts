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

    onMouseDown(event: any):void {
        if (this.ui.tool_event){
            let e = this.ui.tool_event;

            if (e.mouse.buttons == 1){
                this.ui.selected = e.item;
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }

    onMouseMove(event: any){
        this.ui.cursor_pos.x = (event.offsetX*this.switchboard.width/event.currentTarget.width.baseVal.value).toFixed(1);
        this.ui.cursor_pos.y = (event.offsetY*this.switchboard.height/event.currentTarget.height.baseVal.value).toFixed(1);

        if (this.ui.tool_event && (this.ui.tool === 'MOVE') && this.ui.tool_event.item.moveable){
            this.onMoveItem(event);
        }
    }

    onMoveItem(event: any): void {
        var e = this.ui.tool_event;

        if (!e.mouse_start) {
            e.mouse_start = {
                x: this.ui.cursor_pos.x - e.item.abs_display_x,
                y: this.ui.cursor_pos.y - e.item.abs_display_y,
            };
        }

        if (
            !e.drag
            && (
                (Math.abs(event.screenX - e.mouse.screenX) > 2)
                || (Math.abs(event.screenY - e.mouse.screenY) > 2)
            )
        ){
            e.drag = true;
        }

        if (e.drag){
            if (e.acceptable_parent && (!e.item.parent_control || (e.acceptable_parent.id != e.item.parent_control.id)) ){
                e.item.changeParent(e.acceptable_parent);
            }

            var parent_coords = {
                x: 0,
                y: 0,
            };
            if (e.item.parent_control !== undefined){
                parent_coords.x = e.item.parent_control.abs_display_x;
                parent_coords.y = e.item.parent_control.abs_display_y;
            }
            e.item.x = this.ui.cursor_pos.x - parent_coords.x - e.mouse_start.x;
            e.item.y = this.ui.cursor_pos.y - parent_coords.y - e.mouse_start.y;
        }

        e.acceptable_parent = undefined;
    }

    onMouseUp(event: any):void {
        if (this.ui.tool_event){
            this.ui.tool_event = undefined;
        }
    }
}

