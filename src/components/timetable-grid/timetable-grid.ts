import { html, LitElement, css, unsafeCSS as cssLiteral } from 'lit-element'

class TimetableGrid extends LitElement {
  static styles = css`
    :host {
      display: grid;

      grid-template-columns: repeat(5, 1fr);
      grid-auto-rows: 80px;

      grid-gap: 12px;
    }

    /* Align per day */
    ${cssLiteral(
      [...Array(5)]
        .map(
          (_, i) => css`
          ::slotted(timetable-hour[day="${cssLiteral(i)}"]) {
            grid-column-start: ${cssLiteral(i + 1)};
          }
        `,
        )
        .join(' '),
    )}

    /* Align per hour */
    ${cssLiteral(
      [...Array(5)]
        .map(
          (_, i) => css`
          ::slotted(timetable-hour[hour="${cssLiteral(i)}"]) {
            grid-row-start: ${cssLiteral(i + 1)};
          }
        `,
        )
        .join(' '),
    )}
  `

  protected render() {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('timetable-grid', TimetableGrid)
