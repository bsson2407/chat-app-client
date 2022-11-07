import React, { FC, ButtonHTMLAttributes } from 'react';
import './button.styles.scss';

export enum BUTTON_TYPE_CLASSES {
  base = 'base',
  inverted = 'inverted',
}

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${buttonType}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
