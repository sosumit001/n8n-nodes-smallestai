import type { INodeProperties } from 'n8n-workflow';

export const ttsOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['tts'],
            },
        },
        options: [
            {
                name: 'Synthesize Speech',
                value: 'synthesize',
                description: 'Convert text to speech',
                action: 'Synthesize speech',
            },
            {
                name: 'Get Voices',
                value: 'getVoices',
                description: 'Retrieve available voice models',
                action: 'Get voices',
            },
        ],
        default: 'synthesize',
    },
];

export const ttsFields: INodeProperties[] = [
    // Model for Synthesize
    {
        displayName: 'Model',
        name: 'model',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['tts'],
                operation: ['synthesize'],
            },
        },
        options: [
            {
                name: 'Lightning V3.1',
                value: 'lightning-v3.1',
                description: 'Default voices — fast and high quality',
            },
            {
                name: 'Lightning Large',
                value: 'lightning-large',
                description: 'Use with cloned voices',
            },
        ],
        default: 'lightning-v3.1',
        description: 'The model to use. Select "Lightning Large" when using a cloned voice.',
    },
    // Model for Get Voices
    {
        displayName: 'Model',
        name: 'model',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['tts'],
                operation: ['getVoices'],
            },
        },
        options: [
            {
                name: 'Lightning V2',
                value: 'lightning-v2',
            },
            {
                name: 'Lightning V3.1',
                value: 'lightning-v3.1',
            },
        ],
        default: 'lightning-v3.1',
        description: 'The model to retrieve available voices for',
    },
    {
        displayName: 'Text',
        name: 'text',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['tts'],
                operation: ['synthesize'],
            },
        },
        description: 'The text to convert to speech',
    },
    {
        displayName: 'Voice ID',
        name: 'voiceId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['tts'],
                operation: ['synthesize'],
            },
        },
        description: 'The voice identifier to use for speech generation',
    },
    {
        displayName: 'Output Format',
        name: 'output_format',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['tts'],
                operation: ['synthesize'],
            },
        },
        options: [
            { name: 'PCM', value: 'pcm' },
            { name: 'MP3', value: 'mp3' },
            { name: 'WAV', value: 'wav' },
            { name: 'Mulaw', value: 'mulaw' },
        ],
        default: 'wav',
        description: 'The format of the output audio',
    },
    {
        displayName: 'Additional Options',
        name: 'additionalOptions',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        displayOptions: {
            show: {
                resource: ['tts'],
                operation: ['synthesize'],
            },
        },
        options: [
            {
                displayName: 'Sample Rate',
                name: 'sample_rate',
                type: 'options',
                options: [
                    { name: '8000', value: 8000 },
                    { name: '16000', value: 16000 },
                    { name: '24000', value: 24000 },
                    { name: '44100', value: 44100 },
                ],
                default: 44100,
                description: 'The sample rate for the generated audio',
            },
            {
                displayName: 'Speed',
                name: 'speed',
                type: 'number',
                typeOptions: {
                    minValue: 0.5,
                    maxValue: 2,
                },
                default: 1,
                description: 'The speed of the generated speech',
            },
            {
                displayName: 'Language',
                name: 'language',
                type: 'options',
                options: [
                    { name: 'Auto', value: 'auto' },
                    { name: 'English', value: 'en' },
                    { name: 'Hindi', value: 'hi' },
                    { name: 'Spanish', value: 'es' },
                    { name: 'Tamil', value: 'ta' },
                ],
                default: 'auto',
            },
        ],
    },
];
