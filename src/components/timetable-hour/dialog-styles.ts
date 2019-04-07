import { css } from 'lit-element'

export const styles = css`
  :host([opened]) div#dialog {
    transition-property: visibility, width, height, top, left;
    transition-duration: 0ms, 300ms, 300ms, 300ms, 300ms;
    transition-delay: 200ms, 200ms, 200ms, 500ms, 500ms;

    visibility: visible;

    width: 500px;
    height: 300px;

    top: 10%;
    left: calc(50% - 250px);

    box-shadow: var(--shadow-elevation-16dp);
  }

  :host([opened]) > #dialog::before {
    top: -85%;
  }

  #backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;

    background: linear-gradient(-45deg, var(--color), var(--theme-color));
    visibility: hidden;
    opacity: 0;

    transition-property: opacity;
    transition-timing-function: ease-out;
    transition-duration: 500ms;
    transition-delay: 700ms;

    cursor: default;
  }

  :host([opened]) > #backdrop {
    visibility: visible;
    opacity: 0.9;
  }

  #subjectLong {
    color: white;
    position: absolute;

    margin: 0;
    padding-left: 32px;

    line-height: 45px;
    font-size: 0;

    font-weight: 600;
  }

  #subjectLong span {
    opacity: 0;
    font-size: 24px;
  }

  :host([opened]) #subjectLong span {
    animation-name: fade-in;
    animation-duration: 200ms;
    animation-fill-mode: forwards;
    animation-delay: calc(var(--delay) * 10ms + 900ms);
  }

  #dialog {
    position: fixed;
    z-index: 10000;

    top: var(--pos-y);
    left: var(--pos-x);

    width: var(--width);
    height: var(--height);

    border-radius: inherit;

    visibility: hidden;

    cursor: default;

    overflow: hidden;
    background-color: white;
  }

  #dialog::before {
    content: '';
    position: absolute;

    top: 0;
    right: 0;

    width: 100%;
    height: 100%;

    background: linear-gradient(125deg, var(--color), var(--color-brighter))
      white;

    transition-property: top;
    transition-duration: 200ms;
    transition-delay: 800ms;
  }

  #dialog > #container {
    margin-top: calc(300px * 0.15);
    padding: 16px 32px;

    font-size: 20px;
  }

  #dialog > #container > div > span {
    font-weight: 600;
  }
`
