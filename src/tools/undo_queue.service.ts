import { Injectable } from '@angular/core';

@Injectable()
export class UndoQueueService {
    private _queue: any[];
    private _position: number;

    constructor() {
        this._queue = [];
        this._position = 0;
    }

    clear() {
        this._queue = [];
        this._position = 0;
    }

    add(name: string, undo_code: any, redo_code: any){
        if (this._queue.length > this._position){
            this._queue = this._queue.slice(0, this._position);
        }else{
            if (this._position > 0){
                if (this._queue[this._position - 1].name === name){
                    this._queue[this._position - 1].redo = redo_code;
                    return;
                }
            }
        }
        this._queue[this._position] = {
            name: name,
            undo: undo_code,
            redo: redo_code,
        };
        this._position++;
    }

    undo_size(): number {
        return this._position;
    }

    redo_size(): number {
        return this._queue.length - this._position;
    }

    undo() {
        if (this.undo_size() > 0) {
            this._position--;
            this._queue[this._position].undo();
        }
    }

    redo() {
        if (this.redo_size() > 0) {
            this._queue[this._position].redo();
            this._position++;
        }
    }
}
