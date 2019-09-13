import { lighten, darken } from 'polished';
import theme from '../../constants/theme';

// dynamic padding and margins
// 0 - 10rem range for padding and -10 - 10 range for margins
let margin = '';
let padding = '';
for (let i = 0; i <= 20; i += 1) {
  padding += `
        .p-${i} {
            padding: ${i}rem !important;
        }
        .pt-${i} {
            padding-top: ${i}rem !important;
        }
        .pr-${i} {
            padding-right: ${i}rem !important;
        }
        .pb-${i} {
            padding-bottom: ${i}rem !important;
        }
        .pl-${i} {
            padding-left: ${i}rem !important;
        }
    `;
  margin += `
        .m-${i} {
            margin: ${i}rem !important;
        }
        .mt-${i} {
            margin-top: ${i}rem !important;
        }
        .mr-${i} {
            margin-right: ${i}rem !important;
        }
        .mb-${i} {
            margin-bottom: ${i}rem !important;
        }
        .ml-${i} {
            margin-left: ${i}rem !important;
        }
        .-m-${i} {
            margin: -${i}rem !important;
        }
        .-mt-${i} {
            margin-top: -${i}rem !important;
        }
        .-mr-${i} {
            margin-right: -${i}rem !important;
        }
        .-mb-${i} {
            margin-bottom: -${i}rem !important;
        }
        .-ml-${i} {
            margin-left: -${i}rem !important;
        }
    `;
}
const textAligns = `
  .text-center {
    text-align: center !important;
  }
  .text-left {
    text-align: left !important;
  }
  .text-right {
    text-align: right !important;
  }
  .text-justify {
    text-align: justify !important;
  }
`;
const displays = `
  .d-block {
    display: block !important;
  }
  .d-inline {
    display: inline !important;
  }
  .d-inline-block {
    display: inline-block !important;
  }
  .d-none {
    display: none !important;
  }
`;
const positions = `
  .p-relative {
    position: relative;
  }
  .p-absolute {
    position: absolute;
  }
  .p-fixed {
    position: fixed;
  }
  .p-sticky {
    position: sticky;
  }
  .p-static {
    position: static;
  }
`;

const colorful = `
  .text-primary {
    color: ${theme.colors.primary} !important;
    &.lighten {
      color: ${lighten(0.4, theme.colors.primary)} !important;
    }
    &.darken {
      color: ${darken(0.4, theme.colors.primary)} !important;
    }
  }
  .text-success {
    color: ${theme.colors.success} !important;
    &.lighten {
      color: ${lighten(0.4, theme.colors.success)} !important;
    }
    &.darken {
      color: ${darken(0.4, theme.colors.success)} !important;
    }
  }
  .text-primary-brand-color {
    color: ${theme.colors.primaryBrandColor} !important;
    &.lighten {
      color: ${lighten(0.4, theme.colors.primaryBrandColor)} !important;
    }
    &.darken {
      color: ${darken(0.4, theme.colors.primaryBrandColor)} !important;
    }
  }
  .text-secondary-brand-color {
    color: ${theme.colors.secondaryBrandColor} !important;
    &.lighten {
      color: ${lighten(0.4, theme.colors.secondaryBrandColor)} !important;
    }
    &.darken {
      color: ${darken(0.4, theme.colors.secondaryBrandColor)} !important;
    }
  }
  .text-green {
    color: ${theme.colors.green} !important;
    &.lighten {
      color: ${lighten(0.4, theme.colors.green)} !important;
    }
    &.darken {
      color: ${darken(0.4, theme.colors.green)} !important;
    }
  }
  .text-warning {
    color: ${theme.colors.warning} !important;
    &.lighten {
      color: ${lighten(0.4, theme.colors.warning)} !important;
    }
    &.darken {
      color: ${darken(0.4, theme.colors.warning)} !important;
    }
  }
  .text-gray {
    color: ${theme.colors.gray} !important;
    &.lighten {
      color: ${lighten(0.4, theme.colors.gray)} !important;
    }
    &.darken {
      color: ${darken(0.4, theme.colors.gray)} !important;
    }
  }
  .text-danger {
    color: ${theme.colors.danger} !important;
    &.lighten {
      color: ${lighten(0.4, theme.colors.danger)} !important;
    }
    &.darken {
      color: ${darken(0.4, theme.colors.danger)} !important;
    }
  }
  .text-orange {
    color: ${theme.colors.orange} !important;
    &.lighten {
      color: ${lighten(0.4, theme.colors.orange)} !important;
    }
    &.darken {
      color: ${darken(0.4, theme.colors.orange)} !important;
    }
  }
  .text-pink {
    color: ${theme.colors.pink} !important;
    &.lighten {
      color: ${lighten(0.4, theme.colors.pink)} !important;
    }
    &.darken {
      color: ${darken(0.4, theme.colors.pink)} !important;
    }
  }
  .text-bluish-green {
    color: ${theme.colors.blueishGreen} !important;
    &.lighten {
      color: ${lighten(0.4, theme.colors.blueishGreen)} !important;
    }
    &.darken {
      color: ${darken(0.4, theme.colors.blueishGreen)} !important;
    }
  }
  .bg-primary {
    background-color: ${theme.colors.primary} !important;
    &.lighten {
      background-color: ${lighten(0.4, theme.colors.primary)} !important;
    }
    &.darken {
      background-color: ${darken(0.4, theme.colors.primary)} !important;
    }
  }
  .bg-success {
    background-color: ${theme.colors.success} !important;
    &.lighten {
      background-color: ${lighten(0.4, theme.colors.success)} !important;
    }
    &.darken {
      background-color: ${darken(0.4, theme.colors.success)} !important;
    }
  }
  .bg-warning {
    background-color: ${theme.colors.warning} !important;
    &.lighten {
      background-color: ${lighten(0.4, theme.colors.warning)} !important;
    }
    &.darken {
      background-color: ${darken(0.4, theme.colors.warning)} !important;
    }
  }
  .bg-danger {
    background-color: ${theme.colors.danger} !important;
    &.lighten {
      background-color: ${lighten(0.4, theme.colors.danger)} !important;
    }
    &.darken {
      background-color: ${darken(0.4, theme.colors.danger)} !important;
    }
  }
  .bg-white {
    background-color: ${theme.colors.white}!important;
  }
`;

const typography = `
  .font-default{
    font-family:  ${theme.defaultFont};
    * {
      font-family: inherit !important;
    }
  }
  .line-through {
    text-decoration: line-through;
  }
`;

const loading = `
  .block-ui-loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    z-index: 10000;
  }
  .block-ui-loader > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .block-ui-loader > div > span {
    font-size: calc(${theme.defaultRem} * 3);
    width: calc(${theme.defaultRem} * 3);
    height: calc(${theme.defaultRem} * 3);
    color: ${theme.colors.primaryBrandColor};
    animation: spinner 1s infinite;
    display: inline-block;
  }
  .spinner {
    animation: spinner 1s infinite;
  }
`;
const additionalClasses = `
  .no-border {
    border: none !important;
  }
  ons-alert-dialog {
    position: fixed !important;
  }
  .light-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 101;
  }
  .spinner {
    animation: spinner infinite linear 1s;
  }
`;
const keyframes = `
  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes show {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
const animatedRouter = `
    .slide-enter-done, .slide-enter-active {
      transition: all 150ms ease-out;
    }
    .slide-enter-done {
      transform: translateX(0%);
    }
    .slide-enter-active {
      transform: translateX(100%);
    }
`;

const uiKit = `
    ${margin}
    ${padding}
    ${textAligns}
    ${colorful}
    ${displays}
    ${positions}
    ${typography}
    ${loading}
    ${additionalClasses}
    ${keyframes}
    ${animatedRouter}
`;
export default uiKit;
