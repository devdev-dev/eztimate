import { css } from '@emotion/css';
import { Theme, useTheme } from '@mui/material';
import * as React from 'react';
import { useActiveIssueQuery, useActiveUserQuery, useCreateEstimateActiveIssueMutation, useDeleteEstimateActiveIssueMutation } from '../../generated/graphql';

const EstimationCardStack = () => {
  const theme = useTheme();

  const { data: userData } = useActiveUserQuery();
  const { data, loading } = useActiveIssueQuery();
  const [createEstimateMutation] = useCreateEstimateActiveIssueMutation();
  const [deleteEstimateMutation] = useDeleteEstimateActiveIssueMutation();

  const userEstimate = data?.getActiveIssue?.estimates.find(e => e.user._id === userData?.getActiveUser?._id);
  return (
    <>
      {!loading && data && (
        <div className={styles.stack(theme)}>
          {data.getActiveIssue?.stack.map((card, index) => {
            const isEstimatedCardValue = userEstimate?.value === card;
            return (
              <div
                key={index}
                className={isEstimatedCardValue ? 'selected' : ''}
                onClick={() => {
                  if (userEstimate && isEstimatedCardValue) {
                    deleteEstimateMutation({ variables: { id: userEstimate._id! } });
                  } else {
                    createEstimateMutation({
                      variables: {
                        value: card
                      }
                    });
                  }
                }}
              >
                <h3>{card}</h3>
              </div>
            );
          })}
        </div>
      )}
    </>
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

export default EstimationCardStack;
