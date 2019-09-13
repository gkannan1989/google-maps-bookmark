import { injectGlobal } from 'styled-components';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import theme from 'constants/theme';
import uiKit from 'components/Globals/styles';
import './resources/css/font.css';
import './resources/css/onsenui-rtl.css';
import './resources/css/icons.css';

/* eslint no-unused-expressions: 0 */
injectGlobal`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        line-height: 1;
        overflow: auto;
        position: unset;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    html {
        direction: ltr;
        text-align: left;
        font-size: 62%;
        font-family: ${theme.defaultFont};
    }
    html * {
        font-family: inherit;
    }
    ${uiKit}
`;
