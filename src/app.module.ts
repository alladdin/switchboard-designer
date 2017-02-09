import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { TranslationModule } from 'angular-l10n';
import { MaterialModule } from '@angular/material';
import { FormsModule }   from '@angular/forms';

import {SwitchBoardService} from './switchboard.service';
import {LoaderService} from './loader.service';
import {ControlService} from './control.service';

import { AppComponent }   from './app.component';
import { LoadingBarComponent } from './loading_bar.component';
import { LanguageSelectorComponent } from './tools/language_selector.component';
import { ZoomSliderComponent } from './tools/zoom_slider.component';
import { ToolbarButtonComponent } from './tools/toolbar_button.component';
import { ToolbarGroupComponent } from './tools/toolbar_group.component';
import { DesignerModule } from './designer/designer.module';
import { PropertyEditorModule } from './property.editor/property.editor.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        DesignerModule,
        FormsModule,
        PropertyEditorModule,
        TranslationModule.forRoot(),
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        LoadingBarComponent,
        LanguageSelectorComponent,
        ZoomSliderComponent,
        ToolbarButtonComponent,
        ToolbarGroupComponent,
    ],
    providers: [
        SwitchBoardService,
        LoaderService,
        ControlService,
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
