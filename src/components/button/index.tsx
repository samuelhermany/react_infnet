import { Button as MuiButton, ButtonProps } from '@mui/material';

interface IButtonProps extends ButtonProps {
  children?: React.ReactNode;
  props?: any;
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  className?: "";
}

const ButtonComponent: React.FC<IButtonProps> = ({ children, ...props }) => {
  const { variant = "outlined", size = "large" } = props;

  return <MuiButton
          className={`general-button ${props.className ? props.className : ""}`}
          variant={variant}
          size={size}
          {...props}>
            {children}
          </MuiButton>;
}

export default ButtonComponent;
