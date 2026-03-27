import type { IExecuteFunctions, INodeExecutionData, IDataObject, IHttpRequestOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

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

    // Build multipart/form-data body manually (no external imports allowed by n8n Cloud)
    const boundary = '----n8nFormBoundary' + Math.random().toString(36).substring(2);
    const fileName = binaryData.fileName || 'audio.wav';
    const mimeType = binaryData.mimeType || 'audio/wav';

    const parts: Buffer[] = [];

    // displayName field
    parts.push(Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="displayName"\r\n\r\n${displayName}\r\n`,
    ));

    // file field
    parts.push(Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: ${mimeType}\r\n\r\n`,
    ));
    parts.push(binaryBuffer);
    parts.push(Buffer.from(`\r\n--${boundary}--\r\n`));

    const body = Buffer.concat(parts);

    const options: IHttpRequestOptions = {
        method: 'POST',
        url: `${API_BASE}/${model}/add_voice`,
        body,
        headers: {
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
            'Content-Length': body.length.toString(),
        },
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
