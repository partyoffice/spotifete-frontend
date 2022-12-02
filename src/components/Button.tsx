interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary = false, size = 'medium', backgroundColor, label, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className="py-1 px-4 text-sm leading-none text-white rounded border border-gray-600 cursor-pointer hover:text-green-500 hover:bg-gray-700 hover:border-transparent"
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
