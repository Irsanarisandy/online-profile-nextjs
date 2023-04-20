import { Progress } from '.components/Progress';

describe('Progress component', () => {
  const progressDataList = [
    {
      name: 'test',
      percentage: 75,
      color: 'green'
    }
  ];

  it('should render correctly', () => {
    cy.mount(<Progress progressDataList={progressDataList} />);
    const progressComp = cy.get('[data-testid="progress-comp"');
    progressComp.children().should('have.length', progressDataList.length);
  });

  it('should hide information if hideInfo is true', () => {
    cy.mount(<Progress progressDataList={progressDataList} hideInfo />);
    progressDataList.forEach((_, index) => {
      cy.get(`[data-testid="progress-info-${index + 1}"]`).should('be.empty');
    });
  });

  it('should display percentage if hideName is true', () => {
    cy.mount(<Progress progressDataList={progressDataList} hideName />);
    progressDataList.forEach((data, index) => {
      cy.get(`[data-testid="progress-info-${index + 1}"]`).should(
        'have.text',
        ` (${data.percentage}%)`
      );
    });
  });
});
