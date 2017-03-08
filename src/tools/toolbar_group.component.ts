import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

@Component({
    selector: 'ToolbarGroup',
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
        <ToolbarButton *ngFor="let button of buttons"
            label="{{'TOOL.'+button.id | translate:lang }}"
            [icon]="button.icon"
            (buttonClick)="on_button_click($event, button.id)"
            [selected]="model === button.id"
            [disabled]="button.disabled"
        ></ToolbarButton>
    `
})

export class ToolbarGroupComponent extends Translation {
    @Input() buttons: any;

    private model_value: string;

    @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() buttonClick: EventEmitter<string> = new EventEmitter<string>();

    @Input() set model(value: string) {
        this.model_value = value;
        this.modelChange.emit(value);
    }

    get model(): string {
        return this.model_value;
    }

    constructor(
        public translation: TranslationService
    ) {
        super(translation);
    }

    on_button_click(event: any, id: string): void {
        this.buttonClick.emit(id);
    }
}


