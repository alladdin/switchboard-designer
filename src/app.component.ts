import { Component, OnInit } from '@angular/core';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';

import { SwitchBoard, ControlGroup } from './structures/all';
import { SwitchBoardService } from './switchboard.service';
import { UndoQueueService } from './tools/undo_queue.service';

import { DesignerActionSelect } from './designer/action/select';
import { DesignerActionMove } from './designer/action/move';

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
            </md-toolbar>
            <div class="app-panels">
                <LoadingBar></LoadingBar>
                <div class="properties app-panel">
                    <PropertyEditor *ngIf="(ui.tool === 'SELECT') || (ui.tool === 'MOVE')"
                        [ui]="ui" [item]="ui.selected"></PropertyEditor>
                </div>
                <div class="main app-panel">
                    <Designer *ngIf="switchboard" [ui]="ui" [switchboard]="switchboard"></Designer>
                </div>
                <div class="side-toolbar app-panel">
                    <ToolbarGroup [buttons]="toolbar_buttons" [model]="ui.tool" (buttonClick)="onToolBarClick($event)"></ToolbarGroup>
                    <ZoomSlider
                        [(model)]="ui.zoom.current"
                        [min]="ui.zoom.min"
                        [max]="ui.zoom.max"
                    ></ZoomSlider>
                </div>
            </div>
            <div ngClass="app-status-bar">
                <span>{{'STATUS.COORDINATES' | translate:lang}}: x =</span>
                <span [style.width]="'50px'" [style.text-align]="'right'">{{ui.cursor_pos.x}}</span>
                <span>mm; y =</span>
                <span [style.width]="'50px'" [style.text-align]="'right'">{{ui.cursor_pos.y}}</span>
                <span>mm</span>
                <span>|</span>
            </div>
        </div>
    `
})

export class AppComponent extends Translation implements OnInit {
    public ui: any = {
        selected: undefined,
        tool: 'SELECT',
        mode: 'DESIGNER',
        zoom: {
            current: 5,
            min: 1,
            max: 9,
        },
        cursor_pos: {
            x: 0,
            y: 0,
        },
        tool_event: undefined,
    };
    public switchboard: SwitchBoard;
    public supported_languages: any = {
        en: 'us',
        cs: 'cz'
    };
    public toolbar_buttons: any[] = [
        { id: 'SELECT', icon: 'mouse-pointer' },
        { id: 'MOVE', icon: 'arrows' },
        { id: 'UNDO', icon: 'undo', disabled: true },
        { id: 'REDO', icon: 'repeat', disabled: true },
        { id: 'ADD', icon: 'plus', disabled: true },
        { id: 'DELETE', icon: 'trash', disabled: true },
    ];
    private toolbar_button_map: any = {};

    constructor(
        private switchboard_service: SwitchBoardService,
        public locale: LocaleService,
        public translation: TranslationService,
        private undo_queue: UndoQueueService,
    ) {
        super(translation);

        this.locale.addConfiguration()
            .addLanguages(Object.keys(this.supported_languages))
            .setCookieExpiration(30)
            .defineLanguage('en');
        this.locale.init();

        this.translation.addConfiguration()
            .addProvider('/locale/');
        this.translation.init();

        this.ui.undo_queue = this.undo_queue;

        let that = this;
        this.toolbar_buttons.forEach((button) => that.toolbar_button_map[button.id] = button);
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

    onToolBarClick(button_id: string){
        let that = this;
        switch(button_id){
            case 'UNDO':
                this.ui.undo_queue.undo();
                break;
            case 'REDO':
                this.ui.undo_queue.redo();
                break;
            case 'MOVE':
            case 'SELECT':
                if (this.ui.tool != button_id){
                    this.ui.tool = button_id;
                }
                break;
            case 'DELETE':
                if (this.ui.selected && !(this.ui.selected instanceof SwitchBoard)){
                    if (this.ui.selected.parent_control){
                        let item = this.ui.selected;
                        let parent_item = item.parent_control;
                        this.undo_queue.add('delete of '+item.id,
                            function() { parent_item.addControl(item); },
                            function() {
                                parent_item.removeControl(item);
                                if (that.ui.selected === item){
                                    that.ui.selected = undefined;
                                }
                            });
                        this.ui.selected.parent_control.removeControl(this.ui.selected);
                        this.ui.selected = undefined;
                    }
                }
                break;
        }
    }

    ngDoCheck(): void {
        if (!this.ui.action || ( this.ui.action.getName() !== this.ui.tool )){
            switch(this.ui.tool){
                case 'MOVE':
                    this.ui.action = new DesignerActionMove(this.ui);
                    break;
                case 'SELECT':
                    this.ui.action = new DesignerActionSelect(this.ui);
                    break;
            }
        }

        if (this.ui.undo_queue){
            this.toolbar_button_map.UNDO.disabled = (this.ui.undo_queue.undo_size() <= 0);
            this.toolbar_button_map.REDO.disabled = (this.ui.undo_queue.redo_size() <= 0);
        }

        if (this.ui.selected !== undefined){
            this.toolbar_button_map.ADD.disabled = !(this.ui.selected instanceof ControlGroup);
            this.toolbar_button_map.DELETE.disabled = (this.ui.selected instanceof SwitchBoard);
        } else {
            this.toolbar_button_map.ADD.disabled = true;
            this.toolbar_button_map.DELETE.disabled = true;
        }
    }
}
