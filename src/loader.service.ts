import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {
    private progress = {
        visible: false,
        finished_count: 0,
        requested_count: 0,
    };

    getLoadingMode(): string {
        if (this.progress.visible){
            return this.progress.requested_count <= 0 ? 'indeterminate' :'determinate';
        }else{
            return undefined;
        }
    }

    getLoadingValue(): number {
        if (this.progress.requested_count > 0){
            return this.progress.finished_count * 100 / this.progress.requested_count;
        }else{
            return 0;
        }
    }

    start_loading(): void {
        this.progress.visible = true;
    }

    start_request(): void {
        this.progress.visible = true;
        this.progress.requested_count++;
    }

    finish_request(): void {
        this.progress.finished_count++;
        if (this.progress.finished_count >= this.progress.requested_count){
            this.progress.visible = false;
            this.progress.requested_count = 0;
            this.progress.finished_count = 0;
        }
    }
}

