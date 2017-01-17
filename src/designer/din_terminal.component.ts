import { Component, Input, OnInit } from '@angular/core';

import { DINTerminal } from '../structures/all';
import { ItemService } from '../item.service';
import { ControlComponent } from './control.component';
import { ParamsInterpolatePipe } from './params_interpolate.pipe';
import { SwitchBoardService } from '../switchboard.service';

@Component({
    selector: '[DINTerminal]',
    styles: [`
        .din-terminal {
            cursor: default;
        }

        .din-terminal .name {
            font-family: monospace;
            font-weight: normal;
            font-size: 4mm;
        }
    `],
    template: `
        <svg ngClass="din-terminal" *ngIf="device_type"
            [class.selected]="isSelected(item)"
            [attr.height]="parent_height + 'mm'"
            [attr.width]="device_type.width + 'mm'"
            [attr.y]="0"
            [attr.x]="item.x + 'mm'"
        >
            <svg:g>
                <svg ngClass="symbol"
                    (click)="setSelected($event, item)"
                    [inlineSVG]="'/data/'+ getSymbolPath()"
                    [attr.width]="device_type.symbol.width + 'mm'"
                    [attr.height]="device_type.symbol.height + 'mm'"
                    [attr.y]="getSymbolTop() + 'mm'"
                ></svg>
            </svg:g>
            <svg:text ngClass="name"
                (click)="setSelected($event, item)"
                [attr.x]="device_type.name.left + 'mm'"
                [attr.y]="(device_type.name.top + getSymbolTop()) + 'mm'"
                [attr.text-anchor]="device_type.name.text_anchor"
            >
                {{item.name}}
            </svg:text>
        </svg>
    `
})

export class DINTerminalComponent extends ControlComponent implements OnInit {
    @Input() id: string;
    private item: DINTerminal;
    @Input() parent_height: number;
    @Input() ui: any;
    device_type: any;

    constructor(
        private item_service: ItemService,
        private switchboard_service: SwitchBoardService
    ) { super() }

    loadItem(): void {
        this.switchboard_service.getControl(this.id)
            .subscribe(control => this.item = <DINTerminal>control);
    }

    loadDeviceType(): void {
        this.item_service.getItem(this.item.device_type).subscribe(device_type => this.device_type = device_type);
    }

    ngOnInit(): void {
        this.loadItem();
        this.loadDeviceType();
    }

    getSymbolPath(): void {
        return (new ParamsInterpolatePipe()).transform(this.device_type.symbol.file, this.item.device_params);
    }

    getSymbolTop(): number {
        return (this.parent_height/2 - this.device_type.symbol.y_origin);
    }
}

