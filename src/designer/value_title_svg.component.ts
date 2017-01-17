import { Component, Input } from '@angular/core';

@Component({
    selector: '[ValueTitleSVG]',
    template: '<template [ngIf]="text" *ngFor="let text of texts">'
                + '<template [ngIf]="!text.tag">{{text.text | paramsInterpolate:params}}</template>'
                + '<svg:tspan [attr.font-size]="text.font_size" font-weight="bold" *ngIf="text.tag === \'strong\'">{{text.text | paramsInterpolate:params}}</svg:tspan>'
                + '</template>'
})

export class ValueTitleSVGComponent {
    @Input() texts: any[];
    @Input() params: any;
}
