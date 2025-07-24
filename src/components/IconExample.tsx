// src/components/IconExample.tsx

import React from "react";
import { Home, Search, User } from "lucide-react";

const IconExample = () => {
  return (
    <div className="p-4 space-x-4 flex items-center text-blue-600">
      <Home size={28} strokeWidth={2} />
      <Search size={28} strokeWidth={2} />
      <User size={28} strokeWidth={2} />
      <span className="text-lg font-medium">Lucide Icons Example</span>
    </div>
  );
};

export default IconExample;
