import { css } from 'lit-element';

export const sharedStyles = css`
  .column {
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .placeholder {
    opacity: 0.6;
    text-align: center;
  }

  .fill {
    flex: 1;
  }

  .center-content {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .item {
    margin-bottom: 16px;
  }

  .padding {
    padding: 24px;
  }

  .title {
    font-size: 20px;
  }

  .vertical-divider {
    width: 1px;
    opacity: 0.5;
    background-color: black;
    opacity: 0.1;
    margin: 24px 0;
  }
`;
