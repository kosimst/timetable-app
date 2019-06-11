import { css, CSSResult } from 'lit-element'

export const styles: CSSResult = css`
  :host {
    --shadow-transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    --shadow-elevation-2dp: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    --shadow-elevation-3dp: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
      0 1px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 3px -2px rgba(0, 0, 0, 0.4);
    --shadow-elevation-4dp: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
    --shadow-elevation-6dp: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
      0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4);
    --shadow-elevation-8dp: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.4);
    --shadow-elevation-16dp: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
      0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4);

    --inset-shadow-elevation-2dp: inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      inset 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      inset 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    --inset-shadow-elevation-3dp: inset 0 3px 4px 0 rgba(0, 0, 0, 0.14),
      inset 0 1px 8px 0 rgba(0, 0, 0, 0.12),
      inset 0 3px 3px -2px rgba(0, 0, 0, 0.4);
    --inset-shadow-elevation-4dp: inset 0 4px 5px 0 rgba(0, 0, 0, 0.14),
      inset 0 1px 10px 0 rgba(0, 0, 0, 0.12),
      inset 0 2px 4px -1px rgba(0, 0, 0, 0.4);
    --inset-shadow-elevation-6dp: inset 0 6px 10px 0 rgba(0, 0, 0, 0.14),
      inset 0 1px 18px 0 rgba(0, 0, 0, 0.12),
      inset 0 3px 5px -1px rgba(0, 0, 0, 0.4);
    --inset-shadow-elevation-8dp: inset 0 8px 10px 1px rgba(0, 0, 0, 0.14),
      inset 0 3px 14px 2px rgba(0, 0, 0, 0.12),
      inset 0 5px 5px -3px rgba(0, 0, 0, 0.4);
    --inset-shadow-elevation-16dp: inset 0 16px 24px 2px rgba(0, 0, 0, 0.14),
      inset 0 6px 30px 5px rgba(0, 0, 0, 0.12),
      inset 0 8px 10px -5px rgba(0, 0, 0, 0.4);
  }
`
