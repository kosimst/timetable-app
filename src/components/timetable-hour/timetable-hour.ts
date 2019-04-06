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

      box-shadow: var(--shadow-elevation-6dp);
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

      background: linear-gradient(125deg, var(--color), var(--color-brighter))
        white;

      border-radius: inherit;

      visibility: hidden;

      transition-property: visibility, width, height, top, left;
      transition-duration: 0ms, 400ms, 400ms, 300ms, 300ms;
      transition-delay: 200ms, 200ms, 200ms, 600ms, 600ms;

      cursor: default;
    }

    :host(.unload) {
      opacity: 1;
      animation-name: fade-out;
      animation-duration: 300ms;
      animation-fill-mode: forwards;
      animation-delay: calc(var(--highest) * 50ms - var(--delay) * 50ms);
    }

    :host([opened]) {
      z-index: 9999;
    }

    :host([opened]) div#cell::after {
      width: 110%;
    }

    :host([opened]) div#dialog {
      visibility: visible;

      width: 400px;
      height: 600px;

      top: 10%;
      left: calc(50% - 200px);
    }

    :host([opened]) > div#cell {
      visibility: hidden;

      box-shadow: none;
    }
  `

  constructor() {
    super()

    this.addEventListener('click', () => {
      this.opened = true
    })
  }

  firstUpdated() {
    const { left, top, width, height } = this.getBoundingClientRect()

    this._updatePosition(left, top, width, height)
  }

  protected render() {
    return html`
      <div id="cell">
        <span id="teacherShort">GUE</span>
        <span id="subjectShort">${this.subjectShort}</span>
        <span id="roomShort">R7C</span>
      </div>

      <div id="dialog"></div>
    `
  }

  _updatePosition(x: number, y: number, width: number, height: number) {
    this.style.setProperty('--pos-x', `${x}px`)
    this.style.setProperty('--pos-y', `${y}px`)

    this.style.setProperty('--width', `${width}px`)
    this.style.setProperty('--height', `${height}px`)
  }
}

customElements.define('timetable-hour', TimetableHour)
