import type { INodeProperties } from 'n8n-workflow';

export const sttOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['stt'],
            },
        },
        options: [
            {
                name: 'Transcribe Audio',
                value: 'transcribe',
                description: 'Transcribe audio to text',
                action: 'Transcribe audio',
            },
        ],
        default: 'transcribe',
    },
];

export const sttFields: INodeProperties[] = [
    {
        displayName: 'Binary Property',
        name: 'binaryPropertyName',
        type: 'string',
        default: 'data',
        required: true,
        displayOptions: {
            show: {
                resource: ['stt'],
                operation: ['transcribe'],
            },
        },
        description:
            'Name of the binary property which contains the audio file to be transcribed',
    },
    {
        displayName: 'Additional Options',
        name: 'additionalOptions',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        displayOptions: {
            show: {
                resource: ['stt'],
                operation: ['transcribe'],
            },
        },
        options: [
            {
                displayName: 'Language',
                name: 'language',
                type: 'options',
                options: [
                    { name: 'Arabic', value: 'ar' },
                    { name: 'Auto', value: 'auto' },
                    { name: 'Bengali', value: 'bn' },
                    { name: 'Dutch', value: 'nl' },
                    { name: 'English', value: 'en' },
                    { name: 'French', value: 'fr' },
                    { name: 'German', value: 'de' },
                    { name: 'Gujarati', value: 'gu' },
                    { name: 'Hebrew', value: 'he' },
                    { name: 'Hindi', value: 'hi' },
                    { name: 'Italian', value: 'it' },
                    { name: 'Kannada', value: 'kn' },
                    { name: 'Malayalam', value: 'ml' },
                    { name: 'Marathi', value: 'mr' },
                    { name: 'Polish', value: 'pl' },
                    { name: 'Russian', value: 'ru' },
                    { name: 'Spanish', value: 'es' },
                    { name: 'Swedish', value: 'sv' },
                    { name: 'Tamil', value: 'ta' },
                    { name: 'Telugu', value: 'te' },
                ],
                default: 'en',
            },
            {
                displayName: 'Age Detection',
                name: 'age_detection',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'Gender Detection',
                name: 'gender_detection',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'Emotion Detection',
                name: 'emotion_detection',
                type: 'boolean',
                default: false,
            },
        ],
    },
];
