import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  FileText,
  CheckCircle,
  AlertTriangle,
  Printer,
  Copy,
  Check,
  Plus,
  Pin,
  PinOff,
  Trash2
} from 'lucide-react';
import { Header, NavMailIcon } from './components/Header';
import { Footer } from './components/Footer';
import { FormattedAiResponse } from './components/FormattedAiResponse';

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  refNumber?: string;
  timestamp?: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  messages: ChatMessageItem[];
  refNumber: string;
  date: string;
  isPinned?: boolean;
}

export function cleanAiResponse(text: string): string {
  if (!text || typeof text !== 'string') return '';

  let cleaned = text;

  // Remove <think>...</think> blocks and tags (including multiline and partial/unclosed)
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, '');
  cleaned = cleaned.replace(/<think>[\s\S]*$/gi, '');
  cleaned = cleaned.replace(/<thought>[\s\S]*?<\/thought>/gi, '');
  cleaned = cleaned.replace(/\[thinking\][\s\S]*?\[\/thinking\]/gi, '');
  cleaned = cleaned.replace(/\[thought\][\s\S]*?\[\/thought\]/gi, '');

  // Remove internal metadata phrases
  cleaned = cleaned.replace(/Click for more details\.\.\./gi, '');
  cleaned = cleaned.replace(/\(Detailed bureaucratic response in English\/Hindi\)/gi, '');
  cleaned = cleaned.replace(
    /\(Detailed bureaucratic response in English\/Hindi follows official NIC guidelines and authentication protocols\.\)/gi,
    ''
  );

  // Normalize excessive blank lines and whitespace
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();

  return cleaned;
}

const DEFAULT_CONVERSATIONS: HistoryItem[] = [];

function normalizeHistory(rawList: any[]): HistoryItem[] {
  if (!Array.isArray(rawList)) return [];
  return rawList
    .filter(
      (item) =>
        item &&
        item.id !== 'aadhaar' &&
        item.id !== 'pan' &&
        item.id !== 'gst' &&
        item.id !== 'ration'
    )
    .map((item) => {
      let messages: ChatMessageItem[] = [];
      if (Array.isArray(item.messages) && item.messages.length > 0) {
        messages = item.messages.map((m: any) => ({
          ...m,
          content: cleanAiResponse(m.content)
        }));
      } else if (item.userQuery || item.botResponse) {
        if (item.userQuery) {
          messages.push({
            id: `${item.id}_u`,
            role: 'user',
            content: cleanAiResponse(item.userQuery)
          });
        }
        if (item.botResponse) {
          messages.push({
            id: `${item.id}_a`,
            role: 'assistant',
            content: cleanAiResponse(item.botResponse),
            refNumber: item.refNumber
          });
        }
      }
      return {
        id: item.id || `chat_${Date.now()}`,
        title: item.title || 'संवाद (Conversation)',
        messages,
        refNumber: item.refNumber || 'SAIS/CENTRAL',
        date: item.date || 'Today',
        isPinned: Boolean(item.isPinned)
      };
    });
}

export default function App() {
  // Load persisted history list
  const [historyList, setHistoryList] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('sarkarigpt_history_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return normalizeHistory(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to read history from localStorage', e);
    }
    return DEFAULT_CONVERSATIONS;
  });

  // Restore persisted active chat ID
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(() => {
    try {
      const activeId = localStorage.getItem('sarkarigpt_active_chat_id');
      if (
        activeId &&
        activeId !== 'aadhaar' &&
        activeId !== 'pan' &&
        activeId !== 'gst' &&
        activeId !== 'ration'
      ) {
        return activeId;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Derive active conversation from selectedHistoryId
  const activeChat = historyList.find((item) => item.id === selectedHistoryId) || null;

  // Sync history list to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sarkarigpt_history_list', JSON.stringify(historyList));
    } catch (e) {
      console.warn('Failed to save history to localStorage', e);
    }
  }, [historyList]);

  // Sync active chat ID to localStorage
  useEffect(() => {
    try {
      if (selectedHistoryId) {
        localStorage.setItem('sarkarigpt_active_chat_id', selectedHistoryId);
      } else {
        localStorage.removeItem('sarkarigpt_active_chat_id');
      }
    } catch (e) {
      console.warn('Failed to save active chat ID to localStorage', e);
    }
  }, [selectedHistoryId]);

  // Modals & Language State
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [languageHindi, setLanguageHindi] = useState<boolean>(false);

  // Mobile sidebar accordion state
  const [mobileHistoryOpen, setMobileHistoryOpen] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [activeChat?.messages, isProcessing]);

  // Switch conversation when clicking history item
  const handleSelectHistory = (item: HistoryItem) => {
    setSelectedHistoryId(item.id);
    setMobileHistoryOpen(false);
  };

  // Explicit New Chat action - resets active chat and prepares for a new query
  const handleNewChat = () => {
    setSelectedHistoryId(null);
    setCurrentQuery('');
    setMobileHistoryOpen(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Sorted history list with pinned items anchored at the top
  const sortedHistoryList = [...historyList].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  // Toggle Pin/Unpin for a conversation
  const handleTogglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistoryList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPinned: !item.isPinned } : item
      )
    );
  };

  // Delete confirmation modal state
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<HistoryItem | null>(null);

  // Open delete confirmation modal
  const handlePromptDelete = (item: HistoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmTarget(item);
  };

  // Confirm delete execution
  const handleConfirmDelete = () => {
    if (!deleteConfirmTarget) return;
    const targetId = deleteConfirmTarget.id;
    setHistoryList((prev) => {
      const updated = prev.filter((item) => item.id !== targetId);
      if (selectedHistoryId === targetId) {
        if (updated.length > 0) {
          setSelectedHistoryId(updated[0].id);
        } else {
          setSelectedHistoryId(null);
        }
      }
      return updated;
    });
    setDeleteConfirmTarget(null);
  };

  const handleFormSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQuery.trim() || isProcessing) return;

    const userText = currentQuery.trim();
    setCurrentQuery('');
    setIsProcessing(true);

    const fallbackRefNum = `SAIS/${new Date().getFullYear()}/${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${Math.floor(1000 + Math.random() * 9000)}`;

    const dateStr = `${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}`;

    const userMsg: ChatMessageItem = {
      id: `msg_u_${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString()
    };

    let targetChatId = selectedHistoryId;

    // If currently inside an existing conversation, append to it; otherwise create a brand new conversation
    if (targetChatId && historyList.some((item) => item.id === targetChatId)) {
      setHistoryList((prev) =>
        prev.map((item) =>
          item.id === targetChatId
            ? {
                ...item,
                messages: [...item.messages, userMsg]
              }
            : item
        )
      );
    } else {
      targetChatId = `chat_${Date.now()}`;
      const newConversation: HistoryItem = {
        id: targetChatId,
        title: `${userText.slice(0, 18)}... - ${dateStr}`,
        messages: [userMsg],
        refNumber: fallbackRefNum,
        date: dateStr
      };
      setSelectedHistoryId(targetChatId);
      setHistoryList((prev) => [newConversation, ...prev]);
    }

    // Build context history for API
    const existingMessages =
      historyList.find((item) => item.id === targetChatId)?.messages || [];
    const historyPayload = [...existingMessages, userMsg].slice(-8).map((m) => ({
      role: m.role,
      content: m.content
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userText,
          history: historyPayload.slice(0, -1)
        })
      });

      const data = await response.json();

      let botAnswer = '';
      let refNum = fallbackRefNum;

      if (data.success && data.reply) {
        botAnswer = data.reply;
        if (data.refNumber) refNum = data.refNumber;
      } else {
        botAnswer =
          data.error ||
          'सेवा वर्तमान में व्यस्त है या सर्वर से उत्तर प्राप्त नहीं हो सका। कृपया पुनः प्रयास करें। (Service is temporarily busy. Please try again.)';
      }

      const botMsg: ChatMessageItem = {
        id: `msg_a_${Date.now()}`,
        role: 'assistant',
        content: botAnswer,
        refNumber: refNum,
        timestamp: new Date().toLocaleTimeString()
      };

      setHistoryList((prev) =>
        prev.map((item) =>
          item.id === targetChatId
            ? {
                ...item,
                messages: [...item.messages, botMsg],
                refNumber: refNum
              }
            : item
        )
      );
    } catch (err) {
      console.error('Chat submit error:', err);
      const errorMsg: ChatMessageItem = {
        id: `msg_err_${Date.now()}`,
        role: 'assistant',
        content:
          'सर्वर से संपर्क स्थापित करने में असमर्थ। कृपया अपना नेटवर्क कनेक्शन जांचें। (Unable to connect to service. Please check your internet connection.)',
        refNumber: fallbackRefNum,
        timestamp: new Date().toLocaleTimeString()
      };

      setHistoryList((prev) =>
        prev.map((item) =>
          item.id === targetChatId
            ? {
                ...item,
                messages: [...item.messages, errorMsg]
              }
            : item
        )
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit();
    }
  };

  const copyToClipboard = () => {
    if (!activeChat || activeChat.messages.length === 0) return;
    const text = activeChat.messages
      .map((m) => `${m.role === 'user' ? 'User' : 'SarkariGPT'}: ${m.content}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#111111] flex flex-col font-['Noto_Sans_Devanagari',Arial,Helvetica,sans-serif] select-text">
      {/* 1, 2 & 3. TOP GOVERNMENT HEADER, NAVIGATION & BANNER */}
      <Header
        onHomeClick={() => setSelectedHistoryId(null)}
        onNewChat={handleNewChat}
        onOpenModal={(modal) => setActiveModal(modal)}
        onSelectQuerySuggestion={(query) => {
          setCurrentQuery(query);
          if (textareaRef.current) textareaRef.current.focus();
        }}
        languageHindi={languageHindi}
        onToggleLanguage={() => setLanguageHindi(!languageHindi)}
      />

      {/* 4. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col md:flex-row p-2.5 sm:p-4 bg-gray-50 gap-3 md:gap-4 max-w-[1024px] xl:max-w-[1200px] mx-auto w-full">
        {/* ASIDE SIDEBAR (DESKTOP: Fixed sidebar, MOBILE: Collapsible accordion) */}
        <aside className="w-full md:w-[240px] flex flex-col flex-shrink-0">
          <div className="border border-gray-300 rounded overflow-hidden flex flex-col bg-white shadow-xs">
            {/* Header / Mobile Toggle Bar */}
            <div
              onClick={() => setMobileHistoryOpen(!mobileHistoryOpen)}
              className="bg-[#168A16] text-white text-center py-2 px-3 text-xs font-bold tracking-widest flex items-center justify-between md:justify-center cursor-pointer md:cursor-default select-none"
            >
              <span>SAMVAAD ITIHAAS (संवाद इतिहास)</span>
              <span className="md:hidden text-xs bg-black/20 px-2 py-0.5 rounded font-mono">
                {mobileHistoryOpen ? '▲ Hide' : '▼ View History'}
              </span>
            </div>

            {/* Explicit New Chat Action in Sidebar */}
            <div className="p-2 border-b border-gray-300 bg-white">
              <button
                type="button"
                onClick={handleNewChat}
                className="w-full flex items-center justify-center gap-1.5 bg-[#174A86] hover:bg-[#123F78] text-white py-1.5 px-3 rounded text-xs font-bold shadow-xs cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ New Chat (नया संवाद)</span>
              </button>
            </div>

            {/* Conversation History List */}
            <div
              className={`bg-[#E8F5E8] overflow-y-auto custom-scrollbar text-[11px] ${
                mobileHistoryOpen ? 'block max-h-48' : 'hidden md:block md:max-h-[480px] lg:max-h-[540px] md:flex-1'
              }`}
            >
              {sortedHistoryList.length === 0 ? (
                <div className="p-3 text-center text-gray-500 italic text-[11px]">
                  कोई पूर्व संवाद नहीं (No history)
                </div>
              ) : (
                sortedHistoryList.map((item) => {
                  const isSelected = selectedHistoryId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectHistory(item)}
                      className={`group border-b border-gray-300 p-2 sm:p-2.5 cursor-pointer transition-colors flex items-center justify-between gap-1.5 ${
                        isSelected
                          ? 'font-bold text-gray-800 bg-[#d5ecd5]'
                          : item.isPinned
                          ? 'bg-[#e2f0e2] text-gray-800 font-semibold'
                          : 'text-gray-600 hover:bg-green-100'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        {item.isPinned && (
                          <Pin className="w-3.5 h-3.5 text-amber-700 fill-amber-500 flex-shrink-0 rotate-45" />
                        )}
                        <span className="truncate block" title={item.title}>
                          {item.title}
                        </span>
                      </div>

                      {/* Quick Action Icons: Pin & Delete */}
                      <div className="flex items-center gap-0.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleTogglePin(item.id, e)}
                          title={item.isPinned ? 'Unpin (अनपिन करें)' : 'Pin to top (पिन करें)'}
                          className={`p-1 rounded hover:bg-black/10 transition-colors cursor-pointer ${
                            item.isPinned ? 'text-amber-700' : 'text-gray-500 hover:text-gray-800'
                          }`}
                          aria-label={item.isPinned ? 'Unpin conversation' : 'Pin conversation'}
                        >
                          {item.isPinned ? (
                            <PinOff className="w-3.5 h-3.5" />
                          ) : (
                            <Pin className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handlePromptDelete(item, e)}
                          title="Delete conversation (संवाद हटाएं)"
                          className="p-1 text-gray-500 hover:text-red-700 hover:bg-red-100 rounded transition-colors cursor-pointer"
                          aria-label="Delete conversation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </aside>

        {/* SECTION: MAIN AI PANEL */}
        <section className="flex-1 flex flex-col min-w-0 w-full">
          <div className="flex-1 bg-[#EAF3FA] border border-[#285B84] p-3 sm:p-4 flex flex-col rounded-md shadow-sm relative w-full">
            {/* Inner Chat Box */}
            <div
              ref={chatContainerRef}
              className="flex-1 bg-[#FCFCF8] border border-[#285B84] p-3.5 sm:p-5 rounded-sm relative z-10 overflow-y-auto overflow-x-hidden min-h-[240px] max-h-[58vh] md:max-h-[480px] lg:max-h-[540px] shadow-2xs custom-scrollbar scroll-smooth"
            >
              {/* Ashoka Stambh Subtle Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08] select-none z-0 overflow-hidden">
                <img
                  src="/assets/images/ashoka-stambh.png"
                  alt=""
                  aria-hidden="true"
                  className="h-[160px] sm:h-[200px] md:h-[230px] w-auto object-contain grayscale"
                />
              </div>

              {/* Chat Content Wrapper */}
              <div className="relative z-10">
                {activeChat && activeChat.messages.length > 0 ? (
                  <>
                    {/* Multi-turn Chat Stream */}
                    <div className="space-y-4">
                      {activeChat.messages.map((msg, idx) => (
                        <div
                          key={msg.id || idx}
                          className="pb-2 last:pb-0"
                        >
                          {msg.role === 'user' ? (
                            <div className="mb-2">
                              <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-gray-800">
                                <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] font-bold">
                                  না
                                </span>
                                <span>User (श्री अजय कुमार):</span>
                              </div>
                              <div className="text-xs sm:text-sm text-gray-900 break-words bg-white/90 p-3 rounded-md border border-slate-200/90 shadow-2xs font-['Noto_Sans_Devanagari',Arial,sans-serif]">
                                {msg.content}
                              </div>
                            </div>
                          ) : (
                            <div className="mt-2">
                              <FormattedAiResponse
                                content={cleanAiResponse(msg.content)}
                                refNumber={msg.refNumber || activeChat.refNumber}
                                timestamp={msg.timestamp}
                              />
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Loading State during active generation */}
                      {isProcessing && (
                        <div className="mt-2">
                          <div className="bg-white rounded-md border border-blue-200 shadow-xs p-3.5 flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border-2 border-[#174A86] border-t-transparent animate-spin flex-shrink-0" />
                            <div className="flex flex-col">
                              <span className="text-[#174A86] font-bold text-xs sm:text-sm font-['Noto_Sans_Devanagari',Arial,sans-serif]">
                                सत्यापन प्रगति पर है... Retrieving records from Central Database
                              </span>
                              <span className="text-[11px] text-gray-500">
                                Processing national portal queries and circulars...
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Reference & Actions Bar */}
                    <div className="mt-4 pt-2 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-gray-600">Reference:</span>
                        <span className="font-mono bg-blue-50 text-blue-900 px-1 py-0.5 rounded border border-blue-200 font-bold text-[10px] sm:text-[11px]">
                          {activeChat.refNumber || 'SAIS/CENTRAL/SEC'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={copyToClipboard}
                          className="flex items-center gap-1 hover:text-blue-900 transition-colors cursor-pointer py-1 px-1.5 rounded hover:bg-gray-100"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-700" />
                              <span className="text-green-700 font-semibold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>प्रतिलिपि (Copy)</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="flex items-center gap-1 hover:text-blue-900 transition-colors cursor-pointer py-1 px-1.5 rounded hover:bg-gray-100"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>प्रिंट (Print)</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Default Unselected / Welcoming Portal State */
                  <div className="py-6 sm:py-10 px-2 flex flex-col items-center justify-center text-center">
                    <h3 className="text-base sm:text-lg font-bold text-[#174A86] font-['Noto_Sans_Devanagari',Arial,sans-serif] mb-1.5">
                      नमस्ते श्री/श्रीमती नागरिक (Welcome Citizen)
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 max-w-lg leading-relaxed mb-4">
                      भारतीय एआई सेवा (SarkariGPT) में आपका स्वागत है। सरकारी सेवाओं, योजनाओं एवं पूछताछ संबंधी जानकारी प्राप्त करने के लिए कृपया अपनी जिज्ञासा नीचे दर्ज करें या बाईं ओर दिए गए <strong>संवाद इतिहास (SAMVAAD ITIHAAS)</strong> से चयन करें।
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentQuery('Check UIDAI Aadhaar status');
                          if (textareaRef.current) textareaRef.current.focus();
                        }}
                        className="bg-white border border-[#285B84]/40 hover:bg-blue-50 text-[#174A86] font-medium px-3 py-1.5 rounded-full cursor-pointer transition-colors shadow-2xs text-[11px] sm:text-xs"
                      >
                        📌 Aadhaar Status
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentQuery('Verify PAN card linking with Aadhaar');
                          if (textareaRef.current) textareaRef.current.focus();
                        }}
                        className="bg-white border border-[#285B84]/40 hover:bg-blue-50 text-[#174A86] font-medium px-3 py-1.5 rounded-full cursor-pointer transition-colors shadow-2xs text-[11px] sm:text-xs"
                      >
                        📌 PAN Link Status
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentQuery('Explain GST return filing due dates');
                          if (textareaRef.current) textareaRef.current.focus();
                        }}
                        className="bg-white border border-[#285B84]/40 hover:bg-blue-50 text-[#174A86] font-medium px-3 py-1.5 rounded-full cursor-pointer transition-colors shadow-2xs text-[11px] sm:text-xs"
                      >
                        📌 GST Filing Guide
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Query Form Area */}
            <form onSubmit={handleFormSubmit} className="mt-3 sm:mt-4 flex flex-col gap-1.5 sm:gap-2 relative z-10">
              <label className="text-xs font-bold text-gray-700 font-['Noto_Sans_Devanagari',Arial,sans-serif]">
                अपनी जिज्ञासा दर्ज करें (Enter Your Query):
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 sm:items-end">
                <textarea
                  ref={textareaRef}
                  value={currentQuery}
                  onChange={(e) => setCurrentQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="अपनी पूछताछ यहाँ लिखें..."
                  className="flex-1 h-[54px] sm:h-[60px] border border-gray-400 rounded-sm p-2 text-sm focus:outline-none focus:border-blue-800 resize-none bg-white w-full"
                />
                <div className="flex items-center gap-3 justify-end sm:justify-start flex-shrink-0">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="bg-[#2E8B35] text-white px-5 py-1.5 rounded font-bold text-sm shadow hover:bg-green-700 cursor-pointer disabled:opacity-60 text-center flex flex-col items-center justify-center min-w-[85px] h-[48px] sm:h-[52px]"
                  >
                    <span className="leading-tight font-bold">भेजें</span>
                    <span className="text-[11px] leading-tight font-bold">(SUBMIT)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModal('help')}
                    className="flex items-center gap-1.5 text-xs font-bold cursor-pointer hover:text-blue-800 text-black select-none leading-tight py-1 px-2 rounded hover:bg-black/5"
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-black text-white rounded-full text-xs font-black">
                      ?
                    </span>
                    <div className="flex flex-col text-left leading-tight">
                      <span className="font-bold text-[12px] text-black">सहायता</span>
                      <span className="text-[10px] font-bold text-black">(HELP)</span>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* 5. FOOTER */}
      <Footer />

      {/* MODALS */}
      {/* Help Modal */}
      {activeModal === 'help' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-4 sm:p-5 shadow-2xl border-t-4 border-[#174A86] relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-3.5 right-3.5 text-gray-500 hover:text-black cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#174A86] text-white flex items-center justify-center font-bold flex-shrink-0">
                ?
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#174A86] leading-tight">
                नागरिक सहायता केंद्र (Citizen Assistance Manual)
              </h3>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-gray-700 overflow-y-auto pr-1 flex-1">
              <p>
                <strong>SarkariGPT (भारतीय एआई सेवा)</strong> delivers instant AI-assisted guidance for Government of India schemes, certificate verifications, and grievance redressals.
              </p>
              <div className="bg-blue-50 p-2.5 sm:p-3 rounded border border-blue-200 text-xs">
                <strong>How to query:</strong> Type in English or Hindi (e.g. &quot;Aadhaar status&quot;, &quot;PAN linking&quot;, &quot;PM-KISAN installment&quot;, &quot;Passport appointment&quot;).
              </div>
              <div className="bg-red-50 p-2.5 sm:p-3 rounded border border-red-200 text-xs text-red-900">
                <strong>सुरक्षा सूचना (Security Advisory):</strong> Never share OTP, bank passwords, or biometric credentials. SarkariGPT never asks for financial PINs.
              </div>
              <div className="text-[11px] sm:text-xs text-gray-600">
                <strong>National Helpline:</strong> 1800-111-555 (Toll-Free) | <strong>Email:</strong> support@sarkarigpt.gov.in
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="bg-[#174A86] text-white px-4 py-1.5 rounded font-semibold text-xs sm:text-sm hover:bg-[#123F78]"
              >
                Close (बंद करें)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Us Modal */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-5 shadow-2xl border-t-4 border-[#174A86] relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-3.5 right-3.5 text-gray-500 hover:text-black cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <NavMailIcon className="w-6 h-6 text-[#174A86] flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-[#174A86] leading-tight">
                संपर्क सूत्र (Contact Government Helpdesk)
              </h3>
            </div>
            <div className="space-y-2 text-xs text-gray-700">
              <p><strong>National Informatics Centre (NIC)</strong></p>
              <p>Ministry of Electronics and Information Technology (MeitY)</p>
              <p>Electronics Niketan, 6, CGO Complex, Lodhi Road, New Delhi - 110003</p>
              <div className="mt-3 p-2.5 bg-gray-100 rounded text-[11px] sm:text-xs">
                <p><strong>Toll Free:</strong> 1800-11-22-33</p>
                <p><strong>Support Email:</strong> helpdesk@sarkarigpt.nic.in</p>
                <p><strong>Working Hours:</strong> Mon - Sat (09:00 AM - 06:00 PM IST)</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t text-right">
              <button
                onClick={() => setActiveModal('null' as any)}
                className="bg-[#174A86] text-white px-4 py-1.5 rounded font-semibold text-xs sm:text-sm hover:bg-[#123F78]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation */}
      {activeModal === 'logout' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-4 sm:p-5 shadow-2xl border-t-4 border-red-700 relative text-center">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              लॉगआउट करें? (Confirm Logout)
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              Are you sure you want to end your current authenticated citizen session?
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => {
                  setActiveModal(null);
                  alert('Session refreshed successfully.');
                }}
                className="bg-red-700 text-white px-4 py-1.5 rounded font-semibold text-xs hover:bg-red-800"
              >
                Logout (लॉगआउट)
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="bg-gray-200 text-gray-800 px-4 py-1.5 rounded font-semibold text-xs hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Chat Confirmation Modal */}
      {deleteConfirmTarget && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-5 shadow-2xl border-t-4 border-red-600 relative">
            <button
              onClick={() => setDeleteConfirmTarget(null)}
              className="absolute top-3.5 right-3.5 text-gray-500 hover:text-black cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5 mb-3 text-red-700">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-4 h-4 text-red-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                संवाद हटाएं? (Delete Conversation)
              </h3>
            </div>
            <div className="space-y-2.5 text-xs text-gray-700">
              <p>
                क्या आप वाकई इस संवाद को इतिहास से हटाना चाहते हैं? (Are you sure you want to permanently delete this chat?)
              </p>
              <div className="bg-red-50/70 p-2.5 rounded border border-red-200">
                <p className="font-bold text-gray-900 truncate">
                  📄 {deleteConfirmTarget.title}
                </p>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Ref: {deleteConfirmTarget.refNumber} | Date: {deleteConfirmTarget.date}
                </p>
              </div>
              <p className="text-[11px] text-red-600 font-semibold italic">
                ⚠️ यह क्रिया पूर्ववत नहीं की जा सकती (This action cannot be undone).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmTarget(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-1.5 rounded font-semibold text-xs transition-colors cursor-pointer"
              >
                रद्द करें (Cancel)
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="bg-red-700 hover:bg-red-800 text-white px-4 py-1.5 rounded font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>हाँ, हटाएं (Yes, Delete)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
