import { svg, SVGTemplateResult, LitElement, css } from 'lit-element'

customElements.define(
  'icon-student',
  class IconStudent extends LitElement {
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
          <path class="a" d="M13.5,13a2.5,2.5,0,0,1-3,0"/>
          <path class="a" d="M23,23.5V22.394a1.976,1.976,0,0,0-.77-1.579C20.9,19.8,17.73,18,12,18S3.105,19.8,1.77,20.815A1.976,1.976,0,0,0,1,22.394V23.5"/>
          <path class="a" d="M14,10.25a.25.25,0,1,1-.25.25.25.25,0,0,1,.25-.25"/>
          <path class="a" d="M10,10.25a.25.25,0,1,1-.25.25.25.25,0,0,1,.25-.25"/>
          <path class="a" d="M6,4.136V10.5a6,6,0,0,0,12,0V4.136"/>
          <path class="a" d="M12.222.55l9.705,2.206a.25.25,0,0,1,0,.488l-9.7,2.206a1.008,1.008,0,0,1-.444,0l-9.7-2.206a.25.25,0,0,1,0-.488L11.778.55A1.008,1.008,0,0,1,12.222.55Z"/>
          <path class="a" d="M6,7.5s1.5,1,6,1,6-1,6-1"/><line class="a" x1="2" y1="3.216" x2="2" y2="8.498"/>
          <path class="a" d="M3,12.5a7.17,7.17,0,0,0-1-4,7.17,7.17,0,0,0-1,4Z"/>
          <path class="a" d="M17.17,18.569l-4.825,4.6a.5.5,0,0,1-.69,0l-4.825-4.6"/>
        </svg>
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
        path.style.transition = path.style.transition =
          `stroke-dashoffset ${duration}ms ease-in-out`
        path.style.strokeDashoffset = '0'
      })
    }
  },
)
