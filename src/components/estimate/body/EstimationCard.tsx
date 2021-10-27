import { css } from '@emotion/css';
import { Skeleton, Theme, useTheme } from '@mui/material';
import * as React from 'react';

const classNames = require('classnames');

interface EstimationCardProps {
  value: string;
  selected: boolean;
  disabled: boolean;
  onClick: (value: string | null) => void;
}

export const EstimationCard = ({ value, selected, disabled, onClick }: EstimationCardProps) => {
  const theme = useTheme();
  return (
    <div className={classNames(styles.card(theme, disabled), { selected: selected })} onClick={() => !disabled && onClick(selected ? null : value)}>
      <h3>{value}</h3>
    </div>
  );
};

export const EstimationCardSkeleton = () => {
  const theme = useTheme();
  return (
    <div className={classNames(styles.card(theme, false), 'skeleton')}>
      <Skeleton variant="rectangular" height="100px" />
    </div>
  );
};

const styles = {
  card: (theme: Theme, disabled: boolean) => css`
    width: 150px;
    height: 100px;
    border-radius: 5px;
    color: #fff;
    transform: rotateX(30deg) rotateY(-15deg) rotate(45deg);
    transition: transform 0.5s ease, background-position 0.5s linear;
    overflow: hidden;
    cursor: ${!disabled ? 'pointer' : 'default'};
    --c1: ${theme.palette.primary.light};
    --c2: ${theme.palette.primary.main};
    --c3: ${theme.palette.secondary.main};
    background: linear-gradient(135deg, var(--c1) 0%, var(--c2) 25%, var(--c3) 55%);
    background-size: 400% 400%;
    box-shadow: 20px 20px 60px rgba(34, 50, 84, 0.5), 1px 1px 0 1px ${theme.palette.primary.dark};
    animation: CardSelect 0.5s linear;

    ${!disabled &&
    `
      &:hover {
        transform: rotateX(30deg) rotateY(-15deg) rotate(45deg) translate(20px, 0px);
      }`}

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
