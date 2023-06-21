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
}

export function Progress({
  progressDataList,
  hideName = false,
  hideInfo = false,
  bgColor = '#A3A3A3',
  height = 24
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

  return (
    <div
      data-testid="progress-comp"
      className="flex animate-pulse rounded-lg"
      style={{ backgroundColor: bgColor, height }}
    >
      {progressDataList.length === 1 && (
        <div
          data-testid="progress-info-1"
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
        progressDataList.map((progressData, index) => (
          <div
            key={`Progress data ${index + 1}`}
            data-testid={`progress-info-${index + 1}`}
            className={`flex justify-center ${
              index === 0
                ? 'rounded-l-lg'
                : index === progressDataList.length - 1
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
        ))}
    </div>
  );
}
