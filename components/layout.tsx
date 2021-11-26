import axios from 'axios';
import useSWR from 'swr';
import Footer from './footer';

interface IProp {
  children: React.ReactNode;
}

function Layout({children}: IProp): JSX.Element {
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const { data, error } = useSWR('/api/links', fetcher);

  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="flex flex-col flex-grow flex-shrink-0">
        <main>{children}</main>
        <Footer links={data} />
      </div>
    </div>
  );
};

export default Layout;
