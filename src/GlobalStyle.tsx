//GlobalStyle.tsx
import { createGlobalStyle } from 'styled-components';
// import LINESeedKRBd from '../src/fonts/LINESeedKRBd.ttf';
// import LINESeedKRRg from '../src/fonts/LINESeedKRRg.ttf';
// import LINESeedKRTh from '../src/fonts/LINESeedKRTh.ttf';

const GlobalStyle = createGlobalStyle`
*{
	box-sizing: border-box;
}
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
	font: inherit;
	vertical-align: baseline;
	font-size: 62.5%;
	font-family: 'Inria Sans';
}
body {
	margin: 0 auto;
	width: 50rem;
	height: 100vh;
}

#root {
	height:100%;
}`;

// @media (max-width: 1023px) {//데스크탑
// html { font-size: 62.5% } //10px
// }

// @media (max-width: 767px) { // 태블릿
// 	html { font-size: 50%; }  //8px
// }

// @media (max-width: 639px) { // 모바일
// 	html { font-size: 37.5%; } //6px
// }

export default GlobalStyle;
