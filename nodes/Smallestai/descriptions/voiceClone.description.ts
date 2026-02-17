import type { INodeProperties } from 'n8n-workflow';

export const voiceCloneOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['voiceClone'],
            },
        },
        options: [
            {
                name: 'Add Voice',
                value: 'addVoice',
                description: 'Clone a voice from an audio file',
                action: 'Add voice',
            },
            {
                name: 'Get Cloned Voices',
                value: 'getClonedVoices',
                description: 'Retrieve all your cloned voices',
                action: 'Get cloned voices',
            },
            {
                name: 'Delete Cloned Voice',
                value: 'deleteClonedVoice',
                description: 'Delete a cloned voice by its ID',
                action: 'Delete cloned voice',
            },
        ],
        default: 'addVoice',
    },
];

export const voiceCloneFields: INodeProperties[] = [
    // ---- Model selector (shared across all operations) ----
    {
        displayName: 'Model',
        name: 'model',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['voiceClone'],
            },
        },
        options: [
            {
                name: 'Lightning Large',
                value: 'lightning-large',
                description: 'Default model for voice cloning',
            },
        ],
        default: 'lightning-large',
        description: 'The model to use for voice cloning operations',
    },

    // ---- Add Voice fields ----
    {
        displayName: 'Display Name',
        name: 'displayName',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['voiceClone'],
                operation: ['addVoice'],
            },
        },
        description: 'Display name for the voice clone',
    },
    {
        displayName: 'Binary Property',
        name: 'binaryPropertyName',
        type: 'string',
        default: 'data',
        required: true,
        displayOptions: {
            show: {
                resource: ['voiceClone'],
                operation: ['addVoice'],
            },
        },
        description:
            'Name of the binary property which contains the audio file to create the voice clone from',
    },

    // ---- Delete Cloned Voice fields ----
    {
        displayName: 'Voice ID',
        name: 'voiceId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['voiceClone'],
                operation: ['deleteClonedVoice'],
            },
        },
        description: 'The unique identifier of the voice clone to delete',
    },
];
