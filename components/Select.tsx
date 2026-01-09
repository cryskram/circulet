import { FaChevronDown } from "react-icons/fa6";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className="w-full appearance-none rounded-md border bg-white px-3 py-2 pr-9 text-sm text-slate-800 shadow-sm transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-900 focus:outline-none"
      >
        {children}
      </select>

      <FaChevronDown
        size={16}
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-500"
      />
    </div>
  );
}
