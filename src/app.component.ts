import { Component, OnInit } from '@angular/core';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

import { SwitchBoard } from './structures/all';
import { SwitchBoardService } from './switchboard.service';

@Component({
    selector: 'my-app',
    styles: [`
        .top-toolbar {
            position: fixed;
            right: 30px;
            top: 30px;
        }

        .top-toolbar .button {
            cursor: pointer;
        }

        .top-toolbar .button circle {
            fill: rgb(32,32,192);
        }

        .top-toolbar .button text {
            fill: rgb(255,255,255);
        }

        .top-toolbar .button:hover circle {
            fill: rgb(64,64,221);
        }

        .top-toolbar .zoom path {
            stroke: rgba(0,0,128,0.4);
            stroke-width: 1;
        }

        #zoom-level-pattern .background {
            fill: rgba(0,0,128,0.4) !important;
        }

        #zoom-level-pattern .foreground {
            fill: rgba(0,0,128,0.4) !important;
        }

        .top-toolbar .zoom text {
            fill: rgb(255,255,255);
        }

        .language-selector {
            padding: 0 20px;
        }
    `],
    template: `
        <div class="side app-panel">
            <h1>{{ 'APP.TITLE' | translate:lang }}</h1>
            <div class="language-selector">
                <a *ngFor="let lang of locale.getAvailableLanguages()"
                    (click)="setLanguage(lang)"
                    [class.selected]="locale.getCurrentLanguage() === lang"
                >
                    <img src="{{getLanguageFlag(lang)}}" alt="{{lang}}" />
                </a>
            </div>
            <PropertyEditor [ui]="ui" [item]="ui.selected"></PropertyEditor>
        </div>
        <div class="main app-panel">
            <SwitchBoard [ui]="ui" [id]="current_switchboard_id"></SwitchBoard>
            <div ngClass="top-toolbar">
                <svg width="140" height="60">
                    <svg:defs>
                        <svg:pattern id="zoom-level-pattern" width="1" height="1">
                            <svg:rect class="background" x="0" y="0" width="80" height="60" />
                            <svg:rect class="foreground" y="0" height="60"
                                [attr.x]="80 * (1 - (ui.zoom.current - ui.zoom.min)/(ui.zoom.max - ui.zoom.min))"
                                [attr.width]="80 * (ui.zoom.current - ui.zoom.min)/(ui.zoom.max - ui.zoom.min)" />
                        </svg:pattern>
                    </svg:defs>
                    <svg:g class="zoom">
                        <svg:path d="M 30 0 h 80 a 30 30 0 0 0 0 60 h -80 a 30 30 0 0 0 0 -60 z"
                            fill="url(#zoom-level-pattern)"
                        />
                        <svg:text x="70" y="37" text-anchor="middle" font-size="20">{{ui.zoom.current}}</svg:text>
                    </svg:g>
                    <svg:g class="button" (click)="zoomIn($event)" (mousedown)="$event.preventDefault()">
                        <svg:circle cx="30" cy="30" r="30" />
                        <svg:text x="30" y="40" text-anchor="middle" font-size="30">+</svg:text>
                    </svg:g>
                    <svg:g class="button" (click)="zoomOut($event)" (mousedown)="$event.preventDefault()">
                        <svg:circle cx="110" cy="30" r="30" />
                        <svg:text x="110" y="40" text-anchor="middle" font-size="30">&minus;</svg:text>
                    </svg:g>
                </svg>
            </div>
        </div>
    `
})

export class AppComponent extends Locale implements OnInit {
    public ui: any = {
        selected: undefined,
        zoom: {
            current: 5,
            min: 1,
            max: 9
        }
    };
    public current_switchboard_id: string;
    public supported_languages: any = {
        en: 'us',
        cs: 'cz'
    };

    constructor(
        private switchboard_service: SwitchBoardService,
        public locale: LocaleService,
        public localization: LocalizationService
    ) {
        super(locale, localization);

        this.locale.addLanguages(Object.keys(this.supported_languages));
        /*this.locale.definePreferredLocale('en', 'US', 30);*/
        this.locale.definePreferredLanguage('en', 30);

        this.localization.translationProvider('/locale/');
        this.localization.updateTranslation();
    }

    loadSwitchBoard(): void {
        this.current_switchboard_id = this.switchboard_service.getSwitchBoardID();
    }

    ngOnInit(): void {
        this.loadSwitchBoard();
    }

    zoomIn(event: any): void {
        event.preventDefault();
        event.stopPropagation();
        if (this.ui.zoom.current < this.ui.zoom.max){
            this.ui.zoom.current++;
        }
    }

    zoomOut(event: any): void {
        event.preventDefault();
        event.stopPropagation();
        if (this.ui.zoom.current > this.ui.zoom.min){
            this.ui.zoom.current--;
        }
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
