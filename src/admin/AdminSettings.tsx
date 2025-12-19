import { useState, useEffect } from "react";
import client from "../api/client";
import { toast } from "sonner";
import { Bot, Users, Save, Trash2, Plus, Eye, EyeOff, Copy, Check, Lock } from "lucide-react";

export default function AdminSettings() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [botToken, setBotToken] = useState("");
  const [chatIds, setChatIds] = useState<string[]>([]);
  const [newChatId, setNewChatId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await client.get("/admin/env");
      if (res.data.TELEGRAM_BOT_TOKEN) {
        setBotToken(res.data.TELEGRAM_BOT_TOKEN);
      }
      if (res.data.TELEGRAM_CHAT_ID) {
        const ids = res.data.TELEGRAM_CHAT_ID.split(",").map((id: string) => id.trim()).filter(Boolean);
        setChatIds(ids);
      }
    } catch (error) {
      console.error("Failed to fetch settings", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleAddChatId = () => {
    if (!newChatId.trim()) return;
    const id = newChatId.trim();
    if (chatIds.includes(id)) {
      toast.error("ID already added");
      return;
    }
    setChatIds([...chatIds, id]);
    setNewChatId("");
  };

  const handleRemoveChatId = (idToRemove: string) => {
    setChatIds(chatIds.filter(id => id !== idToRemove));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const chatIdString = chatIds.join(",");
      await client.post("/admin/env", {
        TELEGRAM_BOT_TOKEN: botToken,
        TELEGRAM_CHAT_ID: chatIdString
      });
      toast.success("Settings saved successfully");
    } catch (error) {
      console.error("Failed to save settings", error);
      toast.error("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Settings</h2>
          <p className="admin-page-desc">Manage integrations and access</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Admin Access Section */}
        <section className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-icon icon-blue">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="admin-card-title">Admin Access</h2>
              <p className="admin-card-subtitle">
                Manage your admin login credentials.
              </p>
            </div>
          </div>

          <div className="admin-settings-grid" style={{ maxWidth: '600px' }}>
            <div>
              <label className="admin-label mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label mb-2">Password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showToken ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="admin-input"
                  style={{ paddingRight: '3rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="admin-action-icon-btn"
                  title={showToken ? "Hide" : "Show"}
                  style={{ position: 'absolute', right: '0.5rem' }}
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Telegram Bot Section */}
        <section className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-icon icon-blue">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="admin-card-title">Telegram Bot</h2>
              <p className="admin-card-subtitle">
                Configure bot connection for receiving inquiries.
              </p>
            </div>
          </div>

          <div className="admin-settings-grid" style={{ maxWidth: '600px' }}>
            <div>
              <label className="admin-label mb-2">Bot Token</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showToken ? "text" : "password"}
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  placeholder="123456789:ABCdefGhIjkLmnOpQrStUvWxYz"
                  className="admin-input"
                  style={{ paddingRight: '6rem', fontFamily: 'monospace' }}
                />
                <div style={{ position: 'absolute', right: '0.5rem', display: 'flex', gap: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="admin-action-icon-btn"
                    title={showToken ? "Hide" : "Show"}
                  >
                    {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {botToken && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(botToken)}
                      className="admin-action-icon-btn"
                      title="Copy"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Get token from <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@BotFather</a>
              </p>
            </div>
          </div>
        </section>

        {/* Recipients Section */}
        <section className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-icon icon-purple">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="admin-card-title">Recipients</h2>
              <p className="admin-card-subtitle">
                List of Telegram IDs to receive notifications.
              </p>
            </div>
          </div>

          <div className="admin-settings-grid" style={{ maxWidth: '600px' }}>
            <div className="admin-settings-row">
              <input
                value={newChatId}
                onChange={(e) => setNewChatId(e.target.value)}
                placeholder="Enter Telegram Chat ID"
                className="admin-input"
                style={{ fontFamily: 'monospace' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddChatId();
                  }
                }}
              />
              <button 
                onClick={handleAddChatId}
                disabled={!newChatId.trim()}
                className="admin-button"
                style={{ width: 'auto', marginTop: 0 }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Active Recipients ({chatIds.length})</div>
              
              {chatIds.length === 0 ? (
                <div className="admin-empty-state">
                   <span>No recipients added</span>
                </div>
              ) : (
                <div className="grid gap-2">
                  {chatIds.map((id) => (
                    <div 
                      key={id} 
                      className="admin-list-item"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-mono text-xs">
                          ID
                        </div>
                        <span className="font-mono text-sm text-gray-900">{id}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveChatId(id)}
                        className="admin-action-icon-btn delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="admin-tip">
               <p>
                  💡 To get your ID, message <a href="https://t.me/userinfobot" target="_blank" rel="noopener noreferrer">@userinfobot</a>. 
                  After adding ID, don't forget to press <strong>/start</strong> in your bot's chat.
               </p>
            </div>
          </div>
        </section>

        <div className="admin-save-bar">
          <button 
            onClick={handleSave} 
            disabled={saving} 
            className="admin-button"
            style={{ width: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}
          >
            {saving ? (
              <>
                <div className="spinner" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}