import { Component, Input, OnInit, HostListener } from '@angular/core';

import { DINTerminalGroup, DINTerminal } from '../structures/all';
import { ControlComponent } from './control.component';
import { SwitchBoardService } from '../switchboard.service';

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
            [attr.width]="reCalculateWidth() + 'mm'"
            [attr.height]="(parent_height - 40) + 'mm'"
            [attr.x]="corrected_x + 'mm'"
            y="20mm"
        >
            <svg:rect
                [attr.width]="reCalculateWidth() + 'mm'"
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
                *ngFor="let terminal of getOrderedList()"
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

export class DINTerminalGroupComponent extends ControlComponent implements OnInit {
    @Input() item: DINTerminalGroup;
    @Input() parent_height: number;
    @Input() ui: any;
    @Input() corrected_x: number;

    terminals: DINTerminal[];

    constructor(
        private switchboard_service: SwitchBoardService
    ) { super() }

    ngOnInit(): void {
        this.loadTerminals();
    }

    loadTerminals(): void {
        this.switchboard_service.getControls(this.item.terminals)
            .subscribe(controls => {
                this.terminals = <DINTerminal[]>controls;
                this.reCalculateWidth();
            });
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

    reCalculateWidth(): number {
        let last_x = 0;
        for (let item of this.getSortedTerminals()) {
            if (last_x < item.x) {
                last_x = item.x;
            }
            last_x += item.width;
        }
        this.item.width = last_x;
        return this.item.width;
    }

    private getSortedTerminals(): any[] {
        if (!this.terminals){
            return [];
        }
        let list: any[] = this.terminals.slice();
        list.sort((a, b) => a.x - b.x);
        return list;
    }

    @HostListener('click', ['$event'])
    onClick(event: any): void {
        this.setSelected();
        event.preventDefault();
        event.stopPropagation();
    }
}
