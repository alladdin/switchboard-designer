import { Component, Input } from '@angular/core';
import { Translation, TranslationService } from 'angular-l10n';

import { ItemService } from '../item.service';
import { DINDevice } from '../structures/all';

@Component({
    selector: 'DINDevice',
    styles: [`
    `],
    template: `
        <div class="row full"><FieldDeviceTypeInfo [name]="'type'" [value]="getDeviceTitle(lang)"></FieldDeviceTypeInfo></div>
        <div class="row full"><FieldText [name]="'name'" [(model)]="item.name"></FieldText></div>
        <div class="row full"><FieldTextArea [name]="'description'" [(model)]="item.description"></FieldTextArea></div>
        <div class="row full"><FieldNumber
            [name]="'dimension_x'"
            [(model)]="item.x"
            [step]="0.1"
            [units]="'mm'"
            [width]="'100%'"
        ></FieldNumber></div>
        <div class="row full"><FieldSelect *ngFor="let param_key of getDeviceParamKeys()"
            [name]="param_key"
            [(model)]="item.device_params[param_key]"
            [options]="device_type.params[param_key].options"
        ></FieldSelect></div>
    `
})

export class DINDeviceComponent extends Translation {
    @Input() item: DINDevice;
    device_type: any;
    device_descriptions: any[];

    constructor(
        public translation: TranslationService,
        private item_service: ItemService
    ) {
        super(translation);
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

    ngDoCheck(): void {
        this.loadDeviceType();
        this.loadDeviceDescription();
    }
}

