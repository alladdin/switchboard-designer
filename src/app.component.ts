import { Component, OnInit } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';

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
                <div class="properties app-panel">
                    <PropertyEditor *ngIf="(ui.tool === 'EDIT') || (ui.tool === 'MOVE')"
                        [ui]="ui" [item]="ui.selected"></PropertyEditor>
                </div>
                <div class="main app-panel">
                    <SwitchBoard *ngIf="switchboard" [ui]="ui" [item]="switchboard"></SwitchBoard>
                </div>
                <div class="side-toolbar app-panel">
                    <ToolbarGroup [buttons]="toolbar_buttons" [(model)]="ui.tool"></ToolbarGroup>
                </div>
            </div>
        </div>
    `
})

export class AppComponent extends Translation implements OnInit {
    public ui: any = {
        selected: undefined,
        tool: 'EDIT',
        mode: 'DESIGNER',
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
    public toolbar_buttons: any[] = [
        { id: 'EDIT', icon: 'pencil'},
        { id: 'MOVE', icon: 'arrows', disabled: true},
        { id: 'ADD', icon: 'plus', disabled: true},
        { id: 'DELETE', icon: 'trash', disabled:true},
    ];

    constructor(
        private switchboard_service: SwitchBoardService,
        public locale: LocaleService,
        public translation: TranslationService
    ) {
        super(translation);

        this.locale.AddConfiguration()
            .AddLanguages(Object.keys(this.supported_languages))
            .SetCookieExpiration(30)
            .DefineLanguage('en');
        this.locale.init();

        this.translation.AddConfiguration()
            .AddProvider('/locale/');
        this.translation.init();
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
