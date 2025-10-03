export const FormInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & { label: string }
> = ({ label, className, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      className={`w-full border border-gray-300 rounded-lg px-4 py-2 text-base text-gray-800 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${className}`}
      {...props}
    />
  </div>
);
