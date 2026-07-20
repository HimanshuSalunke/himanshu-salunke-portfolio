/**
 * Build a Requesty chat/completions body.
 * gpt-5* models spend max_tokens on hidden reasoning by default; with Neura's
 * large system prompt that can leave zero visible content. Disable reasoning.
 */
export function buildRequestyChatBody({
  model,
  messages,
  temperature = 0.2,
  max_tokens,
  stream = false,
}) {
  const body = {
    model,
    messages,
    temperature,
    max_tokens,
    stream,
  }

  if (/gpt-5/i.test(model)) {
    body.reasoning_effort = 'none'
  }

  return body
}
