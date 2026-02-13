import { TrendingUp } from "lucide-react";
import Logo from "../assets/logo.png";



export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100">
     <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3">
        
        {/* Logo Icon */}
        <div className="flex items-end gap-1">
           <img src={Logo} alt="Elite Funders" className="h-8" />
          
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl font-medium text-black">
          Elite Funders
        </h1>
      </div>
    </header>
  );
}
