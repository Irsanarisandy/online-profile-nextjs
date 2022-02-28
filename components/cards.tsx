interface IProp {
  children: React.ReactNode;
  classes?: string;
}

const Cards = ({ children, classes }: IProp) => (
  <div
    className={`hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-500 border border-transparent rounded-lg shadow-lg shadow-gray-50 dark:shadow-gray-900 ${classes}`}
  >
    {children}
  </div>
);

export default Cards;
