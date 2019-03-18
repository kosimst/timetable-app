import {
  html,
  css,
  LitElement,
  property,
  TemplateResult,
  CSSResult,
} from 'lit-element'

import '@polymer/paper-ripple/paper-ripple.js'

import { styles as SharedStyles } from '../styles/shared-styles.js'
import { styles as Shadows } from '../styles/shadows.js'

class TimetableToggle extends LitElement {
  @property({ type: String, reflect: true })
  public role: string = 'switch'

  @property({ type: Boolean, reflect: true, attribute: true })
  public active: boolean = true

  @property({ type: String })
  public on: string = 'On'

  @property({ type: String })
  public off: string = 'Off'

  static styles: CSSResult = css`
    ${SharedStyles}
    ${Shadows}

    :host {
      --padding: 4px;
      --duration: 0.3s;

      position: relative;

      display: block;

      width: 160px;
      height: 40px;

      user-select: none;
      cursor: pointer;

      border-radius: 20px;

      background: white;

      box-shadow: var(--shadow-elevation-8dp);
      transition: var(--shadow-transition);
    }

    :host(:hover) {
      box-shadow: var(--shadow-elevation-16dp);
    }

    :host(:active) {
      box-shadow: var(--shadow-elevation-6dp);
    }

    #toggler {
      position: absolute;

      top: var(--padding);
      left: var(--padding);

      width: calc(50% - var(--padding) * 2);
      height: calc(100% - var(--padding) * 2);

      border-radius: 99px;

      background: var(--theme-second-gradient);

      animation: slide-out;
      animation-fill-mode: forwards;
      animation-duration: var(--duration);
      animation-timing-function: ease-in-out;
    }

    div {
      position: relative;

      width: 50%;

      float: left;

      font-family: Poppins;
      font-weight: 700;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
      color: white;
    }

    #off {
      color: black;
    }

    #on {
      transition: color 0.2s var(--duration) ease-out;
    }

    :host([active]) #on {
      color: black;
    }

    :host([active]) #off {
      color: white;

      transition: color 0.2s var(--duration) ease-out;
    }

    :host([active]) #toggler {
      animation: slide;
      animation-fill-mode: forwards;
      animation-duration: var(--duration);
      animation-timing-function: ease-out;
    }

    @keyframes slide {
      0% {
        left: 3px;
        width: 77px;
      }
      50% {
        left: 3px;
        width: 157px;
      }
      100% {
        left: 80px;
        width: 77px;
      }
    }

    @keyframes slide-out {
      0% {
        left: 80px;
        width: 77px;
      }
      50% {
        left: 3px;
        width: 157px;
      }
      100% {
        left: 3px;
        width: 77px;
      }
    }
  `

  constructor() {
    super()

    this.addEventListener('click', () => {
      // @ts-ignore
      this.active ^= true
    })
  }

  protected render(): TemplateResult {
    return html`
      <paper-ripple></paper-ripple>
      <div id="toggler"></div>
      <div id="on">${this.on}</div>
      <div id="off">${this.off}</div>
    `
  }
}

customElements.define('timetable-toggle', TimetableToggle)
