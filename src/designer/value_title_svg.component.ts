import { Component, Input } from '@angular/core';

@Component({
    selector: '[ValueTitleSVG]',
    template: '<ng-template [ngIf]="text" *ngFor="let text of texts">'
                + '<ng-template [ngIf]="!text.tag">{{text.text | paramsInterpolate:params}}</ng-template>'
                + '<svg:tspan [attr.font-size]="text.font_size" font-weight="bold" *ngIf="text.tag === \'strong\'">{{text.text | paramsInterpolate:params}}</svg:tspan>'
                + '</ng-template>'
})

export class ValueTitleSVGComponent {
    @Input() texts: any[];
    @Input() params: any;
}
