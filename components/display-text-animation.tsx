import styles from '@styles/DisplayTextAnimation.module.scss';

interface IProp {
  paragraph: string[];
  classes?: string;
}

function DisplayTextAnimation({paragraph, classes}: IProp): JSX.Element {
  let curIndex = 0;
  const result = paragraph.map(
    (line, lineIndex) => line.split('').map(
      (char, charIndex) => {
        curIndex++;
        return (
          <span
            aria-hidden="true"
            key={`line${lineIndex}char${charIndex}`}
            className={classes}
            style={{
              animationDelay: `${curIndex / 10 * 2 + 1}s`
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      }
    )
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
}

export default DisplayTextAnimation;
