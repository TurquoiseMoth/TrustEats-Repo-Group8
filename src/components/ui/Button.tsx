

function Button({children, className}: {children: React.ReactNode, className?: string}) {
  return (
    <div>

      <button className={className}>{children}</button>
    </div>
  )
}

export default Button