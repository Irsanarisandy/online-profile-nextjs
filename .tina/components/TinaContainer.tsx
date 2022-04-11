import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
import { TinaEditProvider } from 'tinacms/dist/edit-state';

const TinaProvider = dynamic(() => import('./TinaProvider'), { ssr: false });

const TinaContainer = ({ children }: PropsWithChildren<object>) => {
  return (
    <TinaEditProvider editMode={<TinaProvider>{children}</TinaProvider>}>
      {children}
    </TinaEditProvider>
  );
};

export default TinaContainer;
