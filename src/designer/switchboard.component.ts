import { Component, Input, HostListener } from '@angular/core';

import { SwitchBoard } from '../structures/all';
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
            (mousemove)="onMouseMove($event)"
        >
            <svg:defs>
                <svg:pattern id="din-rail-symbol" x="0" y="0" width="50mm" height="50mm" patternUnits="userSpaceOnUse"
                    [inlineSVG]="'images/din-rail-symbol.svg'"
                ></svg:pattern>
            </svg:defs>
            <svg:g ngClass="switchboard"
                [attr.transform]="'scale('+getZoom()+')'"
                [class.selected]="isSelected()"
                [class.grab]="ui.tool_event && ui.tool_event.drag"
                [class.mode-move]="ui.tool === 'MOVE'"
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
                <svg:g Rail *ngFor="let rail of item.controls" [item]="rail" [ui]="ui" ></svg:g>
                <svg:g *ngIf="ui.selected">
                    <svg:g Dimension *ngIf="ui.selected.dimension_display.horizontal"
                        [outer_length]="ui.selected.parent_control.display.width"
                        [inner_length]="ui.selected.display.width"
                        [position]="ui.selected.display.x"
                        [x]="ui.selected.parent_control.abs_display_x"
                        [y]="ui.selected.abs_display_y
                            + ui.selected.display.height
                            + ui.selected.dimension_display.offset.y"
                        [spacing]="ui.selected.dimension_display.spacing.y"
                    ></svg:g>
                    <svg:g Dimension *ngIf="ui.selected.dimension_display.vertical"
                        [outer_length]="ui.selected.parent_control.display.height"
                        [inner_length]="ui.selected.display.height"
                        [position]="ui.selected.display.y"
                        [y]="ui.selected.parent_control.abs_display_y"
                        [x]="ui.selected.abs_display_x
                            - ui.selected.dimension_display.offset.x"
                        [spacing]="ui.selected.dimension_display.spacing.x"
                        [vertical]="true"
                    ></svg:g>
                </svg:g>
            </svg:g>
        </svg>
    `
})

export class SwitchBoardComponent extends ControlComponent {
    @Input() item: SwitchBoard;

    getZoom():number {
        return (this.ui.zoom.current * this.ui.zoom.current * 2 + 50)/140;
    }

    onMouseMove(event: any){
        this.ui.cursor_pos.x = (event.offsetX*this.item.width/event.currentTarget.width.baseVal.value).toFixed(1);
        this.ui.cursor_pos.y = (event.offsetY*this.item.height/event.currentTarget.height.baseVal.value).toFixed(1);

        if (this.ui.tool_event && (this.ui.tool === 'MOVE') && this.ui.tool_event.item.moveable){
            this.onMoveItem(event);
        }
    }

    onMoveItem(event: any): void {
        var e = this.ui.tool_event;

        if (!e.mouse_start) {
            e.mouse_start = {
                x: this.ui.cursor_pos.x,
                y: this.ui.cursor_pos.y,
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
            e.item.x += this.ui.cursor_pos.x - e.mouse_start.x;
            e.item.y += this.ui.cursor_pos.y - e.mouse_start.y;
            e.mouse_start = {
                x: this.ui.cursor_pos.x,
                y: this.ui.cursor_pos.y,
            };
        }
    }

    onMouseDown(event: any):void {
        super.onMouseDown(event);

        if (this.ui.tool_event){
            let e = this.ui.tool_event;

            if (e.mouse.buttons == 1){
                this.ui.selected = e.item;
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }

    onMouseUp(event: any):void {
        super.onMouseUp(event);
        this.mouseStop(event);
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave(event: any): void {
        this.mouseStop(event);
    }

    mouseStop(event: any){
        if (this.ui.tool_event){
            this.ui.tool_event = undefined;
        }
    }
}
