import { Progress } from '@components/progress';
import { render } from '@testing-library/react';

describe('Progress component', () => {
  const progressDataList = [
    {
      name: 'test',
      percentage: 75,
      color: 'green'
    }
  ];

  it('should render correctly', () => {
    const view = render(<Progress progressDataList={progressDataList} />);

    const progressComp = view.getByTestId('progress-comp');
    expect(progressComp).toHaveStyle(`
      background-color: #A3A3A3;
      height: 24px;
    `);
    expect(progressComp.childElementCount).toBe(progressDataList.length);

    progressDataList.forEach((data, index) => {
      expect(view.getByTestId(`progress-info-${index + 1}`)).toHaveStyle(`
        background-color: ${data.color};
        height: 24px;
        width: ${data.percentage}%;
      `);
    });
  });

  it('should display information if not hidden', () => {
    const view = render(<Progress progressDataList={progressDataList} />);
    progressDataList.forEach((data, index) => {
      expect(view.getByTestId(`progress-info-${index + 1}`).innerHTML).toBe(
        `${data.name} (${data.percentage}%)`
      );
    });
  });

  it('should hide information if hideInfo is true', () => {
    const view = render(
      <Progress progressDataList={progressDataList} hideInfo />
    );
    progressDataList.forEach((_, index) => {
      expect(view.getByTestId(`progress-info-${index + 1}`).innerHTML).toBe('');
    });
  });

  it('should display percentage if hideName is true', () => {
    const view = render(
      <Progress progressDataList={progressDataList} hideName />
    );
    progressDataList.forEach((data, index) => {
      expect(view.getByTestId(`progress-info-${index + 1}`).innerHTML).toBe(
        ` (${data.percentage}%)`
      );
    });
  });
});
