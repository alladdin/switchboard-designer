import * as Structure from './all';
import { UUID } from 'angular2-uuid';

var ALL_UUIDS = {};

function get_uuid(name: string) {
    if (!ALL_UUIDS[name]){
        ALL_UUIDS[name] = UUID.UUID();
    }
    return ALL_UUIDS[name];
}

function get_RSA_terminal(name: string, color: string = 'red'){
    switch(name.charAt(0)){
        case 'L':
            return {
                type: 'DINTerminal',
                name: name,
                device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                device_params: { color: 'black' }
            };
        case 'N':
            return {
                type: 'DINTerminal',
                name: name,
                device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                device_params: { color: 'dark-blue' }
            };
        case 'P':
            return {
                type: 'DINTerminal',
                name: name,
                device_type: ['TERMINAL', 'BECOV', 'RSAPE', '4'],
            };
        default:
            return {
                type: 'DINTerminal',
                name: name,
                device_type: ['TERMINAL', 'BECOV', 'RSA', '4'],
                device_params: { color: color }
            };
    }
}

export var MOCK_ALL_OBJECTS = {};
export var MOCK_SWITCHBOARD_UUID = get_uuid('switchboard');
export var MOCK_PROJECT = {
    switchboard_id: get_uuid('switchboard')
}

function add_1f_terminal_group(name:string) {
    MOCK_ALL_OBJECTS[get_uuid('group_' + name)] = {
        type: 'DINTerminalGroup',
        name: name,
        terminals: [
            get_uuid('terminal_'+name+'_L'),
            get_uuid('terminal_'+name+'_N'),
            get_uuid('terminal_'+name+'_PE'),
        ],
    };
    MOCK_ALL_OBJECTS[get_uuid('terminal_'+name+'_L')] = get_RSA_terminal('L');
    MOCK_ALL_OBJECTS[get_uuid('terminal_'+name+'_N')] = get_RSA_terminal('N');
    MOCK_ALL_OBJECTS[get_uuid('terminal_'+name+'_PE')] = get_RSA_terminal('PE');
}

function add_3f_terminal_group(name:string) {
    MOCK_ALL_OBJECTS[get_uuid('group_' + name)] = {
        type: 'DINTerminalGroup',
        name: name,
        terminals: [
            get_uuid('terminal_'+name+'_L1'),
            get_uuid('terminal_'+name+'_L2'),
            get_uuid('terminal_'+name+'_L3'),
            get_uuid('terminal_'+name+'_N'),
            get_uuid('terminal_'+name+'_PE'),
        ],
    };
    MOCK_ALL_OBJECTS[get_uuid('terminal_'+name+'_L1')] = get_RSA_terminal('L1');
    MOCK_ALL_OBJECTS[get_uuid('terminal_'+name+'_L2')] = get_RSA_terminal('L2');
    MOCK_ALL_OBJECTS[get_uuid('terminal_'+name+'_L3')] = get_RSA_terminal('L3');
    MOCK_ALL_OBJECTS[get_uuid('terminal_'+name+'_N')] = get_RSA_terminal('N');
    MOCK_ALL_OBJECTS[get_uuid('terminal_'+name+'_PE')] = get_RSA_terminal('PE');
}

function add_multi_terminal_group(name:string, count:number = 4, style:string = 'dark') {
    let term_ids: string[] = [];
    for (let i = 0; i < count; i++){
        term_ids[i] = get_uuid('terminal_'+name+'_'+i);
        let color = (style === 'light' ? 'orange' : 'red');
        if (i < 1){
            color = (style === 'light' ? 'gray' : 'black');
        }
        MOCK_ALL_OBJECTS[term_ids[i]] = get_RSA_terminal(''+i, color);
    }
    MOCK_ALL_OBJECTS[get_uuid('group_' + name)] = {
        type: 'DINTerminalGroup',
        name: name,
        terminals: term_ids
    };
}

MOCK_ALL_OBJECTS[get_uuid('switchboard')] = {
    type: 'SwitchBoard',
    name: 'Garáž',
    width: 545,
    height: 738,
    rails: [
        get_uuid('rail1'),
        get_uuid('rail2'),
        get_uuid('rail3'),
        get_uuid('rail4'),
    ]
};
MOCK_ALL_OBJECTS[get_uuid('rail1')] = {
    type: 'Rail',
    name: 'ŘADA01',
    width: 437,
    height: 150,
    x: 54,
    y: 60,
    items: [
        get_uuid('dev_GAS01'),
        get_uuid('dev_GAS02'),
        get_uuid('dev_GAS03'),
    ],
};
MOCK_ALL_OBJECTS[get_uuid('rail2')] = {
    type: 'Rail',
    name: 'ŘADA02',
    width: 437,
    height: 150,
    x: 54,
    y: 210,
    items: [
        get_uuid('dev_GAZ01'),
        get_uuid('dev_GAZ02'),
        get_uuid('dev_GAC01'),
    ],
};
MOCK_ALL_OBJECTS[get_uuid('rail3')] = {
    type: 'Rail',
    name: 'ŘADA03',
    width: 437,
    height: 150,
    x: 54,
    y: 360,
    items: [
        get_uuid('group_GAZ01'),
        get_uuid('group_GAZ02'),
        get_uuid('group_GAS01'),
        get_uuid('group_GAS02'),
        get_uuid('group_GAS03'),
        get_uuid('group_GAT01'),
        get_uuid('group_GAT02'),
    ],
};
MOCK_ALL_OBJECTS[get_uuid('rail4')] = {
    type: 'Rail',
    name: 'ŘADA04',
    width: 437,
    height: 150,
    x: 54,
    y: 510,
    items: [
        get_uuid('dev_HV'),
    ],
};
MOCK_ALL_OBJECTS[get_uuid('dev_GAS01')] = {
    type: 'DINDevice',
    name: 'GAS01',
    device_type: ['DEVICE', 'EATON', 'PL6', '1p'],
    device_params: {
        characteristic: 'B',
        overcurrent: 6,
    },
};
MOCK_ALL_OBJECTS[get_uuid('dev_GAS02')] = {
    type: 'DINDevice',
    name: 'GAS02',
    device_type: ['DEVICE', 'EATON', 'PL6', '1p'],
    device_params: {
        characteristic: 'B',
        overcurrent: 6,
    },
};
MOCK_ALL_OBJECTS[get_uuid('dev_GAS03')] = {
    type: 'DINDevice',
    name: 'GAS03',
    device_type: ['DEVICE', 'EATON', 'PL6', '1p'],
    device_params: {
        characteristic: 'B',
        overcurrent: 6,
    },
};
MOCK_ALL_OBJECTS[get_uuid('dev_GAZ01')] = {
    type: 'DINDevice',
    name: 'GAZ01',
    device_type: ['DEVICE', 'EATON', 'PL6', '1p'],
    device_params: {
        characteristic: 'B',
        overcurrent: 16,
    },
};
MOCK_ALL_OBJECTS[get_uuid('dev_GAZ02')] = {
    type: 'DINDevice',
    name: 'GAZ02',
    device_type: ['DEVICE', 'EATON', 'PL6', '3p'],
    device_params: {
        characteristic: 'B',
        overcurrent: 16,
    },
};
MOCK_ALL_OBJECTS[get_uuid('dev_GAC01')] = {
    type: 'DINDevice',
    name: 'GAC01',
    device_type: ['DEVICE', 'EATON', 'PF6', '4p'],
    device_params: {
        overcurrent: 25,
        cutoff_current: '003',
    },
};

add_1f_terminal_group('GAZ01');
add_3f_terminal_group('GAZ02');
add_1f_terminal_group('GAS01');
add_1f_terminal_group('GAS02');
add_1f_terminal_group('GAS03');
add_multi_terminal_group('GAT01', 4, 'dark');
add_multi_terminal_group('GAT02', 8, 'light');

MOCK_ALL_OBJECTS[get_uuid('dev_HV')] = {
    type: 'DINDevice',
    name: 'HLAVNÍ VYPÍNAČ',
    device_type: ['DEVICE', 'EATON', 'IS', '3p'],
    device_params: {
        overcurrent: 32,
    },
};
