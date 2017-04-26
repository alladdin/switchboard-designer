import { Component, Input, SimpleChanges } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

import { ItemService } from '../item.service';
import { DINDevice, Control } from '../structures/all';
import { ControlBase } from './control_base';
import { UndoQueueService } from '../tools/undo_queue.service';

@Component({
    selector: 'DINDevice',
    styles: [`
    `],
    template: `
        <div class="row full"><FieldDeviceTypeInfo [name]="'type'" [value]="getDeviceTitle(lang)"></FieldDeviceTypeInfo></div>
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
        <div class="row full"><FieldSelect
            [name]="'parent'"
            [(model)]="parent_item"
            [options]="available_parents"
        ></FieldSelect></div>
        <div class="row full"><FieldNumber
            [name]="'dimension_x'"
            [model]="item.x"
            (modelChange)="onChange('x', $event)"
            [step]="0.1"
            [units]="'mm'"
            [width]="'100%'"
        ></FieldNumber></div>
        <div class="row full"><FieldSelect *ngFor="let param_key of getDeviceParamKeys()"
            [name]="param_key"
            [model]="item.device_params[param_key]"
            (modelChange)="onDeviceParamChange(param_key, $event)"
            [options]="device_type.params[param_key].options"
        ></FieldSelect></div>
    `
})

export class DINDeviceComponent extends ControlBase {
    @Input() item: DINDevice;
    device_type: any;
    device_descriptions: any[];

    available_parents: any[] = [];
    _parent_item: string;

    constructor(
        public translation: TranslationService,
        protected undo_queue: UndoQueueService,
        private item_service: ItemService
    ) {
        super(translation, undo_queue);
    }

    getDeviceTitle(lang:string) {
        let title_chain: string[] = [];

        if (!this.device_type || !this.device_descriptions){
            return '';
        }

        for (let desc of this.device_descriptions){
            title_chain.push(this.getLocaleFromObject(desc.title, lang));
        }

        title_chain.push(
            this.getLocaleFromObject(this.device_type.title, lang)
        );
        return title_chain;
    }

    getDeviceParamKeys() {
        return Object.keys(this.device_type.params);
    }

    getLocaleFromObject(locale_def:any, lang:string){
        if (locale_def[lang]){
            return locale_def[lang];
        }
        if (locale_def['en']){
            return locale_def['en'];
        }
        for(let loc of locale_def){
            return loc;
        }
    }

    get parent_item(): string {
        return this._parent_item;
    }

    set parent_item(value: string) {
        let old_parent = this.item.parent_control;
        if ((old_parent !== undefined) && (old_parent.id === value)){
            return;
        }
        let new_parent: any = undefined;
        this.available_parents.some(ctrl => {
            if (ctrl.id === value){
                new_parent = ctrl;
                return true;
            }
            return false;
        });

        let item = this.item;
        this.undo_queue.add('parent of '+item.id,
            function() { item.changeParent(old_parent); },
            function() { item.changeParent(new_parent); });
        this.item.changeParent(new_parent);

        if (new_parent !== undefined){
            this._parent_item = new_parent.id;
        }else{
            this._parent_item = undefined;
        }
    }

    getAvailableParents(): any[] {
        return this.item.getRoot().getAcceptableParents(this.item);
    }

    loadDeviceType(): void {
        this.item_service.getItem(this.item.device_type).subscribe(
            device_type => this.device_type = device_type
        );
    }

    loadDeviceDescription(): void {
        this.item_service.getDescriptionChain(this.item.device_type).subscribe(
            descriptions => this.device_descriptions = descriptions
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        let chng = changes['item'];
        if (chng){
            if (
                (chng.previousValue === undefined)
                || (chng.currentValue.id !== chng.previousValue.id)
            ){
                this.available_parents = this.getAvailableParents();
                this._parent_item = this.item.parent_control.id;
                this.loadDeviceType();
                this.loadDeviceDescription();
            }
        }
    }

    onDeviceParamChange(key: string, value: any){
        let item = this.item.device_params;
        let old = this.item.device_params[key];

        if (old !== value){
            this.undo_queue.add('device param '+key+' of '+item.id,
                function() { item[key] = old; },
                function() { item[key] = value; });

            item[key] = value;
        }
    }
}

