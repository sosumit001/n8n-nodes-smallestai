import type { IExecuteFunctions, INodeExecutionData, IDataObject, IHttpRequestOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export async function handleSttTranscribe(
    ctx: IExecuteFunctions,
    itemIndex: number,
    items: INodeExecutionData[],
): Promise<INodeExecutionData> {
    const binaryPropertyName = ctx.getNodeParameter('binaryPropertyName', itemIndex) as string;
    const additionalOptions = ctx.getNodeParameter('additionalOptions', itemIndex, {}) as IDataObject;

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

    const binaryBuffer = await ctx.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName);

    const options: IHttpRequestOptions = {
        headers:{
            'Content-Type': 'application/octet-stream',
            "X-Source": "n8n-smallestai-node",
        },
        method: 'POST',
        url: 'https://waves-api.smallest.ai/api/v1/pulse/get_text',
        qs: {
            language: additionalOptions.language || 'en',
            age_detection: additionalOptions.age_detection ?? false,
            gender_detection: additionalOptions.gender_detection ?? false,
            emotion_detection: additionalOptions.emotion_detection ?? false,
        },
        body: binaryBuffer,
        json: true,
    };

    const response = await ctx.helpers.httpRequestWithAuthentication.call(
        ctx,
        'smallestaiApi',
        options,
    );

    return {
        json: response,
        pairedItem: { item: itemIndex },
    };
}
