import {
  html,
  css,
  LitElement,
  property,
  TemplateResult,
  CSSResult,
} from 'lit-element'

import 'boxicons'

import { styles as SharedStyles } from '../styles/shared-styles.js'
import { styles as Shadows } from '../styles/shadows.js'

class TimetableSelect extends LitElement {
  @property({ type: String, reflect: true })
  public role: string = 'listbox'

  @property({ type: String, reflect: true })
  public value: string = '1A'

  @property({ type: Boolean, reflect: true })
  private opened: boolean = false

  static styles: CSSResult = css`
    ${SharedStyles}
    ${Shadows}

    :host {
      position: relative;

      display: block;

      width: 80px;
      height: 40px;

      user-select: none;
      cursor: pointer;

      border-radius: 20px;

      background: white;

      transition: var(--shadow-transition), width 0.1s ease-out;
    }

    :host(:hover) {
      width: 120px;
    }

    :host(:hover) #select {
      box-shadow: var(--shadow-elevation-16dp);
    }

    :host(:active) {
      box-shadow: var(--shadow-elevation-6dp);
    }

    :host(:hover) box-icon {
      opacity: 1;
    }

    :host([opened]) {
      width: 120px;
    }

    box-icon {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
      transition: opacity 0.1s ease-out, transform 0.2s ease-out;
      z-index: 3;
      cursor: pointer;
    }

    :host([opened]) box-icon {
      transform: translateY(-50%) rotate(180deg);
    }

    #current {
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 99px;
      border: none;
      outline: none;
      line-height: 40px;
      text-align: center;
      font-family: Poppins;
      font-weight: 700;
      font-size: 14px;
      position: relative;
      z-index: 2;
    }

    #select {
      background: white;
      border-radius: 20px;
      padding-top: 40px;
      position: relative;
      top: -40px;
      text-align: center;
      font-family: Poppins;
      color: grey;
      max-height: 0;
      overflow-y: hidden;
      font-size: 14px;
      transition: max-height 0.3s ease-out;
      box-shadow: var(--shadow-elevation-8dp);
    }

    #select::-webkit-scrollbar {
      display: none;
    }

    :host([opened]) #select {
      max-height: 190px;
      overflow-y: scroll;
      box-shadow: var(--shadow-elevation-8dp);
    }

    option {
      font-weight: 700;
    }
  `

  constructor() {
    super()

    this.addEventListener('blur', () => {
      this._toggle()
    })
  }

  firstUpdated() {
    if (this.shadowRoot) {
      this.shadowRoot.children[2].addEventListener('mousedown', e => {
        e.preventDefault()
      })
    }
  }

  protected render(): TemplateResult {
    return html`
      <input
        id="current"
        .value=${this.value}
        spellcheck="false"
        type="text"
        name="Klasse"
        @click=${({ target }: { target: HTMLInputElement }) => {
          target.select()
        }}
        @keyup=${this._filter}
      />
      <div id="select" role="listbox" @click=${this._changeValue}>
        <slot></slot>
      </div>
      <box-icon name="chevron-down" @click=${this._toggle}></box-icon>
    `
  }

  private _toggle(): void {
    // @ts-ignore
    this.opened ^= true
    if (this.opened) {
      this.shadowRoot!.querySelector('input')!.value = ''
      this.shadowRoot!.querySelector('input')!.focus()
    } else {
      this.shadowRoot!.querySelector('input')!.value = this.value
    }
  }

  private _filter({
    target: { value: query },
  }: {
    target: HTMLInputElement
  }): void {
    this.opened = true

    const children: HTMLOptionElement[] = <HTMLOptionElement[]>(
      (<any>[...this.children])
    )

    children.forEach((el: HTMLOptionElement) => {
      if (
        !(el.value || el.innerText).toLowerCase().includes(query.toLowerCase())
      ) {
        el.setAttribute('hidden', '')
      } else {
        el.removeAttribute('hidden')
      }
    })
  }

  private _changeValue({ target: { value } }: { target: HTMLInputElement }) {
    this.value = value
    this.opened = false

    this.dispatchEvent(new Event('change'))
  }
}

customElements.define('timetable-select', TimetableSelect)
