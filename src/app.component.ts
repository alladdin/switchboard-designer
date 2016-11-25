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
            fill: rgba(0,0,128,0.4);
            stroke: rgba(0,0,128,0.4);
            stroke-width: 1;
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
            <PropertyEditor [ui]="ui" [item]="ui.selected[0]"></PropertyEditor>
        </div>
        <div class="main app-panel">
            <SwitchBoard [ui]="ui" [current_switchboard]="current_switchboard"></SwitchBoard>
            <div ngClass="top-toolbar">
                <svg width="140" height="60">
                    <g class="zoom">
                        <path d="M 30 0 h 80 a 30 30 0 0 0 0 60 h -80 a 30 30 0 0 0 0 -60 z" />
                        <text x="70" y="37" text-anchor="middle" font-size="20">{{ui.zoom.current}}</text>
                    </g>
                    <g class="button" (click)="zoomIn($event)" (mousedown)="$event.preventDefault()">
                        <circle cx="30" cy="30" r="30" />
                        <text x="30" y="40" text-anchor="middle" font-size="30">+</text>
                    </g>
                    <g class="button" (click)="zoomOut($event)" (mousedown)="$event.preventDefault()">
                        <circle cx="110" cy="30" r="30" />
                        <text x="110" y="40" text-anchor="middle" font-size="30">&minus;</text>
                    </g>
                </svg>
            </div>
        </div>
    `
})

export class AppComponent extends Locale implements OnInit {
    public ui: any = {
        selected: [],
        zoom: {
            current: 5,
            min: 1,
            max: 9
        }
    };
    public current_switchboard: SwitchBoard;
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
        this.switchboard_service.getSwitchBoard(1).then(switchboard => this.current_switchboard = switchboard);
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
