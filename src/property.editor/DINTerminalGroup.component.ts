import { Component, Input, SimpleChanges } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

import { DINTerminalGroup } from '../structures/all';

@Component({
    selector: 'DINTerminalGroup',
    styles: [`
    `],
    template: `
        <div class="row full"><FieldDeviceTypeInfo
            [name]="'type'"
            [value]="[translation.translate('OBJECT.'+item.constructor.name.toUpperCase())]"
        ></FieldDeviceTypeInfo></div>
        <div class="row full"><FieldText [name]="'name'" [(model)]="item.name"></FieldText></div>
        <div class="row full"><FieldTextArea [name]="'description'" [(model)]="item.description"></FieldTextArea></div>
        <div class="row full"><FieldSelect
            [name]="'parent'"
            [(model)]="parent_item"
            [options]="available_parents"
        ></FieldSelect></div>
        <div class="row full"><FieldNumber
            [name]="'dimension_x'"
            [(model)]="item.x"
            [step]="0.1"
            [units]="'mm'"
            [width]="'100%'"
        ></FieldNumber></div>
    `
})

export class DINTerminalGroupComponent extends Translation {
    @Input() item: DINTerminalGroup;

    available_parents: any[] = [];
    _parent_item: string;

    constructor(
        public translation: TranslationService
    ) {
        super(translation);
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

    ngOnChanges(changes: SimpleChanges): void {
        let chng = changes['item'];
        if (chng){
            if (chng.currentValue.id !== chng.previousValue.id){
                this.available_parents = this.getAvailableParents();
                this._parent_item = this.item.parent_control.id;
            }
        }
    }
}

