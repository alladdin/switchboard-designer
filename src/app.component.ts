import { Component, OnInit } from '@angular/core';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

import { SwitchBoard } from './structures/all';
import { SwitchBoardService } from './switchboard.service';
import { LoaderService } from './loader.service';

@Component({
    selector: 'my-app',
    styles: [`
        .app-toolbar-filler {
            flex: 1 1 auto;
        }

        .app-toolbar-menu {
            min-width: 0;
        }

        .app-panels {
            position: relative;
        }

        .loading-bar {
            height: 2px;
            width: 100%;
            position:absolute;
            z-index:5000;
            top:0;
        }

        .loading-bar md-progress-bar {
            height: 2px;
        }
    `],
    template: `
        <div class="app-container">
            <md-toolbar color="primary">
                <!--<button md-button class="app-toolbar-menu">
                    <i class="fa fa-bars fa-2x"></i>
                </button>-->
                <span>{{ 'APP.TITLE' | translate:lang }}</span>
                <span class="app-toolbar-filler"></span>
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
                <button md-icon-button (click)="zoomIn($event)"><i class="fa fa-search-plus"></i></button>
                <md-slider
                    [(ngModel)]="ui.zoom.current"
                    [min]="ui.zoom.min"
                    [max]="ui.zoom.max"
                    [step]="1"
                    invert="1"
                ></md-slider>
                <button md-icon-button (click)="zoomOut($event)"><i class="fa fa-search-minus"></i></button>
            </md-toolbar>
            <div class="app-panels">
                <div *ngIf="loading.visible" ngClass="loading-bar">
                    <md-progress-bar [mode]="loading.mode" [value]="loading.value"></md-progress-bar>
                </div>
                <div *ngIf="ui.selected" class="side app-panel">
                    <PropertyEditor [ui]="ui" [item]="ui.selected"></PropertyEditor>
                </div>
                <div class="main app-panel">
                    <SwitchBoard *ngIf="switchboard" [ui]="ui" [item]="switchboard"></SwitchBoard>
                </div>
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
    public switchboard: SwitchBoard;
    public supported_languages: any = {
        en: 'us',
        cs: 'cz'
    };
    public loading:any = {
        visible: false,
        value: 0,
        mode: 'indeterminate',
    };

    constructor(
        private switchboard_service: SwitchBoardService,
        private loader: LoaderService,
        public locale: LocaleService,
        public localization: LocalizationService
    ) {
        super(locale, localization);

        this.locale.addLanguages(Object.keys(this.supported_languages));
        this.locale.definePreferredLanguage('en', 30);

        this.localization.translationProvider('/locale/');
        this.localization.updateTranslation();
    }

    loadSwitchBoard(): void {
        let switchboard_id = 'ae518529-59dd-d6ed-a871-4a43ad215804';
        this.switchboard_service.getSwitchBoard(switchboard_id)
            .subscribe(control => {
                this.switchboard = <SwitchBoard>control;
            });
    }

    ngOnInit(): void {
        this.loadSwitchBoard();
        this.getLoadingBar();
    }

    ngDoCheck(): void {
        this.getLoadingBar();
    }

    getLoadingBar(): void {
        let loading_mode = this.loader.getLoadingMode();
        if (loading_mode){
            this.loading.visible = true;
            this.loading.mode = loading_mode;
            this.loading.value = this.loader.getLoadingValue();
        }else{
            this.loading.visible = false;
        }
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
