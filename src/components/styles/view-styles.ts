import { css, CSSResult } from 'lit-element'

export const styles: CSSResult = css`
  :host {
    display: block;

    width: 100%;
    height: 100%;
  }

  h1#title {
    color: white;

    margin: 0;
    height: fit-content;

    font-size: 72px;
    font-weight: 500;
    font-family: Pacifico;
  }
`
