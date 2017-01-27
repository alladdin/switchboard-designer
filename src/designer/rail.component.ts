import { Component, Input, OnInit, HostListener } from '@angular/core';

import { Rail, DINObject } from '../structures/all';
import { SwitchBoardService } from '../switchboard.service';
import { ControlComponent } from './control.component';

@Component({
    selector: '[Rail]',
    styles: [`
        .rail {
            cursor: default;
        }

        .rail.selected > rect.rail-background {
            fill-opacity: 0.4 !important;
        }

        .rail > .name {
            font-size: 10mm;
            font-weight: bold;
        }
    `],
    template: `
        <svg *ngIf="item" ngClass="rail"
            [class.selected]="isSelected()"
            [attr.x]="item.x + 'mm'"
            [attr.y]="item.y + 'mm'"
            [attr.width]="item.width + 'mm'"
            [attr.height]="item.height + 'mm'"
        >
            <svg:rect class="rail-background"
                [attr.width]="item.width + 'mm'"
                [attr.height]="item.height + 'mm'"
                stroke="none"
                fill="#f99"
                fill-opacity="0"
            />
            <svg:rect
                [attr.x]="0"
                [attr.y]="((item.height - 50)/2) + 'mm'"
                [attr.width]="item.width + 'mm'"
                [attr.height]="'50mm'"
                stroke="none"
                fill="url(#din-rail-symbol)"
            />
            <svg:text ngClass="name"
                x="1mm"
                y="11mm"
            >
                {{item.name}}
            </svg:text>
            <svg:g DINObject
                *ngFor="let object of getOrderedList()"
                [parent_height]="item.height"
                [item]="object.item"
                [ui]="ui"
                [corrected_x]="object.corrected_x"
            ></svg:g>
        </svg>
    `
})

export class RailComponent extends ControlComponent implements OnInit {
    @Input() item: Rail;

    items: DINObject[];

    constructor(
        private switchboard_service: SwitchBoardService
    ) { super() }

    loadItems(): void {
        this.switchboard_service.getControls(this.item.items)
            .subscribe(controls => {
                this.items = <DINObject[]>controls;
            });
    }

    ngOnInit(): void {
        this.loadItems();
    }

    getOrderedList(): any[] {
        let last_x = 0;
        return this.getSortedItems().map(item => {
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

    private getSortedItems(): any[] {
        if (!this.items){
            return [];
        }
        let list: any[] = this.items.slice();
        list.sort((a, b) => a.x - b.x);
        return list;
    }
}

