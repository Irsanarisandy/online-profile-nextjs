import styles from '../styles/DisplayTextAnimation.module.scss';

interface IProp {
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
  classes?: string;
}

export const DisplayTextAnimation = ({
  paragraph,
  speed = (n: number) => n / 10 + 1,
  classes
}: IProp) => {
  let curIndex = 0;
  const result = paragraph.map((line, lineIndex) =>
    line.split('').map((char, charIndex) => {
      curIndex++;
      return (
        <span
          aria-hidden="true"
          key={`line${lineIndex}char${charIndex}`}
          className={classes}
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
    <div className={`${styles.animated_text_container}`}>
      {result.map((sentence, index) => (
        <div key={`sentence${index}`} className="flex">
          {sentence}
        </div>
      ))}
    </div>
  );
};
