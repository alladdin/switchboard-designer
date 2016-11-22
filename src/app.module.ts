import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import {SwitchBoardService} from './switchboard.service';

import { AppComponent }   from './app.component';
import { DesignerModule } from './designer.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        DesignerModule,
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
