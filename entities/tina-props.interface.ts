interface TinaProps<T> {
  data: T;
  variables: {
    relativePath: string;
  };
  query: string;
}

interface TinaConnectionProps<T1, T2> {
  data: T1;
  variables: {
    before?: string;
    after?: string;
    first?: number;
    last?: number;
    sort?: string;
    filter?: T2;
  };
  query: string;
  slug?: string;
}

export type { TinaProps, TinaConnectionProps };
