import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class SmallestaiApi implements ICredentialType {
    name = 'smallestaiApi';
    displayName = 'Smallest.ai API';
    documentationUrl = 'https://console.smallest.ai/apikeys';
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
            url: '/v3/voices',
        },
    };
}