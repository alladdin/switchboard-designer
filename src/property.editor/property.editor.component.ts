import { Component, Input } from '@angular/core';

import { Control } from '../structures/all';

@Component({
    selector: 'PropertyEditor',
    styles: [`
    `],
    template: `
        <div *ngIf="item" ngClass="property-editor">
            <FieldRow><h4>Change object</h4></FieldRow>
            <form>
                <Control [item]="item"></Control>
            </form>
        </div>
    `
})

export class PropertyEditorComponent {
    @Input() item: Control;
    @Input() ui: any;
}
