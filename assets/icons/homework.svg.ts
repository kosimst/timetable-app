import { svg, SVGTemplateResult, LitElement, css } from 'lit-element'

customElements.define(
  'icon-homework',
  class IconHomework extends LitElement {
    private paths: SVGPathElement[] = []

    static styles = css`
      :host(.hover) svg > * {
        stroke-dashoffset: var(--length) !important;
      }

      :host(.hover:hover) svg > *, :host(.hover.active) svg > * {
        stroke-dashoffset: 0 !important;
      }
    `

    render(): SVGTemplateResult {
      return svg`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path class="a" d="M7.218,21.028,2.975,16.786l15.4-15.4a3,3,0,0,1,4.242,4.242Z"/>
        <path class="a" d="M18.351,1.409l-.326-.326a2,2,0,0,0-2.828,0L11.308,4.972"/>
        <line class="a" x1="14.136" y1="5.624" x2="18.379" y2="9.867"/>
        <polygon class="a" points="2.975 16.786 0.5 23.503 7.218 21.028 2.975 16.786"/></svg>
      `
    }

    firstUpdated() {
      if (this.shadowRoot) {
        this.paths = [
          ...this.shadowRoot.children[0].children,
        ] as SVGPathElement[]

        this.paths.forEach(path => {
          path.style.setProperty('--length', `${path.getTotalLength()}`)
        })
      }
    }

    paint(duration: number) {
      this.paths.forEach(path => {
        const length = path.getTotalLength()
        path.style.transition = path.style.transition = 'none'
        path.style.strokeDasharray = `${length} ${length}`
        path.style.strokeDashoffset = `${length}`
        path.getBoundingClientRect()
        path.style.transition = path.style.transition = `stroke-dashoffset ${duration}ms ease-in-out`
        path.style.strokeDashoffset = '0'
      })
    }
  },
)
