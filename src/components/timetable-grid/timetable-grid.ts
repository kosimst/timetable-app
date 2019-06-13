import { html, LitElement, css, unsafeCSS as cssLiteral, property } from 'lit-element'

class TimetableGrid extends LitElement {
  static styles = css`
    :host {
      display: grid;

      grid-template-columns: repeat(5, 1fr);
      grid-auto-rows: 80px;

      grid-gap: 12px;

      overflow: scroll;
      padding-bottom: 5%;
      padding-top: 5%;

      position: relative;
      top: -5%;

      height: 95%;

      -webkit-mask-image: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%);
    }

    :host([data-hour-opened]) {
      -webkit-mask-image: none;
    }

    :host::-webkit-scrollbar {
      display: none;
    }

    /* Align per day */
    ${cssLiteral(
      [...Array(5)]
        .map(
          (_, i) => css`
          ::slotted(div[day="${cssLiteral(i)}"]) {
            grid-column-start: ${cssLiteral(i + 1)};
          }
        `,
        )
        .join(' '),
    )}

    /* Align per hour */
    ${cssLiteral(
      [...Array(12)]
        .map(
          (_, i) => css`
          ::slotted(div[hour="${cssLiteral(i)}"]) {
            grid-row-start: ${cssLiteral(i + 1)};
          }
        `,
        )
        .join(' '),
    )}
  `

  constructor() {
    super()

    this.addEventListener('hour-opened', () => {
      this.setAttribute('data-hour-opened', '')
    })

    this.addEventListener('hour-closed', () => {
      this.removeAttribute('data-hour-opened')
    })
  }

  protected render() {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('timetable-grid', TimetableGrid)
