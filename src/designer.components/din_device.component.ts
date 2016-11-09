import { Component, Input, OnInit } from '@angular/core';

import { DINDevice } from '../structures/all';
import { Rail } from '../structures/all';
import { ItemService } from '../item.service';

@Component({
    selector: 'DINDevice',
    styles: [`
        .din-device {
            position: relative;
            float: left;
        }

        .din-device.selected {
            background-color: rgba(255,128,128,0.4);
        }

        .din-device .symbol {
            position: absolute;
            left: 0;
        }

        .din-device .name {
            position: absolute;
            padding: 0.5mm 1mm;
            font-family: monospace;
            font-weight: bold;
            display: block;
            z-index: 100;
            font-size: 5mm;
            line-height: 5.5mm;
        }

        .din-device .value {
            position: absolute;
            padding: 0.5mm 1mm;
            z-index: 100;
            display: block;
        }
    `],
    template: `
        <div ngClass="din-device" *ngIf="device_type"
                    [style.height]="current_rail.height + 'mm'"
                    [style.width]="device_type.symbol.width + 'mm'">
            <span ngClass="name"
                    [style.left]="device_type.name.left + 'mm'"
                    [style.top]="device_type.name.top + 'mm'"
                    [style.bottom]="device_type.name.bottom + 'mm'"
                    [style.width]="device_type.name.width">
                {{item.group_name}}{{item.group_id}}
            </span>
            <span ngClass="value"
                    [style.left]="device_type.label.left + 'mm'"
                    [style.font-size]="device_type.label.font_size"
                    [style.top]="device_type.label.top + 'mm'"
                    [style.bottom]="device_type.label.bottom + 'mm'"
                    [style.width]="device_type.label.width">
                <ValueTitle [texts]="device_type.label.title" [params]="item.device_params"></ValueTitle>
            </span>
            <img ngClass="symbol" src="data/{{device_type.symbol.file | paramsInterpolate:item.device_params}}"
                [style.width]="device_type.symbol.width + 'mm'"
                [style.height]="device_type.symbol.height + 'mm'"
                [style.top]="(current_rail.height/2 - device_type.symbol.y_origin) + 'mm'">
        </div>
    `
})

export class DINDeviceComponent implements OnInit {
    @Input() item: DINDevice;
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
