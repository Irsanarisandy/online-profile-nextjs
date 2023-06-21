import React, { useLayoutEffect, useState } from 'react';

export interface ProgressData {
  name: string;
  percentage: number;
  color: string;
}

interface ProgressProp {
  /**
   * List of objects, each containing name, percentage and color attributes
   */
  progressDataList: ProgressData[];
  /**
   * Hide progress name
   */
  hideName?: boolean;
  /**
   * Hide progress percentage
   */
  hideInfo?: boolean;
  /**
   * Progress background color
   */
  bgColor?: string;
  /**
   * Progress height
   */
  height?: number;
  /**
   * Tina's click to edit functionality (only available in Tina's edit mode)
   */
  passedTinaFieldFunc?: (i: number) => string;
}

export function Progress({
  progressDataList,
  hideName = false,
  hideInfo = false,
  bgColor = '#A3A3A3',
  height = 24,
  passedTinaFieldFunc
}: ProgressProp) {
  const [displayPercentage, setDisplayPercentage] = useState(false);

  useLayoutEffect(() => {
    const updateWindowDimensions = () => {
      setDisplayPercentage(innerWidth >= 800);
    };

    updateWindowDimensions();

    addEventListener('resize', updateWindowDimensions);

    return () => {
      removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  const soleTinaProgressField = passedTinaFieldFunc
    ? passedTinaFieldFunc(0)
    : undefined;

  return (
    <div
      data-testid="progress-comp"
      className="flex animate-pulse rounded-lg"
      style={{ backgroundColor: bgColor, height }}
    >
      {progressDataList.length === 1 && (
        <div
          data-testid="progress-info-1"
          data-tina-field={soleTinaProgressField}
          className="flex justify-center rounded-lg"
          style={{
            backgroundColor: progressDataList[0].color,
            height,
            width: `${progressDataList[0].percentage}%`
          }}
        >
          {!hideInfo
            ? `${!hideName ? progressDataList[0].name : ''} ${
                hideName || displayPercentage
                  ? `(${progressDataList[0].percentage}%)`
                  : ''
              }`
            : ''}
        </div>
      )}
      {progressDataList.length > 1 &&
        progressDataList.map((progressData, i) => {
          const passedTinaField = passedTinaFieldFunc
            ? passedTinaFieldFunc(i)
            : undefined;

          return (
            <div
              key={`Progress data ${i + 1}`}
              data-testid={`progress-info-${i + 1}`}
              data-tina-field={passedTinaField}
              className={`flex justify-center ${
                i === 0
                  ? 'rounded-l-lg'
                  : i === progressDataList.length - 1
                  ? 'rounded-r-lg'
                  : ''
              }`}
              style={{
                backgroundColor: progressData.color,
                height,
                width: `${progressData.percentage}%`
              }}
            >
              {!hideInfo
                ? `${!hideName ? progressData.name : ''} ${
                    hideName || displayPercentage
                      ? `(${progressData.percentage}%)`
                      : ''
                  }`
                : ''}
            </div>
          );
        })}
    </div>
  );
}
