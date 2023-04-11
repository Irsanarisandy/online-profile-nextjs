import { DocumentArrowDownIcon, RssIcon } from '@heroicons/react/24/solid';

import { GitHubLogo, GitLabLogo, LinkedInLogo } from './svg-icons';

interface IProp {
  /**
   * Name of link corresponding to icon
   */
  linkName?: string;
  /**
   * Class names from custom SCSS files and [Tailwind CSS](https://tailwindcss.com/)
   */
  classes?: string;
  /**
   * Size of default other icon
   */
  otherIconSize?: number;
}

export function LinkElementPair({
  linkName,
  classes,
  otherIconSize
}: IProp): JSX.Element {
  switch (linkName) {
    case 'linkedin':
      return (
        <span className={classes} data-testid="linkedin">
          <LinkedInLogo fill="#0A66C2" />
        </span>
      );
    case 'github':
      return (
        <span className={classes} data-testid="github">
          <GitHubLogo fill="currentcolor" />
        </span>
      );
    case 'gitlab':
      return (
        <span className={classes} data-testid="gitlab">
          <GitLabLogo fill="#FCA121" />
        </span>
      );
    case 'cv':
      return (
        <span className={classes} data-testid="cv">
          <DocumentArrowDownIcon />
        </span>
      );
    case 'feed':
      return (
        <span className={classes} data-testid="feed">
          <RssIcon />
        </span>
      );
    default:
      return (
        <span
          className={classes}
          style={{ fontSize: otherIconSize }}
          data-testid="other"
        >
          &#128279;
        </span>
      );
  }
}
