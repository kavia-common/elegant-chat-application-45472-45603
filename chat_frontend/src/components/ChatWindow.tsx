import { useEffect, useRef } from "react";
import { Message } from "../services/api";

type HeaderProps = { title: string };
function ChatHeader({ title }: HeaderProps) {
  return (
    <div className="chat-header">
      <div className="avatar">{title.charAt(0)}</div>
      <div>
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>Online</div>
      </div>
    </div>
  );
}

type BodyProps = { messages: Message[]; meId?: string };
function ChatBody({ messages, meId }: BodyProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [messages]);
  return (
    <div className="chat-body" ref={ref} aria-live="polite">
      {messages.map((m) => {
        const mine = m.fromId === meId;
        return (
          <div key={m.id} className={`message ${mine ? "me" : "other"}`} aria-label={mine ? "My message" : "Message"}>
            <div>{m.content}</div>
            <div className="message-meta">{new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          </div>
        );
      })}
    </div>
  );
}

type InputProps = { value: string; onChange: (v: string) => void; onSend: () => void; disabled?: boolean };
function ChatInput({ value, onChange, onSend, disabled }: InputProps) {
  return (
    <div className="chat-input">
      <input
        className="input"
        placeholder="Type a message..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        disabled={disabled}
        aria-label="Message input"
      />
      <button className="btn" onClick={onSend} disabled={disabled} aria-label="Send message">Send</button>
    </div>
  );
}

type Props = {
  title: string;
  messages: Message[];
  meId?: string;
  inputValue: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
};

// PUBLIC_INTERFACE
export default function ChatWindow(props: Props) {
  /** Composed chat window with header, body, and input. */
  const { title, messages, meId, inputValue, onInputChange, onSend } = props;
  return (
    <section className="chat">
      <ChatHeader title={title} />
      <ChatBody messages={messages} meId={meId} />
      <ChatInput value={inputValue} onChange={onInputChange} onSend={onSend} />
    </section>
  );
}
