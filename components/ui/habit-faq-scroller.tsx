import React from 'react';

/**
 * FaqCard
 * Reusable card for a single FAQ item.
 */
export const FaqCard = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="flex flex-col items-start gap-4 p-6 bg-white rounded-xl border border-slate-200/80 shadow-md hover:shadow-lg transition-all w-96 flex-shrink-0 faq-card">
      <h3 className="text-base md:text-lg font-bold text-slate-900 faq-title leading-snug">{question}</h3>
      <p className="text-sm text-slate-600 faq-answer leading-relaxed">{answer}</p>
    </div>
  );
};

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqRow {
  id: string;
  speed?: string;
  direction?: 'left' | 'right';
  faqItems: FaqItem[];
}

export interface FaqSectionData {
  mainTitle?: string;
  mainSubtitle?: string;
  rows: FaqRow[];
}

/**
 * HorizontalScroller
 * Wraps children and creates a seamless horizontal looping animation.
 */
export const HorizontalScroller = ({
  children,
  speed = '40s',
  direction = 'left',
}: {
  children: React.ReactNode;
  speed?: string;
  direction?: 'left' | 'right';
}) => {
  const animationClass =
    direction === 'right' ? 'animate-scroll-horizontal-reverse' : 'animate-scroll-horizontal';

  // Inline style to set the CSS custom property for scroll duration.
  const style = { '--scroll-duration': speed } as React.CSSProperties;

  return (
    <div className="w-full overflow-hidden group relative scroller-mask">
      <div className={`flex ${animationClass} group-hover:[animation-play-state:paused]`} style={style}>
        <div className="flex items-stretch justify-center flex-shrink-0 gap-6 px-3">
          {children}
        </div>
        {/* duplicate for seamless loop */}
        <div className="flex items-stretch justify-center flex-shrink-0 gap-6 px-3" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * FaqSection
 * Assembles title, subtitle, and multiple horizontal rows.
 */
const FaqSection = ({ data }: { data: FaqSectionData }) => {
  return (
    <div className="relative flex flex-col items-center gap-8 p-4 md:p-8 w-full max-w-7xl mx-auto">
      {(data.mainTitle || data.mainSubtitle) && (
        <div className="flex flex-col items-center gap-3 text-center z-10 max-w-2xl">
          {data.mainTitle && (
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              {data.mainTitle}
            </h2>
          )}
          {data.mainSubtitle && (
            <p className="text-sm md:text-base text-slate-600">
              {data.mainSubtitle}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-6 z-10 w-full">
        {data.rows.map((row) => (
          <HorizontalScroller key={row.id} speed={row.speed} direction={row.direction}>
            {row.faqItems.map((item) => (
              <FaqCard key={item.id} question={item.question} answer={item.answer} />
            ))}
          </HorizontalScroller>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
