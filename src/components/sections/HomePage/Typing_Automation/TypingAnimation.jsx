import { useState, useEffect } from "react";
import profileData from "../../../../data/profile.json";

function TypingAnimation() {
  const { typingTexts } = profileData.hero;
  const phrases = typingTexts;

  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (isTyping) {
      // Typing effect
      if (displayText.length < currentPhrase.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timer);
      } else {
        // Pause before erasing
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } else {
      // Erasing effect
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        // Move to next phrase
        const nextIndex = (phraseIndex + 1) % phrases.length;
        setPhraseIndex(nextIndex);
        setIsTyping(true);
      }
    }
  }, [displayText, phraseIndex, isTyping, phrases]);
  
  return (
    <div className="flex items-center justify-center">
      <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-accent-400 inline-block">
        {displayText}
        <span className="inline-block w-2 h-6 md:h-8 bg-accent-400 ml-1 animate-blink"></span>
      </span>
    </div>
  );
}

export default TypingAnimation;
