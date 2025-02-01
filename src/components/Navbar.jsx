import { Settings } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const Navbar = () => {
  const { setTheme } = useThemeStore();
  

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-14">
        <div className="flex items-center justify-between h-full">
          <div className="flex justify-center items-center gap-8">
            <h1 className="text-lg font-bold">Quiz</h1>
          </div>

          <div className="flex items-center gap-2">
            
            <details className="dropdown">
              <summary className="btn m-1"><Settings className="w-4 h-4" />Theme</summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52  shadow">
                <li>
                  <button onClick={() => setTheme("light")}>Light Mode</button>
                </li>
                <li>
                  <button onClick={() => setTheme("dark")}>Dark Mode</button>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
