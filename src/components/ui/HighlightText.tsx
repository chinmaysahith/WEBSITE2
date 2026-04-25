import React from "react";

interface HighlightTextProps {
  text: string;
  highlight: string | string[];
}

export function HighlightText({ text, highlight }: HighlightTextProps) {
  const highlightWords = Array.isArray(highlight) ? highlight : [highlight];
  
  // Escape special regex characters in highlight words
  const escapedWords = highlightWords.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  
  // Create a case-insensitive regex to split the text
  const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isHighlight = highlightWords.some(
          word => word.toLowerCase() === part.toLowerCase()
        );
        
        if (isHighlight) {
          return (
            <span 
              key={i} 
              className="font-numeral normal-case font-normal inline-block transform -rotate-2 text-[1.15em] mx-1 md:mx-2 text-[#9B2C2C] tracking-normal relative z-10 drop-shadow-sm -translate-y-[0.06em]"
            >
              {part}
            </span>
          );
        }
        
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}
