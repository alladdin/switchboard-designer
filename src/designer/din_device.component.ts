import { Component, Input, OnInit } from '@angular/core';

import { DINDevice } from '../structures/all';
import { Rail } from '../structures/all';
import { ItemService } from '../item.service';
import { ControlComponent } from './control.component';
import { ParamsInterpolatePipe } from './params_interpolate.pipe';

@Component({
    selector: 'DINDevice',
    styles: [`
        .din-device {
            position: relative;
            float: left;
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
                    [class.selected]="isSelected(item)"
                    [style.height]="current_rail.height + 'mm'"
                    [style.width]="device_type.width + 'mm'">
            <span ngClass="name"
                    (click)="setSelected($event, item)"
                    [style.left]="device_type.name.left + 'mm'"
                    [style.top]="device_type.name.top + 'mm'"
                    [style.bottom]="device_type.name.bottom + 'mm'"
                    [style.width]="device_type.name.width">
                {{item.name}}
            </span>
            <span ngClass="value"
                    (click)="setSelected($event, item)"
                    [style.left]="device_type.label.left + 'mm'"
                    [style.font-size]="device_type.label.font_size"
                    [style.top]="device_type.label.top + 'mm'"
                    [style.bottom]="device_type.label.bottom + 'mm'"
                    [style.width]="device_type.label.width">
                <ValueTitle [texts]="device_type.label.title" [params]="item.device_params"></ValueTitle>
            </span>
            <div ngClass="symbol"
                [inlineSVG]="'/data/'+ getSymbolPath()"
                (click)="setSelected($event, item)"
                [style.width]="device_type.symbol.width + 'mm'"
                [style.height]="device_type.symbol.height + 'mm'"
                [style.top]="(current_rail.height/2 - device_type.symbol.y_origin) + 'mm'"></div>
        </div>
    `
})

export class DINDeviceComponent extends ControlComponent implements OnInit {
    @Input() item: DINDevice;
    @Input() current_rail: Rail;
    @Input() ui: any;
    device_type: any;

    constructor(
        private item_service: ItemService
    ) { super() }

    loadDeviceType(): void {
        this.item_service.getItem(this.item.device_type).subscribe(device_type => this.device_type = device_type);
    }

    ngOnInit(): void {
        this.loadDeviceType();
    }

    getSymbolPath(): void {
        return (new ParamsInterpolatePipe()).transform(this.device_type.symbol.file, this.item.device_params);
    }
}
