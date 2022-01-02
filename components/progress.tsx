import React from 'react';

export interface ProgressData {
  name: string;
  percentage: number;
  color: string;
}

interface ProgressProp {
  progressDataList: ProgressData[];
  hideName?: boolean;
  hideInfo?: boolean;
  bgColor?: string;
  height?: number;
}

interface ProgressState {
  displayPercentage: boolean;
}

class Progress extends React.Component<ProgressProp, ProgressState> {
  constructor(props: ProgressProp) {
    super(props);
    this.state = { displayPercentage: window.innerWidth >= 640 };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => this.setState({
    displayPercentage: window.innerWidth >= 640
  });

  render() {
    let { progressDataList, hideName, hideInfo, bgColor, height } = this.props;
    const { displayPercentage } = this.state;
    bgColor = bgColor || '#A3A3A3';
    height = height || 24;

    return (
      <div className="flex rounded-lg animate-pulse" style={{ backgroundColor: bgColor, height }}>
        {progressDataList.length === 1 && (
          <div
            className="flex justify-center rounded-lg"
            style={{
              backgroundColor: progressDataList[0].color,
              height,
              width: `${progressDataList[0].percentage}%`
            }}
          >
            {!hideInfo ?
              `${!hideName ? progressDataList[0].name : ''} ${hideName || displayPercentage ? `(${
                progressDataList[0].percentage
              }%)`: ''}`
            : ''}
          </div>
        )}
        {progressDataList.length > 1 && progressDataList.map((progressData, index) => (
          <div
            className={`flex justify-center ${
              index === 0 ? 'rounded-l-lg' :
                index === progressDataList.length - 1 ? 'rounded-r-lg' :
                ''
            }`}
            style={{
              backgroundColor: progressData.color,
              height,
              width: `${progressData.percentage}%`
            }}
            key={`Progress data ${index+1}`}
          >
            {!hideInfo ?
              `${!hideName ? progressData.name : ''} ${hideName || displayPercentage ? `(${
                progressData.percentage
              }%)`: ''}`
            : ''}
          </div>
        ))}
      </div>
    );
  }
}

export default Progress;
