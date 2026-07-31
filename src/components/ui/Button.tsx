
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <div>
      <button className={className} {...props}>
        {children}
      </button>
    </div>
  );
}

export default Button;
