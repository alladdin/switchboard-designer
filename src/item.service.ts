import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ItemService {
    constructor(private http: Http) { }

    getItem(path: string[]): Promise<any> {
        let target_path: string = '/data';
        for (let key of path){
            target_path += '/' + key;
        }
        return this.http.get(target_path + '.json')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.resolve(undefined);
        //return Promise.reject(error.message || error);
    }
}
