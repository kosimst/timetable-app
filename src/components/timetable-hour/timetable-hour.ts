import { html, LitElement, property, css } from 'lit-element'

import { styles as shadows } from '../styles/shadows.js'

class TimetableHour extends LitElement {
  @property({ type: Number, reflect: true })
  duration: number = 1

  @property({ type: String })
  subjectShort: string = ''

  @property({ type: String })
  color: string = ''

  @property({ type: Boolean, reflect: true })
  opened: boolean = false

  static styles = css`
    ${shadows}

    :host {
      display: block;
      width: 100%;

      border-radius: 8px;

      box-shadow: var(--shadow-elevation-6dp);
      background: white;

      position: relative;

      user-select: none;

      opacity: 0;

      animation-name: fade-in;
      animation-duration: 300ms;
      animation-fill-mode: forwards;
      animation-delay: calc(var(--delay) * 50ms);

      cursor: pointer;

      transition: var(--shadow-transition);
    }

    #cell {
      overflow: hidden;

      width: 100%;
      height: 100%;

      position: relative;

      border-radius: inherit;

      transition-property: visibility;
      transition-duration: 0ms;
      transition-delay: 200ms;
    }

    :host(:hover) {
      box-shadow: var(--shadow-elevation-16dp);
    }

    :host(:hover) #cell::after {
      width: 20%;
      transform: skew(10deg);

      box-shadow: var(--shadow-elevation-3dp);
    }

    #cell::after {
      content: '';
      position: absolute;

      left: -12px;
      top: 0;

      width: 28px;
      height: 100%;

      transition: width 200ms ease-out, transform 300ms ease-out,
        var(--shadow-transition);
      transform: skew(0deg);
      box-shadow: none;

      background: linear-gradient(125deg, var(--color), var(--color-brighter))
        white;
    }

    #subjectShort {
      position: absolute;

      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      font-size: 20px;
      font-weight: 600;
    }

    #roomShort,
    #teacherShort {
      position: absolute;

      top: 50%;

      transform: translate(-50%, -50%);

      font-size: 16px;
      color: white;

      transition: color 300ms ease-out;
    }

    :host(:hover) #roomShort,
    :host(:hover) #teacherShort {
      color: grey;
    }

    #teacherShort {
      left: 30%;
    }

    #roomShort {
      left: 69%;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fade-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
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

    #dialog::after {
      content: '';
      position: absolute;

      top: 0;
      right: 0;

      width: 100%;
      height: 100%;

      background: linear-gradient(125deg, var(--color), var(--color-brighter))
        white;
    }

    :host(.unload) {
      opacity: 1;
      animation-name: fade-out;
      animation-duration: 300ms;
      animation-fill-mode: forwards;
      animation-delay: calc(var(--highest) * 50ms - var(--delay) * 50ms);
    }

    :host([opened]) {
      z-index: 9998;
    }

    :host([opened]) div#cell::after {
      width: 110%;
    }

    :host([opened]) div#dialog {
      transition-property: visibility, width, height, top, left;
      transition-duration: 0ms, 400ms, 400ms, 300ms, 300ms;
      transition-delay: 200ms, 200ms, 200ms, 600ms, 600ms;

      visibility: visible;

      width: 400px;
      height: 600px;

      top: 10%;
      left: calc(50% - 200px);

      box-shadow: var(--shadow-elevation-16dp);
    }

    :host([opened]) > div#cell {
      visibility: hidden;

      box-shadow: none;
    }

    :host([opened]) > #dialog::after {
      animation: color-move;
      animation-duration: 300ms;
      animation-delay: 900ms;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;
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
      transition-delay: 800ms;

      cursor: default;
    }

    :host([opened]) > #backdrop {
      visibility: visible;
      opacity: 0.9;
    }

    @keyframes color-move {
      0% {
        top: 0;
        transform: none;
      }

      50% {
        top: -78%;
        transform: skewY(-20deg);
      }

      100% {
        top: -90%;
        transform: none;
      }
    }
  `

  constructor() {
    super()

    // @ts-ignore
    const observer = new MutationObserver(this._updatePosition.bind(this))

    observer.observe(this, {
      attributes: true,
      attributeFilter: ['style'],
    })
  }

  firstUpdated() {
    this._updatePosition()
  }

  protected render() {
    return html`
      <div id="cell" @click="${() => (this.opened = true)}">
        <span id="teacherShort">GUE</span>
        <span id="subjectShort">${this.subjectShort}</span>
        <span id="roomShort">R7C</span>
      </div>

      <div id="dialog"></div>
      <div id="backdrop" @click="${() => (this.opened = false)}"></div>
    `
  }

  _updatePosition([entry]: [MutationRecord | null] = [null]) {
    if (
      !entry ||
      (entry.attributeName === 'style' &&
        !this.style.getPropertyValue('--width'))
    ) {
      const { left, top, width, height } = this.getBoundingClientRect()

      this._updateVars(left, top, width, height)
    }
  }

  _updateVars(x: number, y: number, width: number, height: number) {
    this.style.setProperty('--pos-x', `${x}px`)
    this.style.setProperty('--pos-y', `${y}px`)

    this.style.setProperty('--width', `${width}px`)
    this.style.setProperty('--height', `${height}px`)
  }
}

customElements.define('timetable-hour', TimetableHour)
