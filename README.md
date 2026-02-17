# n8n-nodes-smallestai

This is an n8n community node that lets you use [Smallest AI](https://smallest.ai) in your n8n workflows.

Smallest AI provides state-of-the-art voice AI APIs — including text-to-speech, speech-to-text, and voice cloning — enabling you to build powerful voice-driven automations.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Speech (TTS)

- **Synthesize Speech** — Convert text to speech using Lightning V3.1 (default voices) or Lightning Large (cloned voices). Supports PCM, MP3, WAV, and Mulaw output formats with configurable sample rate, speed, and language.
- **Get Voices** — Retrieve available voice models for Lightning V2 or Lightning V3.1.

### Transcription (STT)

- **Transcribe Audio** — Transcribe audio to text with support for 20+ languages. Optional age, gender, and emotion detection.

### Voice Clone

- **Add Voice** — Clone a voice from an uploaded audio file.
- **Get Cloned Voices** — Retrieve all your cloned voices.
- **Delete Cloned Voice** — Delete a cloned voice by its ID.

## Credentials

To use this node, you need a Smallest AI API key:

1. Sign up at [console.smallest.ai](https://console.smallest.ai)
2. Navigate to [API Keys](https://console.smallest.ai/apikeys)
3. Create a new API key
4. In n8n, create a new **Smallest.ai API** credential and paste your API key

## Compatibility

- Tested with n8n v1.x and v2.x
- Requires Node.js v22 or higher

## Resources

- [Smallest AI Documentation](https://docs.smallest.ai)
- [Smallest AI API Reference](https://waves-api.smallest.ai)
- [Smallest AI Console](https://console.smallest.ai)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)
