import { ConversationSummary } from "../services/api";

type Props = {
  items: ConversationSummary[];
  activeId?: string;
  onSelect: (id: string) => void;
  title?: string;
};

// PUBLIC_INTERFACE
export default function SidebarContacts({ items, activeId, onSelect, title = "Conversations" }: Props) {
  /** Sidebar listing conversations or contacts with selectable items. */
  return (
    <aside className="sidebar" aria-label="Contacts sidebar">
      <div className="sidebar-header">
        <div className="avatar">💬</div>
        <div style={{ fontWeight: 700 }}>{title}</div>
      </div>
      <div className="sidebar-list" role="list">
        {items.map((c) => (
          <div
            key={c.id}
            role="listitem"
            className={`sidebar-item ${activeId === c.id ? "active" : ""}`}
            onClick={() => onSelect(c.id)}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onSelect(c.id); }}
            aria-current={activeId === c.id ? "true" : "false"}
          >
            <div className="avatar">{(c.name || "C").charAt(0)}</div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontWeight: 600, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{c.name}</div>
              <div style={{ fontSize: 12, color: "#6b7280", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                {c.lastMessage || "Start a conversation"}
              </div>
            </div>
            {c.unread ? (
              <div style={{ marginLeft: "auto", background: "rgba(37,99,235,0.15)", color: "#1f2937", borderRadius: 999, padding: "2px 8px", fontSize: 12 }}>
                {c.unread}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
}
