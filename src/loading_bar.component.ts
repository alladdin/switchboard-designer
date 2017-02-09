import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
    selector: 'LoadingBar',
    styles: [`
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
        <div *ngIf="loading.visible" ngClass="loading-bar">
            <md-progress-bar [mode]="loading.mode" [value]="loading.value"></md-progress-bar>
        </div>
    `
})

export class LoadingBarComponent implements OnInit {
    public loading:any = {
        visible: false,
        value: 0,
        mode: 'indeterminate',
    };

    constructor(
        private loader: LoaderService,
    ) {}

    ngOnInit(): void {
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
}

