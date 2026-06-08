import style from "@/app/styles/aside.module.css";

interface AsideProps {
  getOpt: (option: string) => void;
}

const Aside: React.FC<AsideProps> = ({ getOpt }) => {
  return (
    <aside className={style.aside}>
      <div
        className="flex items-center gap-1.5 cursor-pointer"
        onClick={() => getOpt("users")}
      >
        <span className={style.users}></span>
        <span>users</span>
      </div>
      <div
        className="flex items-center gap-1.5 cursor-pointer"
        onClick={() => getOpt("books")}
      >
        <span className={style.books}></span>
        <span>books</span>
      </div>
      <div
        className="flex items-center gap-1.5 cursor-pointer"
        onClick={() => getOpt("rentals")}
      >
        <span className={style.rentals}></span>
        <span>rentals</span>
      </div>
    </aside>
  );
};

export default Aside;
