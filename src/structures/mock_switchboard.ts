import * as Structure from './all';
import { UUID } from 'angular2-uuid';

export const MOCK_SWITCHBOARD: Structure.SwitchBoard = new Structure.SwitchBoard({
    id: UUID.UUID(),
    name: 'Garáž',
    width: 545,
    height: 738,
    rails: [
        new Structure.Rail({
            id: UUID.UUID(),
            name: 'ŘADA01',
            width: 437,
            height: 150,
            x: 54,
            y: 60,
            items: [
                new Structure.DINDevice({
                    id: UUID.UUID(),
                    name: 'GAS01',
                    device_type: ['DEVICE', 'EATON', 'PL6', '1p'],
                    device_params: {
                        characteristic: 'B',
                        overcurrent: 6,
                    },
                }),
                new Structure.DINDevice({
                    id: UUID.UUID(),
                    name: 'GAS02',
                    device_type: ['DEVICE', 'EATON', 'PL6', '1p'],
                    device_params: {
                        characteristic: 'B',
                        overcurrent: 6,
                    },
                }),
                new Structure.DINDevice({
                    id: UUID.UUID(),
                    name: 'GAS03',
                    group_id: 3,
                    device_type: ['DEVICE', 'EATON', 'PL6', '1p'],
                    device_params: {
                        characteristic: 'B',
                        overcurrent: 6,
                    },
                }),
            ]
        }),
        new Structure.Rail({
            id: UUID.UUID(),
            name: 'ŘADA02',
            width: 437,
            height: 150,
            x: 54,
            y: 210,
            items: [
                new Structure.DINDevice({
                    id: UUID.UUID(),
                    name: 'GAZ01',
                    device_type: ['DEVICE', 'EATON', 'PL6', '1p'],
                    device_params: {
                        characteristic: 'B',
                        overcurrent: 16,
                    },
                }),
                new Structure.DINDevice({
                    id: UUID.UUID(),
                    name: 'GAZ02',
                    device_type: ['DEVICE', 'EATON', 'PL6', '3p'],
                    device_params: {
                        characteristic: 'B',
                        overcurrent: 16,
                    },
                }),
                new Structure.DINDevice({
                    id: UUID.UUID(),
                    name: 'GAC01',
                    device_type: ['DEVICE', 'EATON', 'PF6', '4p'],
                    device_params: {
                        overcurrent: 25,
                        cutoff_current: '003',
                    },
                }),
            ]
        }),
        new Structure.Rail({
            id: UUID.UUID(),
            name: 'ŘADA03',
            width: 437,
            height: 150,
            x: 54,
            y: 360,
            items: [
                new Structure.DINTerminalGroup({
                    id: UUID.UUID(),
                    name: 'GAZ01',
                    terminals: [
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'L',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'N',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'dark-blue' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'PE',
                            device_type: ['TERMINAL', 'BECOV', 'RSAPE', '4'],
                        }),
                    ],
                }),
                new Structure.DINTerminalGroup({
                    id: UUID.UUID(),
                    name: 'GAZ02',
                    terminals: [
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'L1',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'L2',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'L3',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'N',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'dark-blue' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'PE',
                            device_type: ['TERMINAL', 'BECOV', 'RSAPE', '4'],
                        }),
                    ],
                }),
                new Structure.DINTerminalGroup({
                    id: UUID.UUID(),
                    name: 'GAS01',
                    terminals: [
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'L',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'N',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'dark-blue' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'PE',
                            device_type: ['TERMINAL', 'BECOV', 'RSAPE', '4'],
                        }),
                    ],
                }),
                new Structure.DINTerminalGroup({
                    id: UUID.UUID(),
                    name: 'GAS02',
                    terminals: [
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'L',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'N',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'dark-blue' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'PE',
                            device_type: ['TERMINAL', 'BECOV', 'RSAPE', '4'],
                        }),
                    ],
                }),
                new Structure.DINTerminalGroup({
                    id: UUID.UUID(),
                    group_name: 'GAS03',
                    terminals: [
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'L',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'N',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'dark-blue' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: 'PE',
                            device_type: ['TERMINAL', 'BECOV', 'RSAPE', '4'],
                        }),
                    ],
                }),
                new Structure.DINTerminalGroup({
                    id: UUID.UUID(),
                    name: 'GAT01',
                    terminals: [
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: '0',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'gray' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: '1',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'orange' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: '2',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'orange' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: '3',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'orange' }
                        }),
                    ],
                }),
                new Structure.DINTerminalGroup({
                    id: UUID.UUID(),
                    name: 'GAT02',
                    terminals: [
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: '0',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'black' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: '1',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'red' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: '2',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'red' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: '3',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'red' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: '4',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'red' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: '5',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'red' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: '6',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'red' }
                        }),
                        new Structure.DINTerminal({
                            id: UUID.UUID(),
                            name: '7',
                            device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                            device_params: { color: 'red' }
                        }),
                    ],
                }),
            ]
        }),
        new Structure.Rail({
            id: UUID.UUID(),
            name: 'ŘADA04',
            width: 437,
            height: 150,
            x: 54,
            y: 510,
            items: [
                new Structure.DINDevice({
                    id: UUID.UUID(),
                    name: 'HLAVNÍ VYPÍNAČ',
                    device_type: ['DEVICE', 'EATON', 'IS', '3p'],
                    device_params: {
                        overcurrent: 32,
                    },
                }),
            ]
        })
    ],
});
