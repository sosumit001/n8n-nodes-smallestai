import type { IExecuteFunctions, INodeExecutionData, IDataObject, IHttpRequestOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import FormData from 'form-data';

const API_BASE = 'https://api.smallest.ai/waves/v1';

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

    const form = new FormData();
    form.append('displayName', displayName);
    form.append('file', binaryBuffer, {
        filename: binaryData.fileName || 'audio.wav',
        contentType: binaryData.mimeType || 'audio/wav',
    });

    const options: IHttpRequestOptions = {
        method: 'POST',
        url: `${API_BASE}/${model}/add_voice`,
        body: form,
        headers: form.getHeaders(),
    };

    const response = await ctx.helpers.httpRequestWithAuthentication.call(
        ctx,
        'smallestaiApi',
        options,
    );

    return { json: response, pairedItem: { item: itemIndex } };
}

/**
 * Retrieve all cloned voices for the authenticated user.
 */
export async function handleGetClonedVoices(
    ctx: IExecuteFunctions,
    itemIndex: number,
): Promise<INodeExecutionData[]> {
    const model = ctx.getNodeParameter('model', itemIndex) as string;

    const options: IHttpRequestOptions = {
        method: 'GET',
        url: `${API_BASE}/${model}/get_cloned_voices`,
        json: true,
    };

    const response = await ctx.helpers.httpRequestWithAuthentication.call(
        ctx,
        'smallestaiApi',
        options,
    );

    // Return each voice as a separate item for easier downstream processing
    const voices = (response as { voices?: IDataObject[] }).voices || [];
    if (voices.length === 0) {
        return [{ json: response as IDataObject, pairedItem: { item: itemIndex } }];
    }
    return voices.map((voice: IDataObject) => ({ json: voice, pairedItem: { item: itemIndex } }));
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

    const options: IHttpRequestOptions = {
        method: 'DELETE',
        url: `${API_BASE}/${model}`,
        body: { voiceId },
        json: true,
    };

    const response = await ctx.helpers.httpRequestWithAuthentication.call(
        ctx,
        'smallestaiApi',
        options,
    );

    return { json: response, pairedItem: { item: itemIndex } };
}
