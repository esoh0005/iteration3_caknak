import React, { useState, useEffect } from 'react';

// types for messages  
type Message = {
  sender: string;
  text: string;
  isReality?: boolean;
  isGood?: boolean;
};

// type for the API's chat format  
type ApiMessage = {
  role: string;
  content: string;
};

// type for the response from the LLM API
// ensures safe access to data.choices and data.error
type ChatCompletionResponse = {
  error?: { message: string };
  choices?: Array<{ message?: { content?: string } }>;
};

// figured out a cool way to check if reality check is positive or negative
// basically just look for specific phrases that indicate good/bad responses
const isPositiveRealityCheck = (text: string): boolean => {
  const negativeIndicators = [
    /shared (his|her|their|your)/i, // if they shared something, that's bad
    /gave (his|her|their|your)/i,   // same for giving personal info
    /provided (his|her|their|your)/i, // or providing details
    /revealed/i,                     // revealed is always bad in this context
    /disclosed/i,                    // same with disclosed
    /this is not how/i,              // this phrase shows up in negative feedback
    /shouldn['’]t have/i             // another negative indicator
  ];
  for (const regex of negativeIndicators) {
    if (regex.test(text)) {
      return false;
    }
  }
  const positiveIndicators = [
    /didn['’]t share/i,      // main positive indicator
    /you were cautious/i,
    /that['’]s good/i,
    /that['’]s great/i,
    /well done/i,
    /good job/i
  ];
  for (const regex of positiveIndicators) {
    if (regex.test(text)) {
      return true;
    }
  }
  return false;
};

// main component for the simulator
const PhishingSimulator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [apiMessages, setApiMessages] = useState<ApiMessage[]>([]);

  // helper function to call the llm api 
  const simulateScam = async (messagesArray: ApiMessage[]): Promise<string> => {
    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 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',
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-4-scout-17b-16e-instruct',
            messages: messagesArray,
          }),
        }
      );

      const data = (await response.json()) as ChatCompletionResponse;
      if (data.error) return 'Sorry, there was an error with the simulation.';
      return data.choices?.[0]?.message?.content ?? '';
    } catch {
      return 'Sorry, there was an error with the simulation.';
    }
  };

  // kick things off when component loads
  useEffect(() => {
    // explicitly ignore the promise
    void startSimulation();
  }, []);

  // function to start/restart the whole simulation
  const startSimulation = async (): Promise<void> => {
    setIsLoading(true);
    setMessages([]);
    setExchangeCount(0);

    const initialApiMessages: ApiMessage[] = [
      {
        role: 'system',
        content: `
You are roleplaying as a staff member from a Malaysian educational grant or sponsorship organization offering a fake grant in a phishing scenario.

Tone rules:
- Short, WhatsApp style lines but no abbreviations, contractions or texting shorthand.
- Write “please” not “pls”
- Write “you” not “u”
- Write “thanks” not “thx”

- Avoid large paragraphs, the shorter the better.
- No formal sign‑offs like "Kind regards" or "Sincerely."  
- Keep it friendly but professional enough for a quick text conversation.
- Make them feel speacial and the 'chosen' one
- Please do not use any shortforms, make it believable
- Make them feel special
      
Chat outline:
1) For the user's first 3 replies, respond with your short scam pitch, offering the fake grant and politely asking for details. 
2) When the user replies for the 4th time, do NOT answer with more scam text. Instead, produce a single final message that starts with "REALITY CHECK," evaluating how the user responded (e.g., cautious, shared info, etc.). 
   - If they shared personal details, remind them to be careful. 
   - Include a quick statement like: "In real life, no one just offers you money or grants out of the blue. Always double-check before sharing info"
   -Use your own words to evaluate how well the teen repsonded overall
   - Stay short, teen-friendly but professional, and end after that. 
   - No extra disclaimers or scam content.

No bold, italics, or extra formatting. Just plain text messages.
        `
      },
      {
        role: 'user',
        content: `
Start the conversation pretending you’re from a Malaysian grant body (JPA, Yayasan Peneraju etc) and introduce your name. Make it text-message style (short lines, quick chat but try to avoid one wordedness). Make them sound special and always speak in English
After I've replied 4 times, end with one final "REALITY CHECK" message and stop.
No long paragraphs, no "Kind regards."`
      },
    ];

    setApiMessages(initialApiMessages);

    try {
      const res = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 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',
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-4-scout-17b-16e-instruct',
            messages: initialApiMessages,
          }),
        }
      );

      const data = (await res.json()) as ChatCompletionResponse;
      const initialResponse = data.choices?.[0]?.message?.content ?? '';
      setApiMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: initialResponse },
      ]);
      if (initialResponse.trim()) setMessages([{ sender: '', text: initialResponse }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setMessages([{ sender: 'System', text: 'Error starting simulation: ' + msg }]);
    } finally {
      setIsLoading(false);
    }
  };

  // handle when user sends a message - core interaction function
  const handleSendMessage = async (): Promise<void> => {
    if (!userInput.trim()) return;

    setMessages(prevMessages => [...prevMessages, { sender: 'You', text: userInput }]);
    const newApiMessages = [...apiMessages, { role: 'user', content: userInput }];
    setApiMessages(newApiMessages);
    setIsLoading(true);
    setUserInput('');

    const newExchangeCount = exchangeCount + 1;
    setExchangeCount(newExchangeCount);

    try {
      const response = await simulateScam(newApiMessages);

      if (response.startsWith('Sorry, there was an error') || !response.trim()) {
        setMessages(prev => [...prev, { sender: 'System', text: response }]);
        setIsLoading(false);
        return;
      }

      setApiMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: response },
      ]);

      if (newExchangeCount === 4) {
        const isRealityCheck = response.includes('REALITY CHECK');
        if (isRealityCheck) {
          const isGoodResponse = isPositiveRealityCheck(response);
          setMessages(prev => [
            ...prev,
            { sender: '', text: response, isReality: true, isGood: isGoodResponse },
          ]);
        } else {
          setMessages(prev => [...prev, { sender: '', text: response }]);
        }
        return;
      }

      setMessages(prev => [...prev, { sender: '', text: response }]);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      setMessages(prev => [{ sender: 'System', text: 'Error sending message: ' + msg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      {/* chat area with scrolling */}
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          height: '400px',
          padding: '15px',
          overflowY: 'auto',
          backgroundColor: '#f5f5f5',
          marginBottom: '15px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages
          .filter(msg => msg.text.trim())
          .map((msg, index) => {
            let bubbleColor = 'white';
            if (msg.text.includes('REALITY CHECK')) {
              const isGood = isPositiveRealityCheck(msg.text);
              bubbleColor = isGood ? '#d4edda' : '#f8d7da';
            } else if (msg.sender === 'You') {
              bubbleColor = '#dcf8c6';
            } else if (msg.sender === 'System') {
              bubbleColor = '#ffcccb';
            }
            return (
              <div
                key={index}
                style={{
                  maxWidth: '80%',
                  padding: '10px 15px',
                  borderRadius: '18px',
                  marginBottom: '10px',
                  backgroundColor: bubbleColor,
                  alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                {msg.sender === 'System' && <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{msg.sender}</div>}
                <div>{msg.text}</div>
              </div>
            );
          })}
        {isLoading && (
          <div style={{ textAlign: 'center', margin: '15px 0', alignSelf: 'flex-start' }}>
            <div style={{ padding: '10px 15px', borderRadius: '18px', backgroundColor: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* user input area */}
      <div className="flex items-center gap-3 mt-6 max-w-md mx-auto">
        <input
          type="text"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your response…"
          className="flex-1 px-4 py-2 border border-[#5b4636] bg-[rgba(254,252,232,0.8)] rounded-full placeholder-[#5b4636] focus:outline-none focus:ring-2 focus:ring-yellow-700 transition"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !userInput.trim()}
          className="px-6 py-2 bg-[#5b4636] text-[#fefce8] font-semibold rounded-full shadow hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Send
        </button>
      </div>

      {/* restart button */}
      <div className="text-center mt-4">
        <button
          onClick={startSimulation}
          className="text-sm font-bold text-[#5b4636] underline hover:text-yellow-700 transition"
        >
          Restart Simulation
        </button>
      </div>
    </div>
  );
};

export default PhishingSimulator;