import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ToolbarButton',
    styles: [`
    `],
    template: `
        <button md-raised-button (click)="on_click($event)" [color]="getColor()"
            [disabled]="disabled"
            [mdTooltipPosition]="tooltip_position" [mdTooltip]="label" ngClass="toolbar-button"
        >
            <i ngClass="{{getFaClass()}}"></i>
        </button>
    `
})

export class ToolbarButtonComponent {
    @Input() tooltip_position: string = "before";
    @Input() label: string;
    @Input() icon: string;
    @Input() selected: boolean = false;
    @Input() disabled: boolean = false;

    @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();

    getColor(): string {
        if (this.selected){
            return "accent";
        }
        return "";
    }

    on_click(event: any): void {
        event.preventDefault();
        event.stopPropagation();
        this.buttonClick.emit(event);
    }

    getFaClass(): string {
        return "fa fa-"+this.icon;
    }
}

