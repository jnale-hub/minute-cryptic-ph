"use client";
import { ClueData, TextRange } from '@/data/clues';
import { useMemo } from 'react';

type ClueDisplayProps = {
  clue: ClueData;
  activeHints: {
    showIndicator: boolean;
    showFodder: boolean;
    showDefinition: boolean;
  };
};

export default function ClueDisplay({ clue, activeHints }: ClueDisplayProps) {
  // Break the clue text into contiguous segments according to definition and wordplay ranges.
  // This allows selective highlighting of indicators, fodder, or the definition.
  const segments = useMemo(() => {
    const cutPoints = new Set<number>([0, clue.clueText.length]);

    const addRange = (r: TextRange) => {
      cutPoints.add(r.start);
      cutPoints.add(r.end);
    };

    addRange(clue.definition);

    clue.wordplay.forEach(step => {
      addRange(step.indicator);
      if (Array.isArray(step.fodder)) {
        step.fodder.forEach(addRange);
      } else {
        addRange(step.fodder);
      }
    });

    const sortedPoints = Array.from(cutPoints).sort((a, b) => a - b);
    const chunks: { text: string; start: number; end: number }[] = [];

    for (let i = 0; i < sortedPoints.length - 1; i++) {
      const start = sortedPoints[i];
      const end = sortedPoints[i + 1];
      chunks.push({
        text: clue.clueText.slice(start, end),
        start,
        end,
      });
    }

    return chunks;
  }, [clue]);

  // Render the clue with optional highlights based on activeHints
  return (
    <div className="bg-white rounded-xl p-8 mb-8">
      <div className="text-xl md:text-2xl font-medium leading-snug text-center">
        {segments.map((seg, i) => {
          // Determine the segment type for highlighting (if enabled in activeHints)
          let type: 'indicator' | 'fodder' | 'definition' | null = null;

          if (activeHints.showDefinition && isInside(seg, clue.definition)) {
            type = 'definition';
          } 
          else if (activeHints.showIndicator && checkWordplay(seg, clue.wordplay, 'indicator')) {
            type = 'indicator';
          } 
          else if (activeHints.showFodder && checkWordplay(seg, clue.wordplay, 'fodder')) {
            type = 'fodder';
          }

          return <Segment key={i} text={seg.text} type={type} />;
        })}
        <span className="ml-3 text-xl inline-block">
           ({Array.isArray(clue.enumeration) ? clue.enumeration.join(',') : clue.enumeration})
        </span>
      </div>
    </div>
  );
}

// Helper functions
function Segment({ text, type }: { text: string; type: string | null }) {
  // Render a span; background indicates the segment type when highlighted
  const baseClasses = "transition-colors duration-200 decoration-clone";

  let specificClasses = "bg-transparent";
  if (type === 'indicator') specificClasses = "bg-pastel-pink text-ink";
  else if (type === 'fodder') specificClasses = "bg-pastel-yellow text-ink";
  else if (type === 'definition') specificClasses = "bg-pastel-blue text-ink";

  return <span className={`${baseClasses} ${specificClasses}`}>{text}</span>;
}

// Return true if the segment is fully inside the provided range
function isInside(seg: { start: number; end: number }, target: TextRange) {
  return seg.start >= target.start && seg.end <= target.end;
}

// Check whether a segment falls inside any of the wordplay ranges
function checkWordplay(seg: { start: number; end: number }, wordplay: ClueData['wordplay'], checkType: 'indicator' | 'fodder') {
  return wordplay.some(step => {
    if (checkType === 'indicator') return isInside(seg, step.indicator);
    const fod = step.fodder;
    if (Array.isArray(fod)) return fod.some((r: TextRange) => isInside(seg, r));
    return isInside(seg, fod);
  });
}
