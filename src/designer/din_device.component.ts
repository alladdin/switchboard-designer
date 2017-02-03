import { Component, Input, OnInit, HostListener } from '@angular/core';

import { DINDevice } from '../structures/all';
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
            [class.selected]="isSelected()"
            [attr.height]="item.display.height + 'mm'"
            [attr.width]="item.display.width + 'mm'"
            [attr.x]="item.display.x + 'mm'"
            y="0"
        >
            <svg:g>
                <svg ngClass="symbol"
                    [inlineSVG]="'/data/'+ getSymbolPath()"
                    [attr.width]="device_type.symbol.width + 'mm'"
                    [attr.height]="device_type.symbol.height + 'mm'"
                    [attr.y]="getSymbolTop() + 'mm'"
                ></svg>
            </svg:g>
            <svg:text ngClass="name"
                [attr.x]="device_type.name.left + 'mm'"
                [attr.y]="(device_type.name.top + getSymbolTop()) + 'mm'"
            >
                {{item.name}}
            </svg:text>
            <svg:text ValueTitleSVG
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

    device_type: any;

    ngOnInit(): void {
        this.device_type = this.item.device_data;
    }

    getSymbolPath(): void {
        return (new ParamsInterpolatePipe()).transform(this.device_type.symbol.file, this.item.device_params);
    }

    getSymbolTop(): number {
        return (this.item.display.height/2 - this.device_type.symbol.y_origin);
    }
}
