'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

function SearchBox() {
  const [input, setinput] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    router.push(`/search?term=${input}`);
  };
  return (
    <form onSubmit={handleSearch} className="max-width-6xl flex justify-between items-center px-5">
      <input
        type="text"
        value={input}
        onChange={(e) => setinput(e.target.value)}
        placeholder="Search keywords..."
        className="flex-1 w-full h-14 rounded-sm placeholder-gray-500 text-gray-500 outline-none bg-transparent dark:text-orange-400"
      />
      <button disabled={!input} className="text-orage-400 disabled:text-gray-400" type="submit">
        Search
      </button>
    </form>
  );
}
export default SearchBox;
