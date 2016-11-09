import { Component, Input } from '@angular/core';

@Component({
    selector: 'ValueTitle',
    template: '<template [ngIf]="text" *ngFor="let text of texts">'
                + '<template [ngIf]="!text.tag">{{text.text | paramsInterpolate:params}}</template>'
                + '<strong [style.font-size]="text.font_size" *ngIf="text.tag === \'strong\'">{{text.text | paramsInterpolate:params}}</strong>'
                + '</template>'
})

export class ValueTitleComponent {
    @Input() texts: any[];
    @Input() params: any;
}
