import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { LocaleModule, LocalizationModule } from 'angular2localization';
import { MaterialModule } from '@angular/material';
import { FormsModule }   from '@angular/forms';

import {SwitchBoardService} from './switchboard.service';
import {LoaderService} from './loader.service';
import {ControlService} from './control.service';

import { AppComponent }   from './app.component';
import { DesignerModule } from './designer/designer.module';
import { PropertyEditorModule } from './property.editor/property.editor.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        DesignerModule,
        FormsModule,
        PropertyEditorModule,
        LocaleModule.forRoot(),
        LocalizationModule.forRoot(),
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        SwitchBoardService,
        LoaderService,
        ControlService,
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
