import { Component, Input } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

import { Rail } from '../structures/all';
import { ControlBase } from './control_base';
import { UndoQueueService } from '../tools/undo_queue.service';

@Component({
    selector: 'Rail',
    styles: [`
    `],
    template: `
        <div class="row full"><FieldDeviceTypeInfo
            [name]="'type'"
            [value]="[translation.translate('OBJECT.'+item.constructor.name.toUpperCase())]"
        ></FieldDeviceTypeInfo></div>
        <div class="row full"><FieldText
            [name]="'name'"
            [model]="item.name"
            (modelChange)="onChange('name', $event)"
        ></FieldText></div>
        <div class="row full"><FieldTextArea
            [name]="'description'"
            [model]="item.description"
            (modelChange)="onChange('description', $event)"
        ></FieldTextArea></div>
        <div class="row"><div class="half"><FieldNumber
            [name]="'dimension_x'"
            [model]="item.x"
            (modelChange)="onChange('x', $event)"
            [step]="0.1"
            [units]="'mm'"
            [width]="'100%'"
        ></FieldNumber></div>
        <div class="half"><FieldNumber
            [name]="'dimension_y'"
            [model]="item.y"
            (modelChange)="onChange('y', $event)"
            [step]="0.1"
            [units]="'mm'"
            [width]="'100%'"
        ></FieldNumber></div></div>
        <div class="row"><div class="half"><FieldNumber
            [name]="'dimension_width'"
            [model]="item.width"
            (modelChange)="onChange('width', $event)"
            [step]="0.1"
            [units]="'mm'"
            [width]="'100%'"
        ></FieldNumber></div>
        <div class="half"><FieldNumber
            [name]="'dimension_height'"
            [model]="item.height"
            (modelChange)="onChange('height', $event)"
            [step]="0.1"
            [units]="'mm'"
            [width]="'100%'"
        ></FieldNumber></div></div>
    `
})

export class RailComponent extends ControlBase {
    @Input() item: Rail;

    constructor(
        public translation: TranslationService,
        protected undo_queue: UndoQueueService,
    ) {
        super(translation, undo_queue);
    }
}

