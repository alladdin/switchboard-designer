import { Injectable } from '@angular/core';
import { SwitchBoard } from './structures/switchboard';
import { MOCK_SWITCHBOARD } from './structures/mock_switchboard';

@Injectable()
export class SwitchBoardService {
    getAllSwitchBoards(): Promise<SwitchBoard[]> {
        return Promise.resolve([MOCK_SWITCHBOARD]);
    }

    getSwitchBoard(id: number): Promise<SwitchBoard> {
        return Promise.resolve(MOCK_SWITCHBOARD);
    }
}

