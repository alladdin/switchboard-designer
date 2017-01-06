import { Component, Input } from '@angular/core';

@Component({
    selector: 'FieldDeviceTypeInfo',
    styles: [`
    `],
    template: `
        <FieldRow>
            <FieldLabel [name]="name"></FieldLabel>
            <ul>
                <li *ngFor="let dev_type of value">{{dev_type}}</li>
            </ul>
        </FieldRow>
    `
})

export class FieldDeviceTypeInfoComponent {
    @Input() value: string[];
    @Input() name: string;
}

