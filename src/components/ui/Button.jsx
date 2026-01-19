import styles from "./Button.module.css";

export default function Button({ 
  children, 
  onClick, 
  variant = "ghost", // 'ghost', 'icon', 'chip'
  active = false, 
  className = "", 
  href = null,
  disabled = false,
  ...props 
}) {
  // Combine base class, variant class, active class, and custom class
  const classNames = [
    styles.base,
    styles[variant],
    active ? styles.active : "",
    className
  ].filter(Boolean).join(" ");

  // If href exists, render an anchor tag (link) that looks like a button
  if (href) {
    return (
      <a href={href} className={classNames} {...props}>
        {children}
      </a>
    );
  }

  // Otherwise render a standard button
  return (
    <button 
      type="button" 
      className={classNames} 
      onClick={onClick} 
      disabled={disabled}
      aria-pressed={active}
      {...props}
    >
      {children}
    </button>
  );
}