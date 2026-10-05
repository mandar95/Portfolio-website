import React, { useEffect, useRef, useState } from 'react';

const suggestedQuestions = [
  'What technologies does Mandar use?',
  'Tell me about his experience',
  'How can I contact him?'
];

function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi, I'm MJ's portfolio assistant. Ask me about his experience, skills, or how to get in touch."
    }
  ]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const conversationEnd = useRef(null);

  useEffect(() => {
    conversationEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isOpen]);

  async function sendMessage(question) {
    const content = question.trim();
    if (!content || isSending || content.length > 500) return;

    const history = messages
      .filter((message) => message.role === 'user' || message.role === 'assistant')
      .slice(1)
      .map(({ role, content: messageContent }) => ({ role, content: messageContent }));

    if (history[history.length - 1]?.role === 'user') {
      history.pop();
    }

    const conversation = [...history.slice(-8), { role: 'user', content }];

    setMessages((currentMessages) => [...currentMessages, { role: 'user', content }]);
    setDraft('');
    setIsSending(true);

    try {
      const response = await fetch('/.netlify/functions/portfolio-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation })
      });

      if (!(response.headers.get('content-type') || '').includes('application/json')) {
        throw new Error(
          'The assistant function returned a webpage. Locally, run `npx netlify-cli dev`; on Netlify, confirm the function is deployed.'
        );
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'The assistant is unavailable right now.');
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', content: result.answer }
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: 'notice',
          content: error.message || 'The assistant is unavailable right now.'
        }
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(draft);
  }

  return (
    <div className="portfolio-assistant">
      {isOpen && (
        <section className="assistant-panel" aria-label="Ask MJ portfolio assistant">
          <header className="assistant-header">
            <div>
              <p className="assistant-eyebrow">MJ STUDIO</p>
              <h2>Ask MJ</h2>
              <p>Portfolio Q&amp;A</p>
            </div>
            <button
              className="assistant-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
            >
              Close
            </button>
          </header>

          <div className="assistant-messages" aria-live="polite" aria-relevant="additions">
            {messages.map((message, index) => (
              <p
                className={`assistant-message assistant-message-${message.role}`}
                key={`${message.role}-${index}`}
              >
                {message.content}
              </p>
            ))}
            {isSending && <p className="assistant-thinking">Thinking...</p>}
            <div ref={conversationEnd} />
          </div>

          {messages.length === 1 && (
            <div className="assistant-prompts" aria-label="Suggested questions">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendMessage(question)}
                  disabled={isSending}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <form className="assistant-form" onSubmit={handleSubmit}>
            <label className="assistant-sr-only" htmlFor="assistant-question">
              Ask a question about Mandar
            </label>
            <input
              id="assistant-question"
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={500}
              placeholder="Ask about skills or experience"
              disabled={isSending}
            />
            <button type="submit" disabled={isSending || !draft.trim()}>
              Send
            </button>
          </form>
          <a className="assistant-contact" href="mailto:mandarjaurat@gmail.com">
            Prefer email? Contact Mandar
          </a>
        </section>
      )}

      <button
        className="assistant-launcher"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
      >
        {isOpen ? 'Close assistant' : 'Ask MJ'}
      </button>
    </div>
  );
}

export default PortfolioAssistant;