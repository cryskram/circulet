import { FaChevronDown } from "react-icons/fa6";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className="
          w-full
          appearance-none
          rounded-md
          border
          bg-white
          px-3
          py-2
          pr-9
          text-sm
          text-neutral-800
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-neutral-900
          hover:bg-neutral-50
          transition
        "
      >
        {children}
      </select>

      <FaChevronDown
        size={16}
        className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-neutral-500
        "
      />
    </div>
  );
}
