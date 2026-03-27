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
                description: 'Fast and high-quality text-to-speech',
            },
        ],
        default: 'lightning-v3.1',
        description: 'The model to use for speech synthesis',
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
    // ---- Voice selector dropdown ----
    {
        displayName: 'Voice',
        name: 'voiceId',
        type: 'options',
        required: true,
        displayOptions: {
            show: {
                resource: ['tts'],
                operation: ['synthesize'],
            },
        },
        options: [
            // ── Custom Voice ID ──
            { name: 'Custom Voice ID', value: '__custom__' },

            // ── English voices ──
            { name: 'Avery — English · American · Female', value: 'avery' },
            { name: 'Ella — English · American · Female', value: 'ella' },
            { name: 'Brian — English · American · Male', value: 'brian' },
            { name: 'Mia — English · American · Female', value: 'mia' },
            { name: 'Quinn — English · American · Female', value: 'quinn' },
            { name: 'Sophia — English · American · Female', value: 'sophia' },
            { name: 'Sandra — English · American · Female', value: 'sandra' },
            { name: 'Robert — English · American · Male', value: 'robert' },
            { name: 'Johnny — English · American · Male', value: 'johnny' },
            { name: 'Daniel — English · American · Male', value: 'daniel' },
            { name: 'Vanessa — English · American · Female', value: 'vanessa' },
            { name: 'Lucas — English · American · Male', value: 'lucas' },
            { name: 'Brooke — English · American · Female', value: 'brooke' },
            { name: 'Nicole — English · American · Female', value: 'nicole' },
            { name: 'Dina — English · American · Female', value: 'dina' },
            { name: 'Kevin — English · American · Female', value: 'kevin' },
            { name: 'Rachel — English · American · Female', value: 'rachel' },
            { name: 'Alex — English · American · Male', value: 'alex' },
            { name: 'Elizabeth — English · American · Female', value: 'elizabeth' },
            { name: 'Ethan — English · American · Male', value: 'ethan' },
            { name: 'Lauren — English · American · Female', value: 'lauren' },
            { name: 'Hannah — English · American · Female', value: 'hannah' },
            { name: 'Jessica — English · American · Female', value: 'jessica' },
            { name: 'Jordan — English · American · Male', value: 'jordan' },
            { name: 'Olivia — English · American · Female', value: 'olivia' },
            { name: 'Magnus — English · American · Male', value: 'magnus' },
            { name: 'Kyle — English · American · Male', value: 'kyle' },
            { name: 'Harper — English · American · Female', value: 'harper' },
            { name: 'Divyanshu — English · American · Male', value: 'divyanshu' },
            { name: 'Biance — English · American · Female', value: 'biance' },
            { name: 'Tara — English · Neutral · Female', value: 'tara' },
            { name: 'Cooper — English · Australian · Male', value: 'cooper' },
            { name: 'Liam — English · British · Male', value: 'liam' },
            { name: 'Noah — English · British · Male', value: 'noah' },
            { name: 'Poppy — English · British · Female', value: 'poppy' },
            { name: 'Edward — English · British · Male', value: 'edward' },

            // ── Hindi voices ──
            { name: 'Devansh — Hindi · Indian · Male', value: 'devansh' },
            { name: 'Zoya — Hindi · Indian · Female', value: 'zoya' },
            { name: 'Aanya — Hindi · Indian · Female', value: 'aanya' },

            // ── English + Hindi voices ──
            { name: 'Divya — English, Hindi · Indian · Female', value: 'divya' },
            { name: 'Megan — English, Hindi · American · Female', value: 'megan' },
            { name: 'Maithili — English, Hindi · Indian · Female', value: 'maithili' },
            { name: 'Neel — English, Hindi · Indian · Male', value: 'neel' },
            { name: 'Arjun — English, Hindi · Indian · Male', value: 'arjun' },
            { name: 'Vivaan — English, Hindi · Indian · Male', value: 'vivaan' },
            { name: 'Advika — English, Hindi · Indian · Female', value: 'advika' },
            { name: 'Aisha — English, Hindi · Indian · Female', value: 'aisha' },
            { name: 'Sana — English, Hindi · Indian · Female', value: 'sana' },
            { name: 'Avni — English, Hindi · Indian · Female', value: 'avni' },
            { name: 'Ishani — English, Hindi · Indian · Female', value: 'ishani' },
            { name: 'Yuvika — English, Hindi · Indian · Female', value: 'yuvika' },
            { name: 'Gaurav — English, Hindi · Indian · Male', value: 'gaurav' },
            { name: 'Hitesh — English, Hindi · Indian · Male', value: 'hitesh' },
            { name: 'Vaibhav — English, Hindi · Indian · Male', value: 'vaibhav' },
            { name: 'Siddharth — English, Hindi · Indian · Male', value: 'siddharth' },
            { name: 'Sakshi — English, Hindi · Indian · Female', value: 'sakshi' },
            { name: 'Kunal — English, Hindi · Indian · Male', value: 'kunal' },
            { name: 'Anuja — English, Hindi · Indian · Female', value: 'anuja' },
            { name: 'Siya — English, Hindi · Indian · Female', value: 'siya' },
            { name: 'Atharv — English, Hindi · Indian · Male', value: 'atharv' },
            { name: 'Aarush — English, Hindi · Indian · Male', value: 'aarush' },
            { name: 'Mohit — English, Hindi · Indian · Male', value: 'mohit' },
            { name: 'Ira — English, Hindi · Indian · Female', value: 'ira' },
            { name: 'Mihir — English, Hindi · Indian · Male', value: 'mihir' },
            { name: 'Shyam — English, Hindi · Indian · Male', value: 'shyam' },
            { name: 'Tripti — English, Hindi · Indian · Female', value: 'tripti' },
            { name: 'Kavya — English, Hindi · Indian · Female', value: 'kavya' },
            { name: 'Parth — English, Hindi · Indian · Male', value: 'parth' },
            { name: 'Sameera — English, Hindi · Indian · Female', value: 'sameera' },
            { name: 'Srishti — English, Hindi · Indian · Female', value: 'srishti' },
            { name: 'Chinmayi — English, Hindi · Indian · Female', value: 'chinmayi' },
            { name: 'Sunidhi — English, Hindi · Indian · Female', value: 'sunidhi' },

            // ── Gujarati voices ──
            { name: 'Dhruvit — Gujarati · Gujarati · Male', value: 'dhruvit' },
            { name: 'Kiran — Gujarati · Gujarati · Male', value: 'kiran' },
            { name: 'Nirav — Gujarati · Gujarati · Male', value: 'nirav' },
            { name: 'Prachi — Gujarati · Gujarati · Female', value: 'prachi' },

            // ── Gujarati + English + Hindi voices ──
            { name: 'Niharika — Gujarati, English, Hindi · Gujarati · Female', value: 'niharika' },
            { name: 'Nilesh — Marathi, English, Hindi · Marathi · Male', value: 'nilesh' },

            // ── Marathi voices ──
            { name: 'Gauri — Marathi · Marathi · Female', value: 'gauri' },
            { name: 'Rupali — Marathi · Marathi · Female', value: 'rupali' },
            { name: 'Sanket — Marathi · Marathi · Male', value: 'sanket' },
            { name: 'Priyanka — Marathi · Marathi · Female', value: 'priyanka' },

            // ── Tamil voices ──
            { name: 'Anitha — Tamil · Tamil · Female', value: 'anitha' },
            { name: 'Raju — Tamil · Tamil · Male', value: 'raju' },
            { name: 'Sandhya — Tamil · Tamil · Female', value: 'sandhya' },
            { name: 'Balaji — Tamil · Tamil · Male', value: 'balaji' },
            { name: 'Jeevan — Tamil · Tamil · Male', value: 'jeevan' },
            { name: 'Rajeshwari — Tamil · Tamil · Female', value: 'rajeshwari' },

            // ── Spanish voices ──
            { name: 'Camilla — Spanish · Mexican/Latin · Female', value: 'camilla' },
            { name: 'Carlos — Spanish · Mexican/Latin · Male', value: 'carlos' },
            { name: 'Mariana — Spanish · Mexican/Latin · Female', value: 'mariana' },
            { name: 'Luis — Spanish · Mexican/Latin · Male', value: 'luis' },
            { name: 'Daniella — Spanish · Mexican/Latin · Female', value: 'daniella' },
            { name: 'José — Spanish · Mexican/Latin · Male', value: 'jose' },
            { name: 'Lucia — Spanish · Mexican/Latin · Female', value: 'lucia' },
            { name: 'Javier — Spanish · Mexican/Latin · Male', value: 'javier' },
            { name: 'Miguel — Spanish · Mexican/Latin · Male', value: 'miguel' },
            { name: 'Diego — Spanish · Mexican/Latin · Male', value: 'diego' },
            { name: 'Gabriela — Spanish · Mexican/Latin · Female', value: 'gabriela' },

            // ── Telugu voices ──
            { name: 'Padmaja — Telugu · Telugu · Female', value: 'padmaja' },
            { name: 'Shrihari — Telugu · Telugu · Male', value: 'shrihari' },

            // ── Kannada voices ──
            { name: 'Deepashri — Kannada · Kannada · Female', value: 'deepashri' },
            { name: 'Pranav — Kannada · Kannada · Male', value: 'pranav' },

            // ── Malayalam voices ──
            { name: 'Vaisakh — Malayalam · Malayalam · Male', value: 'vaisakh' },
            { name: 'Shibi — Malayalam · Malayalam · Male', value: 'shibi' },
        ],
        default: 'avery',
        description: 'Select a built-in voice or choose "Custom Voice ID" to enter your own',
    },
    // Conditional text input for custom voice ID
    {
        displayName: 'Custom Voice ID',
        name: 'customVoiceId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['tts'],
                operation: ['synthesize'],
                voiceId: ['__custom__'],
            },
        },
        description: 'Enter a custom voice ID (e.g. a cloned voice ID from the Smallest AI dashboard)',
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
