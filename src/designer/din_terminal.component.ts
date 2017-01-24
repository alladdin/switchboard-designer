import { Component, Input, OnInit, HostListener } from '@angular/core';

import { DINTerminal } from '../structures/all';
import { ControlComponent } from './control.component';
import { ParamsInterpolatePipe } from './params_interpolate.pipe';

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
            [class.selected]="isSelected()"
            [attr.height]="parent_height + 'mm'"
            [attr.width]="device_type.width + 'mm'"
            [attr.y]="0"
            [attr.x]="corrected_x + 'mm'"
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
                [attr.text-anchor]="device_type.name.text_anchor"
            >
                {{item.name}}
            </svg:text>
        </svg>
    `
})

export class DINTerminalComponent extends ControlComponent implements OnInit {
    @Input() item: DINTerminal;
    @Input() parent_height: number;
    @Input() ui: any;
    @Input() corrected_x: number;

    device_type: any;

    constructor(
    ) { super() }

    ngOnInit(): void {
        this.device_type = this.item.device_data;
    }

    getSymbolPath(): void {
        return (new ParamsInterpolatePipe()).transform(this.device_type.symbol.file, this.item.device_params);
    }

    getSymbolTop(): number {
        return (this.parent_height/2 - this.device_type.symbol.y_origin);
    }

    @HostListener('click', ['$event'])
    onClick(event: any): void {
        this.setSelected();
        event.preventDefault();
        event.stopPropagation();
    }
}

