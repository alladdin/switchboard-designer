import { Component, Input, OnInit } from '@angular/core';

import { DINTerminal } from '../structures/all';
import { Rail } from '../structures/all';
import { ItemService } from '../item.service';

@Component({
    selector: 'DINTerminal',
    styles: [`
        .din-terminal {
            position: relative;
            float: left;
        }

        .din-terminal .symbol {
            position: absolute;
            left: 0;
        }

        .din-terminal .name {
            position: absolute;
            padding: 0.5mm 1mm;
            font-family: monospace;
            font-weight: normal;
            display: block;
            z-index: 100;
            text-align: center;
            font-size: 4mm;
            line-height: 4.5mm;
        }
    `],
    template: `
        <div ngClass="din-terminal" *ngIf="device_type"
                    [style.height]="current_rail.height + 'mm'"
                    [style.width]="device_type.symbol.width + 'mm'">
            <span ngClass="name"
                    [style.left]="device_type.name.left + 'mm'"
                    [style.top]="device_type.name.top + 'mm'"
                    [style.bottom]="device_type.name.bottom + 'mm'"
                    [style.width]="device_type.name.width">
                {{item.local_name}}
            </span>
            <img ngClass="symbol" src="data/{{device_type.symbol.file | paramsInterpolate:item.device_params}}"
                [style.width]="device_type.symbol.width + 'mm'"
                [style.height]="device_type.symbol.height + 'mm'"
                [style.top]="(current_rail.height/2 - device_type.symbol.y_origin) + 'mm'">
        </div>
    `
})

export class DINTerminalComponent implements OnInit {
    @Input() item: DINTerminal;
    @Input() current_rail: Rail;
    device_type: any;

    constructor(
        private item_service: ItemService
    ) {}

    loadDeviceType(): void {
        this.item_service.getItem(this.item.device_type).then(device_type => this.device_type = device_type);
    }

    ngOnInit(): void {
        this.loadDeviceType();
    }
}

