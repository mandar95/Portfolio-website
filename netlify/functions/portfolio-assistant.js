const MAX_MESSAGE_LENGTH = 500;
const MAX_MESSAGES = 10;

const portfolioFacts = `
Name: Mandar Jaurat.
Location: Mumbai, India.
Role: Software engineer at Hexaware Technology.
Experience: 7+ years building web and mobile applications (experience began in 2019).
Education: BSc IT, Mumbai University, 2017.
Technologies: Python, JavaScript, TypeScript, React, React Native, Node.js.
Interests: Web surfing, dancing, and reading.
Contact: mandarjaurat@gmail.com.
LinkedIn: https://www.linkedin.com/in/mandar-jaurat-b2903014b
GitHub: https://github.com/mandar95
Instagram: https://www.instagram.com/mandarjaurat/
`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Use POST to ask a question.' });
  }

  if ((event.body || '').length > 8000) {
    return jsonResponse(413, { error: 'The conversation is too long.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return jsonResponse(503, {
      error: 'The AI assistant is not configured yet. Please email Mandar directly.'
    });
  }

  let request;
  try {
    request = JSON.parse(event.body || '{}');
  } catch {
    return jsonResponse(400, { error: 'The request must contain valid JSON.' });
  }

  if (!Array.isArray(request.messages) || request.messages.length === 0 || request.messages.length > MAX_MESSAGES) {
    return jsonResponse(400, { error: 'Send between 1 and 10 messages.' });
  }

  const contents = [];
  for (const message of request.messages) {
    if (
      !message ||
      !['user', 'assistant'].includes(message.role) ||
      typeof message.content !== 'string' ||
      message.content.length === 0 ||
      message.content.length > MAX_MESSAGE_LENGTH
    ) {
      return jsonResponse(400, { error: 'Each message must be up to 500 characters.' });
    }

    contents.push({ role: message.role, content: message.content });

    if (contents.length > 1 && contents[contents.length - 2].role === contents[contents.length - 1].role) {
      return jsonResponse(400, { error: 'Conversation messages must alternate between question and answer.' });
    }
  }

  if (contents[0].role !== 'user' || contents[contents.length - 1].role !== 'user') {
    return jsonResponse(400, { error: 'Conversation messages must start and end with a question.' });
  }

  try {
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: `You are the portfolio assistant for Mandar Jaurat. Answer clearly and briefly using only these verified profile facts:\n${portfolioFacts}\nIf asked about information not present here, say you do not know and suggest emailing Mandar. Do not invent projects, responsibilities, achievements, dates, or personal details. If asked something unrelated to this portfolio, politely steer the conversation back to Mandar's experience, skills, or contact details.`
            },
            ...contents
          ],
          temperature: 0.3,
          max_tokens: 300
        })
      }
    );
    const result = await response.json();

    if (!response.ok) {
      console.error('OpenAI request failed:', response.status, result.error?.message);
      return jsonResponse(502, { error: 'The assistant could not answer just now. Please try again.' });
    }

    const answer = result.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return jsonResponse(502, { error: 'The assistant returned an empty answer. Please try again.' });
    }

    return jsonResponse(200, { answer });
  } catch (error) {
    console.error('Portfolio assistant request failed:', error);
    return jsonResponse(502, { error: 'The assistant could not be reached. Please try again.' });
  }
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
}