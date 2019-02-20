import { LitElement, html, css, property } from 'lit-element';

class SnackBar extends LitElement {
  @property({type: Boolean})
  active = false;

  static styles = [
    css`
      :host {
        display: block;
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        padding: 12px;
        background-color: var(--app-secondary-color);
        color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        text-align: center;
        will-change: transform;
        transform: translate3d(0, 0, 0);
        transition-property: visibility, transform;
        transition-duration: 0.2s;
        visibility: hidden;
      }

      :host([active]) {
        visibility: visible;
        transform: translate3d(0, -100%, 0);
      }

      @media (min-width: 460px) {
        :host {
          width: 320px;
          margin: auto;
        }
      }
    `
  ];

  protected render() {
    return html`
      <slot></slot>
    `;
  }
}

customElements.define('snack-bar', SnackBar);
