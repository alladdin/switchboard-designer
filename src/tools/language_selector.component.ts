import { Component, Input } from '@angular/core';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

@Component({
    selector: 'LanguageSelector',
    styles: [`
    `],
    template: `
        <md-button-toggle-group name="language-selector" class="language-selector"
            [value]="locale.getCurrentLanguage()"
            (change)="onLanguageChange($event)"
        >
            <md-button-toggle *ngFor="let lang of locale.getAvailableLanguages()"
                [value]="lang"
            >
                <img src="{{getLanguageFlag(lang)}}" alt="{{lang}}" />
            </md-button-toggle>
        </md-button-toggle-group>
    `
})

export class LanguageSelectorComponent extends Locale {
    @Input() supported_languages: any;

    constructor(
        public locale: LocaleService,
        public localization: LocalizationService
    ) {
        super(locale, localization);
    }

    onLanguageChange(event: any) {
        this.setLanguage(event.value);
    }

    setLanguage(lang: string) {
        event.preventDefault();
        event.stopPropagation();
        this.locale.setCurrentLanguage(lang);
    }

    getLanguageFlag(lang: string) {
        return '/node_modules/flag-icon-css/flags/4x3/'+this.supported_languages[lang]+'.svg';
    }
}
