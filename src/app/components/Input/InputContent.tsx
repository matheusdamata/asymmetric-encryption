interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function InputContent({ ...rest }: InputProps) {
  return (
    <input
      type="text"
      className="w-full p-2 rounded-lg bg-slate-200 text-black placeholder-black disabled:text-gray-500"
      disabled
      {...rest}
    />
  )
}
