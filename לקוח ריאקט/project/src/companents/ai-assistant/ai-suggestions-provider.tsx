"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import AIChatBubble from "./ai-chat-bubble"

interface AISuggestion {
  id: string
  message: string
  type: "welcome" | "tip" | "suggestion"
  page: string
  shown: boolean
  delay: number
  autoHide: boolean
}

interface AISuggestionsContextType {
  showSuggestion: (id: string) => void
  dismissSuggestion: (id: string) => void
  resetSuggestions: () => void
}

const AISuggestionsContext = createContext<AISuggestionsContextType | null>(null)

export const useAISuggestions = () => {
  const context = useContext(AISuggestionsContext)
  if (!context) {
    throw new Error("useAISuggestions must be used within an AISuggestionsProvider")
  }
  return context
}

interface AISuggestionsProviderProps {
  children: ReactNode
  currentPage: string
}

export const AISuggestionsProvider: React.FC<AISuggestionsProviderProps> = ({ children, currentPage }) => {
  // רשימת ההצעות האפשריות
  const [suggestions] = useState<AISuggestion[]>([
    {
      id: "welcome",
      message: "ברוכים הבאים לאלבומיקס! אני העוזר החכם שלך. לחץ עליי בכל עת לקבלת עזרה.",
      type: "welcome",
      page: "HomePage",
      shown: false,
      delay: 1000,
      autoHide: true,
    },
    {
      id: "album_creation_tip",
      message: "טיפ: תן שמות משמעותיים לאלבומים שלך כדי שה-AI יוכל לעזור לך למצוא אותם בקלות!",
      type: "tip",
      page: "AddAlbum",
      shown: false,
      delay: 2000,
      autoHide: true,
    },
    {
      id: "image_organization",
      message: "האם ידעת? אני יכול לעזור לך לארגן את התמונות שלך לפי נושאים. נסה לשאול אותי!",
      type: "suggestion",
      page: "FolderImages",
      shown: false,
      delay: 3000,
      autoHide: true,
    },
    {
      id: "albums_suggestion",
      message: "רוצה רעיונות לאלבומים חדשים? לחץ על כפתור ה-AI בפינה הימנית התחתונה!",
      type: "suggestion",
      page: "AlbumsList",
      shown: false,
      delay: 2500,
      autoHide: true,
    },
  ])

  const [activeSuggestions, setActiveSuggestions] = useState<AISuggestion[]>([])

  // עדכון ההצעות הפעילות בהתאם לעמוד הנוכחי
  useEffect(() => {
    const pageSuggestions = suggestions.filter((suggestion) => suggestion.page === currentPage && !suggestion.shown)

    if (pageSuggestions.length > 0) {
      // הצג רק הצעה אחת בכל פעם
      setActiveSuggestions([pageSuggestions[0]])
    } else {
      setActiveSuggestions([])
    }
  }, [currentPage, suggestions])

  const showSuggestion = (id: string) => {
    setActiveSuggestions((prev) => {
      const suggestion = suggestions.find((s) => s.id === id)
      if (suggestion && !prev.some((s) => s.id === id)) {
        return [...prev, suggestion]
      }
      return prev
    })
  }

  const dismissSuggestion = (id: string) => {
    setActiveSuggestions((prev) => prev.filter((s) => s.id !== id))

    // סמן את ההצעה כמוצגת
    suggestions.forEach((s) => {
      if (s.id === id) {
        s.shown = true
      }
    })
  }

  const resetSuggestions = () => {
    suggestions.forEach((s) => {
      s.shown = false
    })
    setActiveSuggestions([])
  }

  return (
    <AISuggestionsContext.Provider value={{ showSuggestion, dismissSuggestion, resetSuggestions }}>
      {children}

      {activeSuggestions.map((suggestion) => (
        <AIChatBubble
          key={suggestion.id}
          message={suggestion.message}
          type={suggestion.type}
          onClose={() => dismissSuggestion(suggestion.id)}
          autoHide={suggestion.autoHide}
          delay={suggestion.delay}
        />
      ))}
    </AISuggestionsContext.Provider>
  )
}
