import React, { type DetailedHTMLProps, type HTMLAttributes } from 'react';

import styles from '.styles/DisplayTextAnimation.module.scss';

interface IProp
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  /**
   * List of sentences
   */
  paragraph: string[];
  /**
   * Animation delay in seconds
   */
  speed?: (n: number) => number;
  /**
   * Class names from custom SCSS files and [Tailwind CSS](https://tailwindcss.com/)
   */
  className?: string;
}

export function DisplayTextAnimation({
  paragraph,
  speed = (n: number) => n / 10 + 1,
  className
}: IProp) {
  let curIndex = 0;
  const result = paragraph.map((line, lineIndex) =>
    line.split('').map((char, charIndex) => {
      curIndex++;
      return (
        <span
          aria-hidden="true"
          key={`line${lineIndex}char${charIndex}`}
          className={className}
          style={{
            animationDelay: `${speed(curIndex)}s`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    })
  );

  return (
    <div className={styles.animated_text_container}>
      {result.map((sentence, index) => (
        <div key={`sentence${index}`} className="flex">
          {sentence}
        </div>
      ))}
    </div>
  );
}
