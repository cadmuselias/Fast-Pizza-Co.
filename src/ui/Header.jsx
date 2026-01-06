import { Link } from "react-router-dom";

import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-500 bg-yellow-400 px-4 py-3 uppercase tracking-widest sm:px-6">
      <Link to="/" className="flex items-center gap-2">
        {/* <img src={logo} alt="Fast Pizza Logo" className="max-h-10 w-auto" /> */}
        <span className="font-semibold">🍕 Fast React Pizza Co.</span>
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
