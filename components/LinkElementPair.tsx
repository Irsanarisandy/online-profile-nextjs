import React, { type DetailedHTMLProps, type HTMLAttributes } from 'react';
import { RssIcon } from '@heroicons/react/24/solid';

import { GitHubLogo, GitLabLogo, LinkedInLogo } from './SvgIcons';

interface IProp
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  /**
   * Name of link corresponding to icon
   */
  linkName?: string;
  /**
   * Class names from custom SCSS files and [Tailwind CSS](https://tailwindcss.com/)
   */
  className?: string;
  /**
   * Size of default other icon
   */
  otherIconSize?: number;
}

export function LinkElementPair({ linkName, className, otherIconSize }: IProp) {
  switch (linkName) {
    case 'linkedin':
      return (
        <span className={className} data-testid="linkedin">
          <LinkedInLogo fill="#0A66C2" />
        </span>
      );
    case 'github':
      return (
        <span className={className} data-testid="github">
          <GitHubLogo fill="currentcolor" />
        </span>
      );
    case 'gitlab':
      return (
        <span className={className} data-testid="gitlab">
          <GitLabLogo fill="#FCA121" />
        </span>
      );
    case 'feed':
      return (
        <span className={className} data-testid="feed">
          <RssIcon />
        </span>
      );
    default:
      return (
        <span
          className={className}
          style={{ fontSize: otherIconSize }}
          data-testid="other"
        >
          &#128279;
        </span>
      );
  }
}
