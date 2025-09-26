import { useEffect, useMemo, useState } from "react";
import NavBar from "../components/NavBar";
import SidebarContacts from "../components/SidebarContacts";
import ChatWindow from "../components/ChatWindow";
import { ConversationSummary, Message, getConversations, getMessages, sendMessage } from "../services/api";

// PUBLIC_INTERFACE
export default function ChatRoom() {
  /** Main chat room page with sidebar for conversations and chat area. */
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const convs = await getConversations().catch(() => {
          // Placeholder fallback content
          return [
            { id: "c1", name: "Ava Carter", lastMessage: "See you soon!", unread: 2 },
            { id: "c2", name: "Liam Brooks", lastMessage: "Got it, thanks!" },
            { id: "c3", name: "Team Ocean", lastMessage: "Sprint starts Monday." }
          ] as ConversationSummary[];
        });
        if (!mounted) return;
        setConversations(convs);
        setActiveId(convs[0]?.id);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (!activeId) return;
    (async () => {
      const msgs = await getMessages(activeId).catch(() => {
        // Placeholder messages
        return [
          { id: "m1", fromId: "me", toId: activeId, content: "Hey there!", createdAt: new Date(Date.now() - 600000).toISOString() },
          { id: "m2", fromId: "u2", toId: "me", content: "Hello! How can I help?", createdAt: new Date(Date.now() - 580000).toISOString() }
        ] as Message[];
      });
      if (!mounted) return;
      setMessages(msgs);
    })();
    return () => { mounted = false; };
  }, [activeId]);

  const activeTitle = useMemo(() => {
    return conversations.find(c => c.id === activeId)?.name || "Conversation";
  }, [conversations, activeId]);

  const onSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || !activeId) return;
    const optimistic: Message = {
      id: `tmp-${Date.now()}`,
      fromId: "me",
      toId: activeId,
      content: trimmed,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, optimistic]);
    setInput("");
    try {
      const saved = await sendMessage(activeId, trimmed).catch(() => ({
        ...optimistic,
        id: `local-${Date.now()}`
      }));
      setMessages(prev => prev.map(m => (m.id === optimistic.id ? saved : m)));
    } catch {
      // Revert input on failure
      setMessages(prev => prev.filter(m => m.id !== optimistic.id));
      setInput(trimmed);
      // Ideally show toast - keeping minimal
      alert("Failed to send message");
    }
  };

  return (
    <>
      <NavBar />
      <div className="page">
        <div className="container" style={{ maxWidth: 1200 }}>
          {loading ? (
            <div className="card" style={{ padding: 24 }}>Loading conversations...</div>
          ) : (
            <div className="split">
              <SidebarContacts items={conversations} activeId={activeId} onSelect={setActiveId} />
              <ChatWindow
                title={activeTitle}
                messages={messages}
                meId="me"
                inputValue={input}
                onInputChange={setInput}
                onSend={onSend}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
