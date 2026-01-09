import { FaChevronDown } from "react-icons/fa6";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className="w-full appearance-none rounded-md border border-slate-200 bg-white px-3 py-2 pr-9 text-sm text-slate-800 transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:ring-slate-300"
      >
        {children}
      </select>

      <FaChevronDown
        size={14}
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 dark:text-slate-400"
      />
    </div>
  );
}
