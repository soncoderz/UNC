/**
 * Badge component - Status/category labels
 */
export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}) {
  const variants = {
    default: "bg-gray-light text-dark-light",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    success: "bg-success/10 text-success",
    danger: "bg-danger/10 text-danger",
    new: "bg-gradient-to-r from-secondary to-secondary-light text-white",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
