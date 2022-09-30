type LoadingSpinnerProps = {
  size: "small" | "medium" | "large"
  color?: string;
}

export function LoadingSpinner({ size, color }: LoadingSpinnerProps) {
  const sizeSpinner = {
    "small": 5,
    "medium": 10,
    "large": 20,
  }

  return (
    <div 
      style={{ borderTopColor: "transparent" }}
      className={`w-${sizeSpinner[size]} h-${sizeSpinner[size]} mt-1 border-2 ${color} border-solid rounded-full animate-spin`}
    />
  )
}