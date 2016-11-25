import { Component, Input } from '@angular/core';

@Component({
    selector: 'FieldInfo',
    styles: [`
    `],
    template: `
        <FieldRow>
            <FieldLabel [name]="name"></FieldLabel>{{value}}
        </FieldRow>
    `
})

export class FieldInfoComponent {
    @Input() value: string;
    @Input() name: string;
}
