import { Component, Input } from '@angular/core';

import { Control } from '../structures/all';

@Component({
    selector: 'PropertyEditor',
    styles: [`
    `],
    template: `
        <div *ngIf="item" ngClass="property-editor">
            <h2>Change object</h2>
            <form>
            <div class="row">
                <div class="small-12 columns">
                    <label for="name">name:<input type="text" name="name" [(ngModel)]="item.name" /></label>
                </div>
            </div>
            <div class="row">
                <div class="small-12 columns">
                    <label for="description">description:<textarea name="description" [(ngModel)]="item.description"></textarea></label>
                </div>
            </div>
            </form>
        </div>
    `
})

export class PropertyEditorComponent {
    @Input() item: Control;
    @Input() ui: any;
}
