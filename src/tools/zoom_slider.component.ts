import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ZoomSlider',
    styles: [`
    `],
    template: `
        <button md-icon-button (click)="zoomIn($event)"><i class="fa fa-search-plus"></i></button>
        <md-slider
            [(ngModel)]="model"
            [min]="min"
            [max]="max"
            [step]="step"
            invert="1"
        ></md-slider>
        <button md-icon-button (click)="zoomOut($event)"><i class="fa fa-search-minus"></i></button>
    `
})

export class ZoomSliderComponent {
    @Input() min: number;
    @Input() max: number;
    @Input() step: number = 1;

    private model_value: number;

    @Output() modelChange: EventEmitter<number> = new EventEmitter<number>();

    @Input() set model(value: number) {
        this.model_value = value;
        this.modelChange.emit(value);
    }

    get model(): number {
        return this.model_value;
    }

    zoomIn(event: any): void {
        event.preventDefault();
        event.stopPropagation();
        if (this.model < this.max){
            this.model += this.step;
        }
    }

    zoomOut(event: any): void {
        event.preventDefault();
        event.stopPropagation();
        if (this.model > this.min){
            this.model -= this.step;
        }
    }
}
