import { Component, Input, OnInit, HostListener } from '@angular/core';

import { Control } from '../structures/all';

@Component({
    selector: '[Control]',
    styles: [`
    `],
    template: `
    `
})

export class ControlComponent {
    @Input() ui: any;
    item: Control;

    constructor() {}

    isSelected(): boolean {
        if (this.ui === undefined){
            return false;
        }
        let selected: Control = this.ui.selected;
        if (!selected){
            return false;
        }
        return selected.id === this.item.id;
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: any): void {
        if (this.ui.action){
            this.ui.action.itemMouseDown(event, this.item);
        }
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp(event: any): void {
        if (this.ui.action){
            this.ui.action.itemMouseUp(event, this.item);
        }
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: any): void {
        if (this.ui.action){
            this.ui.action.itemMouseMove(event, this.item);
        }
    }
}
