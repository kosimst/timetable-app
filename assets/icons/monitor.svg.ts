import { svg, SVGTemplateResult, LitElement, css } from 'lit-element'

customElements.define(
  'icon-monitor',
  class IconMonitor extends LitElement {
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect class="a" x="0.5" y="2" width="23" height="17" rx="1" ry="1"/><line class="a" x1="7" y1="22" x2="17" y2="22"/><line class="a" x1="10.5" y1="19" x2="10.5" y2="22"/><line class="a" x1="13.5" y1="19" x2="13.5" y2="22"/><path class="a" d="M12.894,11.331,18.428,8.96a.5.5,0,0,0,0-.92L12.894,5.669a1,1,0,0,0-.788,0L5.5,8.5l6.606,2.831A1,1,0,0,0,12.894,11.331Z"/><path class="a" d="M8.5,9.786v3.405a.5.5,0,0,0,.276.447l3.277,1.638a1,1,0,0,0,.894,0l3.277-1.638a.5.5,0,0,0,.276-.447V9.786"/><line class="a" x1="5.5" y1="8.5" x2="5.5" y2="12"/><path class="a" d="M5.5,12,4.127,15.662A.249.249,0,0,0,4.361,16H6.639a.249.249,0,0,0,.234-.338L5.5,12"/></svg>
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
