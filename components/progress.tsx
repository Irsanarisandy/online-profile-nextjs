import React from 'react';

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

interface ProgressState {
  displayPercentage: boolean;
}

export class Progress extends React.Component<ProgressProp, ProgressState> {
  constructor(props: ProgressProp) {
    super(props);
    this.state = { displayPercentage: window.innerWidth >= 640 };
  }

  static defaultProps = {
    hideName: false,
    hideInfo: false,
    bgColor: '#A3A3A3',
    height: 24
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () =>
    this.setState({
      displayPercentage: window.innerWidth >= 640
    });

  render() {
    const { progressDataList, hideName, hideInfo, bgColor, height } =
      this.props;
    const { displayPercentage } = this.state;

    return (
      <div
        data-testid="progress-comp"
        className="flex rounded-lg animate-pulse"
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
}
