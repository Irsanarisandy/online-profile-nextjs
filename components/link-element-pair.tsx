import { GitHubLogo, GitLabLogo, LinkedInLogo } from './svg-icons';

const linkElementPair = (linkName: string, classes?: string, otherIconSize?: number) => {
  switch (linkName) {
    case 'linkedin':
      return <span className={classes}>
        <LinkedInLogo fill="#0A66C2" />
      </span>;
    case 'github':
      return <span className={classes}>
        <GitHubLogo fill="currentcolor" />
      </span>;
    case 'gitlab':
      return <span className={classes}>
        <GitLabLogo fill="#FCA121" />
      </span>;
    case 'cv':
      return <span style={{fontSize: otherIconSize}}>&#128196;</span>;
    default:
      return <span style={{fontSize: otherIconSize}}>&#128279;</span>;
  }
}

export default linkElementPair;
