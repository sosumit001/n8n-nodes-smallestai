import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';

export async function handleTtsSynthesize(
    ctx: IExecuteFunctions,
    itemIndex: number,
): Promise<INodeExecutionData> {
    const model = ctx.getNodeParameter('model', itemIndex) as string;
    const text = ctx.getNodeParameter('text', itemIndex) as string;
    const voiceId = ctx.getNodeParameter('voiceId', itemIndex) as string;
    const output_format = ctx.getNodeParameter('output_format', itemIndex) as string;
    const additionalOptions = ctx.getNodeParameter('additionalOptions', itemIndex, {}) as IDataObject;

    const body: IDataObject = {
        text,
        voice_id: voiceId,
        output_format,
        ...additionalOptions,
    };

    const response = await ctx.helpers.requestWithAuthentication.call(
        ctx,
        'smallestaiApi',
        {
            method: 'POST',
            url: `https://waves-api.smallest.ai/api/v1/${model}/get_speech`,
            body,
            json: true,
            encoding: null,
        },
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

    const response = await ctx.helpers.requestWithAuthentication.call(
        ctx,
        'smallestaiApi',
        {
            method: 'GET',
            url: `https://waves-api.smallest.ai/api/v1/${model}/get_voices`,
            json: true,
        },
    );

    // Return each voice as a separate item
    const voices = (response as { voices?: IDataObject[] }).voices || [];
    if (voices.length === 0) {
        return [{ json: response as IDataObject }];
    }
    return voices.map((voice: IDataObject) => ({ json: voice }));
}
