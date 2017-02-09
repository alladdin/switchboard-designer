import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ToolbarButton',
    styles: [`
        .toolbar-button {
            margin: 8px 0 0 8px;
            min-width: 36px;
            width: 36px;
            height: 36px;
            line-height: 36px;
            padding-left: 0;
            padding-right: 0;
            float: left;
        }
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

