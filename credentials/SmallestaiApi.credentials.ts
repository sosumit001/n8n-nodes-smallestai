import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class SmallestaiApi implements ICredentialType {
    name = 'smallestaiApi';
    displayName = 'Smallest.ai API';
    documentationUrl = 'https://app.smallest.ai/login?utm_source=n8n&utm_medium=integration&utm_campaign=api_key';
    icon = { light: 'file:../icons/smallestai.svg', dark: 'file:../icons/smallestai.svg' } as const;

    properties: INodeProperties[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            required: true,
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Authorization: '=Bearer {{$credentials.apiKey}}',
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://api.smallest.ai',
            url: '/waves/v1/lightning-v3.1/get_voices',
        },
    };
}