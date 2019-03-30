import { html, LitElement, property, css } from 'lit-element'

class TimetableHour extends LitElement {
  @property({ type: Number, reflect: true })
  duration: number = 1

  @property({ type: String })
  subjectShort: string = ''

  static styles = css`
    :host {
      display: block;
    }
  `

  protected render() {
    return html`
      ${this.subjectShort}
    `
  }
}

customElements.define('timetable-hour', TimetableHour)
