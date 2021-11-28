import axios from 'axios';
import useSWR from 'swr';
import Footer from './footer';
import useToggleTheme from './toggle-theme';
import styles from '@styles/Layout.module.scss';

interface IProp {
  children: React.ReactNode;
}

function Layout({children}: IProp): JSX.Element {
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const { data, error } = useSWR('/api/links', fetcher);
  const [colorTheme, setTheme] = useToggleTheme();

  return (
    <div className="min-h-screen flex flex-row">
      <div className="flex flex-col flex-auto p-4">
        <main>{children}</main>
        <Footer links={data} />
      </div>
      <button
        className={`fixed bottom-4 right-4 text-black bg-gray-200 ${styles.toggle_button}`}
        onClick={() => setTheme(colorTheme === 'light' ? 'dark' : 'light')}
      >
        <span>
          {colorTheme === 'light' ? `\u2600` : `\u263D`}
        </span>
      </button>
    </div>
  );
};

export default Layout;
