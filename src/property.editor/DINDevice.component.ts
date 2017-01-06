import { Component, Input, OnInit } from '@angular/core';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

import { ItemService } from '../item.service';
import { DINDevice } from '../structures/all';

@Component({
    selector: 'DINDevice',
    styles: [`
    `],
    template: `
        <FieldDeviceTypeInfo [name]="'type'" [value]="getDeviceTitle(lang)"></FieldDeviceTypeInfo>
        <FieldText [name]="'name'" [(model)]="item.name"></FieldText>
        <FieldTextArea [name]="'description'" [(model)]="item.description"></FieldTextArea>
        <FieldSelect *ngFor="let param_key of getDeviceParamKeys()"
            [name]="param_key"
            [(model)]="item.device_params[param_key]"
            [options]="device_type.params[param_key].options"
        ></FieldSelect>
    `
})

export class DINDeviceComponent extends Locale implements OnInit {
    @Input() item: DINDevice;
    device_type: any;
    device_descriptions: any[];

    constructor(
        public locale: LocaleService,
        public localization: LocalizationService,
        private item_service: ItemService
    ) {
        super(locale, localization);
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

    ngOnInit(): void {
    }

    ngDoCheck(): void {
        this.loadDeviceType();
        this.loadDeviceDescription();
    }
}

