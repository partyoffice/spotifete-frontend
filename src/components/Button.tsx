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
      className="cursor-pointer text-sm px-4 py-1 leading-none border rounded text-white border-gray-600 hover:border-transparent hover:text-green-500 hover:bg-gray-700"
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
