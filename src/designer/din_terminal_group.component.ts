import { Component, Input } from '@angular/core';

import { DINTerminalGroup, DINTerminal } from '../structures/all';
import { ControlComponent } from './control.component';

@Component({
    selector: '[DINTerminalGroup]',
    styles: [`
        .din-terminal-group {
            position: relative;
            float: left;
            border-left: 0.4mm dashed gray;
            cursor: default;
        }

        .din-terminal-group.selected > rect {
            fill-opacity: 0.4 !important;
        }

        .din-terminal-group .name {
            font-family: monospace;
            font-weight: bold;
            font-size: 5mm;
        }
    `],
    template: `
        <svg ngClass="din-terminal-group"
            [class.selected]="isSelected()"
            [attr.width]="getItemWidth() + 'mm'"
            [attr.height]="(parent_height - 40) + 'mm'"
            [attr.x]="corrected_x + 'mm'"
            y="20mm"
        >
            <svg:rect
                [attr.width]="getItemWidth() + 'mm'"
                [attr.height]="(parent_height - 40) + 'mm'"
                stroke="none"
                fill="#f99"
                fill-opacity="0"
            />
            <svg:line
                [attr.x1]="0"
                [attr.y1]="0"
                [attr.x2]="0"
                [attr.y2]="(parent_height - 40) + 'mm'"
                stroke-width="0.8mm"
                stroke="black"
                stroke-dasharray="3mm, 3mm"
            />
            <svg:g DINTerminal
                *ngFor="let terminal of display_terminals"
                [parent_height]="parent_height - 40"
                [item]="terminal.item"
                [ui]="ui"
                [corrected_x]="terminal.corrected_x"
            ></svg:g>
            <svg:text ngClass="name"
                (click)="setSelected($event, item)"
                x="1mm"
                y="20mm"
            >
                {{item.name}}
            </svg:text>
        </svg>
    `
})

export class DINTerminalGroupComponent extends ControlComponent {
    @Input() item: DINTerminalGroup;
    @Input() parent_height: number;
    @Input() corrected_x: number;

    private display_terminals: any[] = [];
    private all_terminals_width: number = 0;
    private item_width: number = 0;

    ngDoCheck() {
        let new_terminals_width = this.displayTerminalsIdent();
        if( this.all_terminals_width !== new_terminals_width ){
            this.all_terminals_width = new_terminals_width;
            this. updateDisplayTerminals();
        }
    }

    getItemWidth(): number {
        this.item.width = this.item_width;
        return this.item.width;
    }

    displayTerminalsIdent(): number {
        if (!this.item.controls){
            return 0;
        }
        return this.item.controls.map(item => item.x + item.width).reduce((a, b) => a+b);
    }

    updateDisplayTerminals(): void {
        this.item_width = this.calculateWidth();
        this.display_terminals = this.getOrderedList();
    }

    getOrderedList(): any[] {
        let last_x = 0;
        return this.getSortedTerminals().map(item => {
                if (last_x < item.x) {
                    last_x = item.x;
                }
                let ret = {
                    'corrected_x': last_x,
                    'item': item,
                };
                last_x += item.width;
                return ret;
            });
    }

    calculateWidth(): number {
        let last_x = 0;
        for (let item of this.getSortedTerminals()) {
            if (last_x < item.x) {
                last_x = item.x;
            }
            last_x += item.width;
        }
        return last_x;
    }

    private getSortedTerminals(): any[] {
        if (!this.item.controls){
            return [];
        }
        let list: any[] = this.item.controls.slice();
        list.sort((a, b) => a.x - b.x);
        return list;
    }
}
