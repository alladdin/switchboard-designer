import { Component } from '@angular/core';

@Component({
    selector: 'FieldRow',
    styles: [`
    `],
    template: `
        <div class="row">
            <div class="small-12 columns">
                <ng-content></ng-content>
            </div>
        </div>
    `
})

export class FieldRowComponent {}
