import { css } from '@emotion/css';
import { Theme, useTheme } from '@mui/material';
import * as React from 'react';
import classNames from 'classnames';

interface EstimationCardProps {
  value: string;
  selected: boolean;
  disabled: boolean;
  onClick: (value: string | null) => void;
}

const EstimationCard = ({ value, selected, disabled, onClick }: EstimationCardProps) => {
  const theme = useTheme();
  return (
    <div className={classNames(styles.card(theme), { selected: selected })} onClick={() => !disabled && onClick(selected ? null : value)}>
      <h3>{value}</h3>
    </div>
  );
};

const styles = {
  card: (theme: Theme) => css`
    width: 150px;
    height: 100px;
    border-radius: 5px;
    color: #fff;
    transform: rotateX(30deg) rotateY(-15deg) rotate(45deg);
    transition: transform 0.5s ease, background-position 0.5s linear;
    overflow: hidden;
    cursor: pointer;
    background: linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 25%, ${theme.palette.secondary.main} 55%);
    background-size: 400% 400%;
    box-shadow: 20px 20px 60px rgba(34, 50, 84, 0.5), 1px 1px 0 1px ${theme.palette.primary.dark};
    animation: CardSelect 0.5s linear;

    &:hover {
      transform: rotateX(30deg) rotateY(-15deg) rotate(45deg) translate(20px, 0px);
    }

    &.selected {
      transform: rotateX(30deg) rotateY(-15deg) rotate(45deg) translate(20px, 0px);
      background-position: 50% 50%;
    }

    &.skeleton {
      background: white;
      box-shadow: none;
    }

    > h3 {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 24px;
      font-weight: 600;
    }
  `
};

export default EstimationCard;
