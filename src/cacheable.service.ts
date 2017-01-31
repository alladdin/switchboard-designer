import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';

export class CacheableService {
    private cache = {};

    constructor() { }

    getWithCache(id: string, callback: (id: string) => Observable<any>): Observable<any> {
        if (this.cache[id]){
            if (this.cache[id] instanceof Observable){
                return this.cache[id];
            }else{
                return Observable.of(this.cache[id]);
            }
        }else{
            return this.cache[id] = callback(id)
                .map(response => this.cache[id] = response)
                .share();
        }

    }
}

