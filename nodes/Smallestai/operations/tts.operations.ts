import type { IExecuteFunctions, INodeExecutionData, IDataObject, IHttpRequestOptions } from 'n8n-workflow';

export async function handleTtsSynthesize(
    ctx: IExecuteFunctions,
    itemIndex: number,
): Promise<INodeExecutionData> {
    const model = ctx.getNodeParameter('model', itemIndex) as string;
    const text = ctx.getNodeParameter('text', itemIndex) as string;
    const voiceSource = ctx.getNodeParameter('voiceSource', itemIndex) as string;
    const voiceId = voiceSource === 'custom'
        ? (ctx.getNodeParameter('customVoiceId', itemIndex) as string)
        : (ctx.getNodeParameter('voiceId', itemIndex) as string);
    const output_format = ctx.getNodeParameter('output_format', itemIndex) as string;
    const additionalOptions = ctx.getNodeParameter('additionalOptions', itemIndex, {}) as IDataObject;

    const body: IDataObject = {
        text,
        voice_id: voiceId,
        output_format,
        ...additionalOptions,
    };

    const options: IHttpRequestOptions = {
        headers:{
            "X-Source": "n8n-smallestai-node",
        },
        method: 'POST',
        url: `https://api.smallest.ai/waves/v1/${model}/get_speech`,
        body,
        json: true,
        encoding: 'arraybuffer',
        returnFullResponse: false,
    };

    const response = await ctx.helpers.httpRequestWithAuthentication.call(
        ctx,
        'smallestaiApi',
        options,
    );

    const fullAudio = response as Buffer;
    const fileName = `speech.${output_format}`;
    const binaryData = await ctx.helpers.prepareBinaryData(fullAudio, fileName);

    return {
        json: {
            success: true,
            format: output_format,
        },
        binary: {
            data: binaryData,
        },
        pairedItem: { item: itemIndex },
    };
}

/**
 * Retrieve available voices for a given model.
 */
export async function handleGetVoices(
    ctx: IExecuteFunctions,
    itemIndex: number,
): Promise<INodeExecutionData[]> {
    const model = ctx.getNodeParameter('model', itemIndex) as string;

    const options: IHttpRequestOptions = {
        method: 'GET',
        url: `https://api.smallest.ai/waves/v1/${model}/get_voices`,
        json: true,
    };

    const response = await ctx.helpers.httpRequestWithAuthentication.call(
        ctx,
        'smallestaiApi',
        options,
    );

    // Return each voice as a separate item
    const voices = (response as { voices?: IDataObject[] }).voices || [];
    if (voices.length === 0) {
        return [{ json: response as IDataObject, pairedItem: { item: itemIndex } }];
    }
    return voices.map((voice: IDataObject) => ({ json: voice, pairedItem: { item: itemIndex } }));
}
