import "./style.css";
import Link from "next/link";
import links from "./data";
export default function Header() {
  return (
    <header className="app__header ">
      <div>
        <h1 className="font-bold text-xl">Todo-List</h1>
        <small className="text-slate-500">Simple Todo-List App</small>
      </div>
      <nav className="app__header__nav">
        <ul className="app__header__nav__list  ">
          {links.map((link) => {
            return (
              <li className="app__header__nav__item ">
                <Link href={link.path} className="app__header__nav_item_link">
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
