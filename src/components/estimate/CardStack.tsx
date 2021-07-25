import { css } from '@emotion/css';
import { Theme, useTheme } from '@material-ui/system';
import * as React from 'react';

const CardStack = () => {
  const cards = new Array(5).fill('Card');

  const theme = useTheme();

  return (
    <div className={styles.stack(theme)}>
      {cards.map((card, index) => (
        <div key={index}>
          <h3>{index}</h3>
        </div>
      ))}
    </div>
  );
};

const styles = {
  stack: (theme: Theme) => css`
    display: grid;
    grid-template-columns: repeat(auto-fit, 75px);
    justify-content: center;
    grid-gap: 1rem;
    margin: 50px 75px 50px ${theme.spacing(0)};
    user-select: none;
    transform-style: preserve-3d;

    & > div {
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
        background-position: 50% 50%;
      }

      &.selected {
        transform: rotateX(30deg) rotateY(-15deg) rotate(45deg) translate(20px, 0px);
        background-position: 50% 50%;
      }

      > h3 {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 24px;
        font-weight: 600;
      }
    }
  `
};

export default CardStack;
