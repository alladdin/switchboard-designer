import { Component, Input, OnInit } from '@angular/core';

import { DINDevice } from '../structures/all';
import { ItemService } from '../item.service';
import { ControlComponent } from './control.component';
import { ParamsInterpolatePipe } from './params_interpolate.pipe';

@Component({
    selector: '[DINDevice]',
    styles: [`
        .din-device {
            position: relative;
            float: left;
            cursor: default;
        }

        .din-device .name {
            font-family: monospace;
            font-weight: bold;
            font-size: 5mm;
        }
    `],
    template: `
        <svg ngClass="din-device" *ngIf="device_type"
            [class.selected]="isSelected(item)"
            [attr.height]="parent_height + 'mm'"
            [attr.width]="device_type.width + 'mm'"
            [attr.x]="item.x + 'mm'"
            y="0"
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
            >
                {{item.name}}
            </svg:text>
            <svg:text ValueTitleSVG
                (click)="setSelected($event, item)"
                ngClass="value"
                [attr.x]="device_type.label.left + 'mm'"
                [attr.y]="(device_type.label.top + getSymbolTop()) + 'mm'"
                [attr.font-size]="device_type.label.font_size"
                [texts]="device_type.label.title"
                [params]="item.device_params"
            ></svg:text>
        </svg>
    `
})

export class DINDeviceComponent extends ControlComponent implements OnInit {
    @Input() item: DINDevice;
    @Input() parent_height: number;
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

    getSymbolTop(): number {
        return (this.parent_height/2 - this.device_type.symbol.y_origin);
    }
}
