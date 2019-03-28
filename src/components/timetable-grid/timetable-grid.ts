import { html, LitElement, css } from 'lit-element'

class TimetableGrid extends LitElement {
  static styles = css`
    :host {
      display: grid;
    }
  `

  protected render() {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('timetable-grid', TimetableGrid)
