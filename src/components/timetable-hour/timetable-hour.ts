import { html, LitElement, property, css } from 'lit-element'

import { styles as shadows } from '../styles/shadows.js'
import { styles as dialogStyles } from './dialog-styles.js'

class TimetableHour extends LitElement {
  @property({ type: Number, reflect: true })
  duration: number = 1

  @property({ type: String })
  subjectShort: string = ''

  @property({ type: String })
  subjectLong: string = ''

  @property({ type: String })
  roomShort: string = '?'

  @property({ type: String })
  roomLong: string = '?'

  @property({ type: String })
  teacherShort: string = '?'

  @property({ type: String })
  teacherLong: string = '?'

  @property({ type: String })
  klasseShort: string = '?'

  @property({ type: String })
  color: string = ''

  @property({ type: Boolean, reflect: true })
  opened: boolean = false

  @property({ type: Date })
  date: Date = new Date()

  @property({ type: Number })
  startTime: number = 740

  @property({ type: Number })
  endTime: number = 830

  @property({ type: Boolean })
  cancelled: boolean = false

  @property({ type: Boolean })
  substitution: boolean = false

  static styles = css`
    ${shadows}
    ${dialogStyles}

    :host {
      --margin: 8px;
      display: block;
      width: calc(
        100% / var(--total) - (var(--margin) * (var(--total) - 1)) /
          var(--total)
      );

      margin-left: var(--margin);

      float: left;

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

      height: 100%;
    }

    :host([substitution='true'])::before {
      content: '!';
      position: absolute;

      right: 8px;
      top: 8px;

      height: 24px;
      width: 24px;

      font-weight: 900;

      text-align: center;

      color: white;
      background: #b71c1c;
      border-radius: 99px;
    }

    :host(:first-child) {
      margin-left: 0;
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

    :host([duration='1']:hover) #cell::after {
      width: calc(20% + ((var(--total) - 1) * 15%));
      transform: skew(calc(10deg - ((var(--total) - 1) * 3deg)));

      box-shadow: var(--shadow-elevation-3dp);
    }

    #cell::after {
      content: '';
      position: absolute;

      left: -12px;
      top: 0;

      width: calc(28px - ((var(--total) - 1) * 4px));
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
      color: #0000;

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

    :host([opened]) > div#cell {
      visibility: hidden;

      box-shadow: none;
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
      <div
        id="cell"
        @click="${() => {
          this.opened = true
          const e = new CustomEvent('hour-opened', {
            bubbles: true,
          })
          this.dispatchEvent(e)
        }}"
      >
        <span id="teacherShort"
          >${this.teacherShort.split(', ')[0] +
            (this.teacherShort.split(', ').length > 1
              ? `+${this.teacherShort.split(', ').length - 1}`
              : '')}</span
        >
        <span id="subjectShort">${this.subjectShort || '…'}</span>
        <span id="roomShort">${this.roomShort}</span>
      </div>

      <div id="dialog">
        <h1 id="subjectLong">
          ${(this.subjectLong || this.subjectShort).split('').map(
            (letter, i) => html`
              <span style="--delay: ${i}"
                >${letter === ' ' ? ' ' : letter}</span
              >
            `,
          )}
        </h1>
        <div id="container">
          <div id="timeLong">
            <span>Zeit: </span>
            am
            ${['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'][
              this.date.getDay() - 1
            ]}
            von
            ${String(this.startTime).slice(0, -2)}:${String(
              this.startTime,
            ).slice(-2)}
            bis
            ${String(this.endTime).slice(0, -2)}:${String(this.endTime).slice(
              -2,
            )}
          </div>
          <div id="teacherLong">
            <span>Lehrer: </span>
            <a>${this.teacherLong}</a>
          </div>
          <div id="teacherLong">
            <span>Klassen: </span>
            <a>${this.klasseShort}</a>
          </div>
          <div id="roomLong">
            <span>Raum: </span>
            <a>${this.roomLong}</a>
          </div>
          <hr />
          <div id="infos">
            <span>Infos: </span>
            keine zusätzlichen Informationen
          </div>
        </div>
      </div>
      <div
        id="backdrop"
        @click="${() => {
          this.opened = false

          const e = new CustomEvent('hour-closed', {
            bubbles: true,
          })
          this.dispatchEvent(e)
        }}"
      ></div>
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
