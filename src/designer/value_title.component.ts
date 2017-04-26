import { Component, Input } from '@angular/core';

@Component({
    selector: 'ValueTitle',
    template: '<ng-template [ngIf]="text" *ngFor="let text of texts">'
                + '<ng-template [ngIf]="!text.tag">{{text.text | paramsInterpolate:params}}</ng-template>'
                + '<strong [style.font-size]="text.font_size" *ngIf="text.tag === \'strong\'">{{text.text | paramsInterpolate:params}}</strong>'
                + '</ng-template>'
})

export class ValueTitleComponent {
    @Input() texts: any[];
    @Input() params: any;
}
