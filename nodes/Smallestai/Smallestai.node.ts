import type {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { ttsOperations, ttsFields, sttOperations, sttFields, voiceCloneOperations, voiceCloneFields } from './descriptions';
import { handleTtsSynthesize, handleGetVoices, handleSttTranscribe, handleAddVoice, handleGetClonedVoices, handleDeleteClonedVoice } from './operations';

export class Smallestai implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Smallest AI',
        name: 'smallestai',
        icon: 'file:../../icons/smallestai.svg',
        group: ['transform'],
        version: 1,
        usableAsTool: true,
        subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
        description: 'Interact with Smallest AI APIs for voice synthesis and agents',
        defaults: {
            name: 'Smallest AI',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'smallestaiApi',
                required: true,
            },
        ],
        properties: [
            // --- Resource selector ---
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Speech (TTS)',
                        value: 'tts',
                    },
                    {
                        name: 'Transcription (STT)',
                        value: 'stt',
                    },
                    {
                        name: 'Voice Clone',
                        value: 'voiceClone',
                    },
                ],
                default: 'tts',
            },
            // --- TTS ---
            ...ttsOperations,
            ...ttsFields,
            // --- STT ---
            ...sttOperations,
            ...sttFields,
            // --- Voice Clone ---
            ...voiceCloneOperations,
            ...voiceCloneFields,
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;

        for (let i = 0; i < items.length; i++) {
            try {
                if (resource === 'tts' && operation === 'synthesize') {
                    returnData.push(await handleTtsSynthesize(this, i));
                } else if (resource === 'tts' && operation === 'getVoices') {
                    const voices = await handleGetVoices(this, i);
                    returnData.push(...voices);
                } else if (resource === 'stt' && operation === 'transcribe') {
                    returnData.push(await handleSttTranscribe(this, i, items));
                } else if (resource === 'voiceClone') {
                    if (operation === 'addVoice') {
                        returnData.push(await handleAddVoice(this, i, items));
                    } else if (operation === 'getClonedVoices') {
                        const voices = await handleGetClonedVoices(this, i);
                        returnData.push(...voices);
                    } else if (operation === 'deleteClonedVoice') {
                        returnData.push(await handleDeleteClonedVoice(this, i));
                    }
                }
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: (error as Error).message } });
                    continue;
                }
                throw new NodeOperationError(this.getNode(), error);
            }
        }

        return [returnData];
    }
}
