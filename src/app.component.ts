import { Component, OnInit } from '@angular/core';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

import { SwitchBoard } from './structures/all';
import { SwitchBoardService } from './switchboard.service';

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
    `],
    template: `
        <div class="app-container">
            <md-toolbar color="primary">
                <!--<button md-button class="app-toolbar-menu">
                    <i class="fa fa-bars fa-2x"></i>
                </button>-->
                <span>{{ 'APP.TITLE' | translate:lang }}</span>
                <span class="app-toolbar-filler"></span>
                <LanguageSelector [supported_languages]="supported_languages"></LanguageSelector>
                <ZoomSlider
                    [(model)]="ui.zoom.current"
                    [min]="ui.zoom.min"
                    [max]="ui.zoom.max"
                ></ZoomSlider>
            </md-toolbar>
            <div class="app-panels">
                <LoadingBar></LoadingBar>
                <div *ngIf="ui.selected" class="properties app-panel">
                    <PropertyEditor [ui]="ui" [item]="ui.selected"></PropertyEditor>
                </div>
                <div class="main app-panel">
                    <SwitchBoard *ngIf="switchboard" [ui]="ui" [item]="switchboard"></SwitchBoard>
                </div>
                <div class="side-toolbar app-panel">
                    <span mdTooltipPosition="left" mdTooltip="Edit">
                        <button md-raised-button color=""><i class="fa fa-pencil"></i></button>
                    </span>
                    <span mdTooltipPosition="left" mdTooltip="Move">
                        <button md-raised-button><i class="fa fa-arrows"></i></button>
                    </span>
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

    constructor(
        private switchboard_service: SwitchBoardService,
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
    }
}
