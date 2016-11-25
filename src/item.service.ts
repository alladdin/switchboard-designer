import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ItemService {
    private base_path = '/data';
    private extension = '.json';

    constructor(private http: Http) { }

    getItem(path: string[]): Promise<any> {
        return this.http.get(this.build_path(path))
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private build_path(path_parts: string[]) {
        return this.base_path + '/' + path_parts.join('/') + this.extension;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.resolve(undefined);
    }
}
