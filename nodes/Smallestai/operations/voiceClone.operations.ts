import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

const API_BASE = 'https://waves-api.smallest.ai/api/v1';

/**
 * Add (clone) a voice from an uploaded audio file.
 */
export async function handleAddVoice(
    ctx: IExecuteFunctions,
    itemIndex: number,
    items: INodeExecutionData[],
): Promise<INodeExecutionData> {
    const model = ctx.getNodeParameter('model', itemIndex) as string;
    const displayName = ctx.getNodeParameter('displayName', itemIndex) as string;
    const binaryPropertyName = ctx.getNodeParameter('binaryPropertyName', itemIndex) as string;

    if (
        items[itemIndex].binary === undefined ||
        items[itemIndex].binary![binaryPropertyName] === undefined
    ) {
        throw new NodeOperationError(
            ctx.getNode(),
            `No binary data property "${binaryPropertyName}" found on item!`,
            { itemIndex },
        );
    }

    const binaryData = items[itemIndex].binary![binaryPropertyName];
    const binaryBuffer = await ctx.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName);

    const formData = {
        displayName,
        file: {
            value: binaryBuffer,
            options: {
                filename: binaryData.fileName || 'audio.wav',
                contentType: binaryData.mimeType || 'audio/wav',
            },
        },
    };

    const response = await ctx.helpers.requestWithAuthentication.call(
        ctx,
        'smallestaiApi',
        {
            method: 'POST',
            url: `${API_BASE}/${model}/add_voice`,
            formData,
            json: true,
        },
    );

    return { json: response };
}

/**
 * Retrieve all cloned voices for the authenticated user.
 */
export async function handleGetClonedVoices(
    ctx: IExecuteFunctions,
    itemIndex: number,
): Promise<INodeExecutionData[]> {
    const model = ctx.getNodeParameter('model', itemIndex) as string;
    const response = await ctx.helpers.requestWithAuthentication.call(
        ctx,
        'smallestaiApi',
        {
            method: 'GET',
            url: `${API_BASE}/${model}/get_cloned_voices`,
            json: true,
        },
    );

    // Return each voice as a separate item for easier downstream processing
    const voices = (response as { voices?: IDataObject[] }).voices || [];
    if (voices.length === 0) {
        return [{ json: response as IDataObject }];
    }
    return voices.map((voice: IDataObject) => ({ json: voice }));
}

/**
 * Delete a cloned voice by its ID.
 */
export async function handleDeleteClonedVoice(
    ctx: IExecuteFunctions,
    itemIndex: number,
): Promise<INodeExecutionData> {
    const model = ctx.getNodeParameter('model', itemIndex) as string;
    const voiceId = ctx.getNodeParameter('voiceId', itemIndex) as string;

    const response = await ctx.helpers.requestWithAuthentication.call(
        ctx,
        'smallestaiApi',
        {
            method: 'DELETE',
            url: `${API_BASE}/${model}`,
            body: { voiceId },
            json: true,
        },
    );

    return { json: response };
}
