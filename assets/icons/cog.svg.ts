import { svg, SVGTemplateResult, LitElement, css } from 'lit-element'

class IconCog extends LitElement {
  private paths: SVGPathElement[] = []

  static styles = css`
    :host(.hover) svg > * {
      stroke-dashoffset: var(--length) !important;
    }

    :host(.hover:hover) svg > *,
    :host(.hover.active) svg > * {
      stroke-dashoffset: 0 !important;
    }
  `

  render(): SVGTemplateResult {
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path class="a" d="M20.254,13.5H22.5a1,1,0,0,0,1-1v-1a1,1,0,0,0-1-1H20.253a11.8,11.8,0,0,0-1-2.922L20.839,5.99a1,1,0,0,0,0-1.414L19.424,3.161a1,1,0,0,0-1.414,0L16.42,4.75a11.769,11.769,0,0,0-2.92-1V1.5a1,1,0,0,0-1-1h-1a1,1,0,0,0-1,1V3.748a11.777,11.777,0,0,0-2.921,1L5.989,3.161a1,1,0,0,0-1.414,0L3.16,4.576a1,1,0,0,0,0,1.414L4.75,7.579a11.821,11.821,0,0,0-1,2.921H1.5a1,1,0,0,0-1,1v1a1,1,0,0,0,1,1H3.746a11.821,11.821,0,0,0,1,2.921l-1.59,1.59a1,1,0,0,0,0,1.414l1.415,1.414a1,1,0,0,0,1.414,0l1.589-1.589A11.8,11.8,0,0,0,10.5,20.254V22.5a1,1,0,0,0,1,1h1a1,1,0,0,0,1-1V20.254a11.8,11.8,0,0,0,2.92-1l1.591,1.589a1,1,0,0,0,1.414,0l1.414-1.414a1,1,0,0,0,0-1.414l-1.589-1.59A11.821,11.821,0,0,0,20.254,13.5Z"/>
        <path d="M7.5,12a4.5,4.5 0 1,0 9,0a4.5,4.5 0 1,0 -9,0">
      </svg>
    `
  }

  firstUpdated() {
    if (this.shadowRoot) {
      this.paths = [...this.shadowRoot.children[0].children] as SVGPathElement[]

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
}

customElements.define('icon-cog', IconCog)
