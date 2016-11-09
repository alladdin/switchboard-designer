import * as Structure from './all';
import { UUID } from 'angular2-uuid';

export const MOCK_SWITCHBOARD: Structure.SwitchBoard = new Structure.SwitchBoard({
    id: UUID.UUID(),
    name: 'Garage',
    width: 545,
    height: 738,
    rails: [
        new Structure.Rail({
            id: UUID.UUID(),
            name: 'RAIL1',
            width: 437,
            height: 150,
            x: 54,
            y: 60,
            items: [
                new Structure.DINDevice({
                    id: UUID.UUID(),
                    group_name: 'GAS',
                    group_id: 1,
                    device_type: ['DEVICE', 'EATON', 'PL6-1'],
                    device_params: {
                        characteristic: 'B',
                        overcurrent: 6,
                    },
                }),
                new Structure.DINDevice({
                    id: UUID.UUID(),
                    group_name: 'GAS',
                    group_id: 2,
                    device_type: ['DEVICE', 'EATON', 'PL6-1'],
                    device_params: {
                        characteristic: 'B',
                        overcurrent: 6,
                    },
                }),
                new Structure.DINDevice({
                    id: UUID.UUID(),
                    group_name: 'GAS',
                    group_id: 3,
                    device_type: ['DEVICE', 'EATON', 'PL6-1'],
                    device_params: {
                        characteristic: 'B',
                        overcurrent: 6,
                    },
                }),
            ]
        }),
        new Structure.Rail({
            id: UUID.UUID(),
            name: 'RAIL2',
            width: 437,
            height: 150,
            x: 54,
            y: 210,
            items: [
                new Structure.DINDevice({
                    id: UUID.UUID(),
                    group_name: 'GAZ',
                    group_id: 1,
                    device_type: ['DEVICE', 'EATON', 'PL6-1'],
                    device_params: {
                        characteristic: 'B',
                        overcurrent: 16,
                    },
                }),
                new Structure.DINDevice({
                    id: UUID.UUID(),
                    group_name: 'GAZ',
                    group_id: 2,
                    device_type: ['DEVICE', 'EATON', 'PL6-3'],
                    device_params: {
                        characteristic: 'B',
                        overcurrent: 16,
                    },
                }),
                new Structure.DINDevice({
                    id: UUID.UUID(),
                    group_name: 'GAC',
                    group_id: 1,
                    device_type: ['DEVICE', 'EATON', 'PF6-4'],
                    device_params: {
                        overcurrent: 25,
                        cutoff_current: '003',
                    },
                }),
            ]
        }),
        new Structure.Rail({
            id: UUID.UUID(),
            name: 'RAIL3',
            width: 437,
            height: 150,
            x: 54,
            y: 360,
            items: [
                new Structure.DINTerminalGroup({
                    id: UUID.UUID(),
                    group_name: 'GAZ',
                    group_id: 1,
                    terminals: [
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'L',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'N',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'dark-blue' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'PE',
                            device_type: ['TERMINAL', 'BECOV', 'RSAPE4'],
                        }),
                    ],
                }),
                new Structure.DINTerminalGroup({
                    id: UUID.UUID(),
                    group_name: 'GAZ',
                    group_id: 2,
                    terminals: [
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'L1',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'L2',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'L3',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'N',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'dark-blue' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'PE',
                            device_type: ['TERMINAL', 'BECOV', 'RSAPE4'],
                        }),
                    ],
                }),
                new Structure.DINTerminalGroup({
                    id: UUID.UUID(),
                    group_name: 'GAS',
                    group_id: 1,
                    terminals: [
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'L',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'N',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'dark-blue' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'PE',
                            device_type: ['TERMINAL', 'BECOV', 'RSAPE4'],
                        }),
                    ],
                }),
                new Structure.DINTerminalGroup({
                    id: UUID.UUID(),
                    group_name: 'GAS',
                    group_id: 2,
                    terminals: [
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'L',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'N',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'dark-blue' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'PE',
                            device_type: ['TERMINAL', 'BECOV', 'RSAPE4'],
                        }),
                    ],
                }),
                new Structure.DINTerminalGroup({
                    id: UUID.UUID(),
                    group_name: 'GAS',
                    group_id: 3,
                    terminals: [
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'L',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'N',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'dark-blue' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: 'PE',
                            device_type: ['TERMINAL', 'BECOV', 'RSAPE4'],
                        }),
                    ],
                }),
                new Structure.DINTerminalGroup({
                    id: UUID.UUID(),
                    group_name: 'GAT',
                    group_id: 1,
                    terminals: [
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: '0',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'gray' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: '1',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'orange' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: '2',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'orange' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: '3',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'orange' }
                        }),
                    ],
                }),
                new Structure.DINTerminalGroup({
                    id: UUID.UUID(),
                    group_name: 'GAT',
                    group_id: 2,
                    terminals: [
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: '0',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: '1',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'red' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: '2',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'red' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: '3',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'red' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: '4',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'red' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: '5',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'red' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: '6',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'red' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            local_name: '7',
                            device_type: ['TERMINAL', 'BECOV', 'RSA4'],
                            device_params: { color: 'red' }
                        }),
                    ],
                }),
            ]
        }),
        new Structure.Rail({
            id: UUID.UUID(),
            name: 'RAIL4',
            width: 437,
            height: 150,
            x: 54,
            y: 510,
        })
    ],
});
