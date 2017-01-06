import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { LocaleModule, LocalizationModule } from 'angular2localization';

import {SwitchBoardService} from './switchboard.service';

import { AppComponent }   from './app.component';
import { DesignerModule } from './designer/designer.module';
import { PropertyEditorModule } from './property.editor/property.editor.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        DesignerModule,
        PropertyEditorModule,
        LocaleModule.forRoot(),
        LocalizationModule.forRoot()
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        SwitchBoardService,
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
