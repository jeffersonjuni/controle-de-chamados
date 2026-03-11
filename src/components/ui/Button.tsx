import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger"
}

export default function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {

  const base =
    "px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center"

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primaryHover",

    secondary:
      "bg-border text-white hover:bg-secondary",

    success:
      "bg-success text-white hover:opacity-90",

    danger:
      "bg-danger text-white hover:opacity-90",
  }

  return (
    <button
      className={`${base} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}