// Copyright (c) 2020 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ⚡️ DANGER ZONE ⚡️
// ================
// 

// The shell cache keeps "landmark" resources, like CSS and JS, web fonts, etc.
// which won't change between content updates.
// 
// 
const SHELL_CACHE = "shell-9.0.5--v7--sw/hj-test/";

// A separate assets cache that won't be invalidated when there's a newer version of Hydejack.
// NOTE: Whenever you make changes to any of the files in yor `assets` folder,
//       increase the cache number, otherwise the changes will *never* be visible to returning visitors.
const ASSETS_CACHE = "assets--v7--sw/hj-test/";

// The cache for regular content, which will be invalidated every time you make a new build.
const CONTENT_CACHE = "content--2020-10-24T06:45:57+00:00--sw/hj-test/";

// A URL search parameter you can add to external assets to cache them in the service worker.
const SW_CACHE_SEARCH_PARAM = "sw-cache";
const NO_CACHE_SEARCH_PARAM = "no-cache";

// The regular expression used to find URLs in webfont style sheets.
const RE_CSS_URL = /url\s*\(['"]?(([^'"\\]|\\.)*)['"]?\)/u;

const ICON_FONT = "/hj-test/assets/icomoon/style.css";
const KATEX_FONT = "/hj-test/assets/bower_components/katex/dist/katex.min.css";

// 
// 
const GOOGLE_FONTS = "https://fonts.googleapis.com/css?family=Roboto+Slab:700%7CNoto+Sans:400,400i,700,700i&display=swap";
// 

const SHELL_FILES = [
  "/hj-test/assets/css/hydejack-9.0.5.css",
  "/hj-test/assets/js/search-worker-9.0.5.js",
  "/hj-test/assets/js/service-worker.js",
];

const STATIC_FILES = [
  /**/"/hj-test/README.md",
  /**/"/hj-test/assets/img/blog/COLOURlovers.com-Hydejack.png",
  /**/"/hj-test/assets/img/blog/blog-layout.jpg",
  /**/"/hj-test/assets/img/blog/caleb-george-old.jpg",
  /**/"/hj-test/assets/img/blog/caleb-george.jpg",
  /**/"/hj-test/assets/img/blog/cover-page.jpg",
  /**/"/hj-test/assets/img/blog/dark-mode-ii.jpg",
  /**/"/hj-test/assets/img/blog/dark-mode.jpg",
  /**/"/hj-test/assets/img/blog/example-content-ii.jpg",
  /**/"/hj-test/assets/img/blog/example-content-iii.jpg",
  /**/"/hj-test/assets/img/blog/example-content-iii@0,25x.jpg",
  /**/"/hj-test/assets/img/blog/example-content-iii@0,5x.jpg",
  /**/"/hj-test/assets/img/blog/grid.jpg",
  /**/"/hj-test/assets/img/blog/hydejack-8.jpg",
  /**/"/hj-test/assets/img/blog/hydejack-8.png",
  /**/"/hj-test/assets/img/blog/hydejack-8@0,25x.jpg",
  /**/"/hj-test/assets/img/blog/hydejack-8@0,25x.png",
  /**/"/hj-test/assets/img/blog/hydejack-8@0,5x.jpg",
  /**/"/hj-test/assets/img/blog/hydejack-8@0,5x.png",
  /**/"/hj-test/assets/img/blog/hydejack-9-dark.jpg",
  /**/"/hj-test/assets/img/blog/hydejack-9-dark@0,25x.jpg",
  /**/"/hj-test/assets/img/blog/hydejack-9-dark@0,5x.jpg",
  /**/"/hj-test/assets/img/blog/hydejack-9.jpg",
  /**/"/hj-test/assets/img/blog/hydejack-9@0,25x.jpg",
  /**/"/hj-test/assets/img/blog/hydejack-9@0,5x.jpg",
  /**/"/hj-test/assets/img/blog/lazy-images.jpg",
  /**/"/hj-test/assets/img/blog/louis-hansel.jpg",
  /**/"/hj-test/assets/img/blog/louis-hansel@0,25x.jpg",
  /**/"/hj-test/assets/img/blog/louis-hansel@0,5x.jpg",
  /**/"/hj-test/assets/img/blog/resume.png",
  /**/"/hj-test/assets/img/blog/steve-harvey.jpg",
  /**/"/hj-test/assets/img/blog/steve-harvey@0,125x.jpg",
  /**/"/hj-test/assets/img/blog/steve-harvey@0,25x.jpg",
  /**/"/hj-test/assets/img/blog/steve-harvey@0,5x.jpg",
  /**/"/hj-test/assets/img/blog/w3m.png",
  /**/"/hj-test/assets/img/blog/wade-lambert.jpg",
  /**/"/hj-test/assets/img/docs/chrome-print.png",
  /**/"/hj-test/assets/img/docs/google-fonts.png",
  /**/"/hj-test/assets/img/projects/hy-drawer.svg",
  /**/"/hj-test/assets/img/projects/hy-img.svg",
  /**/"/hj-test/assets/img/projects/hy-push-state.svg",
  /**/"/hj-test/assets/img/projects/hydejack-site.jpg",
  /**/"/hj-test/assets/img/projects/hydejack-site@0,25x.jpg",
  /**/"/hj-test/assets/img/projects/hydejack-site@0,5x.jpg",
  /**/"/hj-test/assets/img/projects/qwtel.jpg",
  /**/"/hj-test/assets/img/projects/qwtel@0,25x.jpg",
  /**/"/hj-test/assets/img/projects/qwtel@0,5x.jpg",
  /**/"/hj-test/assets/bower.json",
  /**/"/hj-test/assets/bower_components/MathJax/.bower.json",
  /**/"/hj-test/assets/bower_components/MathJax/LICENSE",
  /**/"/hj-test/assets/bower_components/MathJax/bower.json",
  /**/"/hj-test/assets/bower_components/MathJax/composer.json",
  /**/"/hj-test/assets/bower_components/MathJax/es5/a11y/assistive-mml.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/a11y/complexity.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/a11y/explorer.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/a11y/semantic-enrich.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/adaptors/liteDOM.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/core.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/asciimath.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/mml/entities.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/mml.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/action.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/all-packages.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/ams.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/amscd.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/autoload.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/bbox.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/boldsymbol.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/braket.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/bussproofs.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/cancel.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/color.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/colorV2.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/configMacros.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/enclose.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/extpfeil.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/html.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/mhchem.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/newcommand.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/noerrors.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/noundefined.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/physics.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/require.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/tagFormat.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/unicode.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex/extensions/verb.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex-base.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex-full.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/input/tex.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/latest.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/loader.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/mml-chtml.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/mml-svg.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/node-main.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/tex.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_AMS-Regular.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Calligraphic-Bold.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Calligraphic-Regular.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Fraktur-Bold.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Fraktur-Regular.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Bold.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Italic.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Regular.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-BoldItalic.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-Italic.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-Regular.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Bold.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Italic.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Regular.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Script-Regular.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size1-Regular.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size2-Regular.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size3-Regular.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size4-Regular.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Typewriter-Regular.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Vector-Bold.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Vector-Regular.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Zero.woff",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/chtml.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/svg/fonts/tex.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/output/svg.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/sre/mathmaps/en.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/sre/mathmaps/es.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/sre/mathmaps/fr.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/sre/mathmaps/mathmaps_ie.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/sre/mathmaps/nemeth.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/sre/sre_browser.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/startup.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/tex-chtml-full.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/tex-chtml.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/tex-mml-chtml.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/tex-mml-svg.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/tex-svg-full.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/tex-svg.js",
  /**/"/hj-test/assets/bower_components/MathJax/es5/ui/menu.js",
  /**/"/hj-test/assets/bower_components/MathJax/package.json",
  /**/"/hj-test/assets/bower_components/html5shiv/.bower.json",
  /**/"/hj-test/assets/bower_components/html5shiv/Gruntfile.js",
  /**/"/hj-test/assets/bower_components/html5shiv/bower.json",
  /**/"/hj-test/assets/bower_components/html5shiv/dist/html5shiv-printshiv.js",
  /**/"/hj-test/assets/bower_components/html5shiv/dist/html5shiv-printshiv.min.js",
  /**/"/hj-test/assets/bower_components/html5shiv/dist/html5shiv.js",
  /**/"/hj-test/assets/bower_components/html5shiv/dist/html5shiv.min.js",
  /**/"/hj-test/assets/bower_components/html5shiv/package.json",
  /**/"/hj-test/assets/bower_components/katex/.bower.json",
  /**/"/hj-test/assets/bower_components/katex/LICENSE",
  /**/"/hj-test/assets/bower_components/katex/bower.json",
  /**/"/hj-test/assets/bower_components/katex/dist/contrib/auto-render.js",
  /**/"/hj-test/assets/bower_components/katex/dist/contrib/auto-render.min.js",
  /**/"/hj-test/assets/bower_components/katex/dist/contrib/auto-render.mjs",
  /**/"/hj-test/assets/bower_components/katex/dist/contrib/copy-tex.css",
  /**/"/hj-test/assets/bower_components/katex/dist/contrib/copy-tex.js",
  /**/"/hj-test/assets/bower_components/katex/dist/contrib/copy-tex.min.css",
  /**/"/hj-test/assets/bower_components/katex/dist/contrib/copy-tex.min.js",
  /**/"/hj-test/assets/bower_components/katex/dist/contrib/copy-tex.mjs",
  /**/"/hj-test/assets/bower_components/katex/dist/contrib/mathtex-script-type.js",
  /**/"/hj-test/assets/bower_components/katex/dist/contrib/mathtex-script-type.min.js",
  /**/"/hj-test/assets/bower_components/katex/dist/contrib/mathtex-script-type.mjs",
  /**/"/hj-test/assets/bower_components/katex/dist/contrib/mhchem.js",
  /**/"/hj-test/assets/bower_components/katex/dist/contrib/mhchem.min.js",
  /**/"/hj-test/assets/bower_components/katex/dist/contrib/mhchem.mjs",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.ttf",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.woff",
  /**/"/hj-test/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.woff2",
  /**/"/hj-test/assets/bower_components/katex/dist/katex.css",
  /**/"/hj-test/assets/bower_components/katex/dist/katex.js",
  /**/"/hj-test/assets/bower_components/katex/dist/katex.min.css",
  /**/"/hj-test/assets/bower_components/katex/dist/katex.min.js",
  /**/"/hj-test/assets/bower_components/katex/dist/katex.mjs",
  /**/"/hj-test/assets/bower_components/katex/yarn.lock",
  /**/"/hj-test/assets/icomoon/fonts/icomoon.eot",
  /**/"/hj-test/assets/icomoon/fonts/icomoon.svg",
  /**/"/hj-test/assets/icomoon/fonts/icomoon.ttf",
  /**/"/hj-test/assets/icomoon/fonts/icomoon.woff",
  /**/"/hj-test/assets/icomoon/selection.json",
  /**/"/hj-test/assets/icomoon/style.css",
  /**/"/hj-test/assets/icons/favicon.ico",
  /**/"/hj-test/assets/icons/icon-128x128.png",
  /**/"/hj-test/assets/icons/icon-144x144.png",
  /**/"/hj-test/assets/icons/icon-152x152.png",
  /**/"/hj-test/assets/icons/icon-192x192.png",
  /**/"/hj-test/assets/icons/icon-384x384.png",
  /**/"/hj-test/assets/icons/icon-512x512.png",
  /**/"/hj-test/assets/icons/icon-72x72.png",
  /**/"/hj-test/assets/icons/icon-96x96.png",
  /**/"/hj-test/assets/img/logo.png",
  /**/"/hj-test/assets/img/sidebar-bg.jpg",
  /**/"/hj-test/assets/img/swipe.svg",
  /**/"/hj-test/assets/js/LEGACY-drawer-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-drawer-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-drawer-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-fetch-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-fetch-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-fetch-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-navbar-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-navbar-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-navbar-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-push-state-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-push-state-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-push-state-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-resize-observer-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-resize-observer-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-resize-observer-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-search-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-search-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-search-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-shadydom-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-shadydom-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-shadydom-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-toc-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-toc-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-toc-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~drawer-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~drawer-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-vendors~drawer-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~drawer~push-state-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~drawer~push-state-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-vendors~drawer~push-state-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~drawer~push-state~search-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~drawer~push-state~search-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-vendors~drawer~push-state~search-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~fetch-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~fetch-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-vendors~fetch-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~intersection-observer-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~intersection-observer-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-vendors~intersection-observer-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~push-state-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~push-state-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-vendors~push-state-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~resize-observer-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~resize-observer-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-vendors~search-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~search-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-vendors~search-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~shadydom-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~shadydom-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-vendors~shadydom-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~webanimations-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~webanimations-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-vendors~webanimations-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~webcomponents-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-vendors~webcomponents-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-vendors~webcomponents-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/LEGACY-webcomponents-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/LEGACY-webcomponents-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/LEGACY-webcomponents-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/drawer-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/drawer-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/drawer-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/fetch-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/fetch-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/fetch-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/kv-storage-polyfill/dist/kv-storage-polyfill.umd.js",
  /**/"/hj-test/assets/js/kv-storage-polyfill/dist/kv-storage-polyfill.umd.js.map",
  /**/"/hj-test/assets/js/kv-storage-polyfill/package.json",
  /**/"/hj-test/assets/js/minisearch/dist/umd/index.js",
  /**/"/hj-test/assets/js/minisearch/dist/umd/index.min.js",
  /**/"/hj-test/assets/js/minisearch/dist/umd/index.min.js.map",
  /**/"/hj-test/assets/js/minisearch/package.json",
  /**/"/hj-test/assets/js/navbar-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/navbar-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/navbar-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/push-state-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/push-state-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/push-state-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/resize-observer-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/resize-observer-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/resize-observer-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/search-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/search-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/search-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/shadydom-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/shadydom-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/shadydom-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/toc-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/toc-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/toc-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/vendors~drawer-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/vendors~drawer-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/vendors~drawer-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/vendors~drawer~push-state-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/vendors~drawer~push-state-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/vendors~drawer~push-state-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/vendors~drawer~push-state~search-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/vendors~drawer~push-state~search-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/vendors~drawer~push-state~search-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/vendors~fetch-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/vendors~fetch-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/vendors~fetch-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/vendors~intersection-observer-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/vendors~intersection-observer-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/vendors~intersection-observer-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/vendors~push-state-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/vendors~push-state-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/vendors~push-state-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/vendors~resize-observer-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/vendors~resize-observer-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/vendors~search-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/vendors~search-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/vendors~search-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/vendors~shadydom-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/vendors~shadydom-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/vendors~shadydom-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/vendors~webanimations-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/vendors~webanimations-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/vendors~webanimations-hydejack-9.0.5.js",
  /**/"/hj-test/assets/js/vendors~webcomponents-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/vendors~webcomponents-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/webcomponents-hydejack-9.0.4.js",
  /**/"/hj-test/assets/js/webcomponents-hydejack-9.0.4.js.map",
  /**/"/hj-test/assets/js/webcomponents-hydejack-9.0.5.js",
  /**/"/hj-test/assets/version.json",
  /**/
];

const PRE_CACHED_ASSETS = [
  '/hj-test/assets/icons/favicon.ico',
  /**/"/hj-test/assets/img/sidebar-bg.jpg",/**/
  /**/"/hj-test/assets/img/logo.png",/**/
  /**/"/hj-test/assets/img/swipe.svg",
  /**/
];

// Files we add on every service worker installation.
const CONTENT_FILES = [
  "/hj-test/",
  "/hj-test/offline.html",
  /**/"/hj-test/LICENSE/",
  /**/"/hj-test/NOTICE/",
  /**/"/hj-test/CHANGELOG/",
  /**/
];

const SITE_URL = new URL("/hj-test/", self.location);
const OFFLINE_PAGE_URL = new URL("/hj-test/offline.html", self.location);

self.addEventListener("install", e => e.waitUntil(onInstall(e)));
self.addEventListener("activate", e => e.waitUntil(onActivate(e)));
self.addEventListener("fetch", e => e.respondWith(onFetch(e)));

// Takes a URL with pathname like `/foo/bar/file.txt` and returns just the dirname like `/foo/bar/`.
const dirname = ({ pathname }) => pathname.replace(/[^/]*$/, "");

function matchAll(text, regExp) {
  const globalRegExp = new RegExp(regExp, 'g'); // force global regexp to prevent infinite loop
  const matches = [];
  let lastMatch;
  while (lastMatch = globalRegExp.exec(text)) matches.push(lastMatch);
  return matches;
}

// Returns the second element of an iterable (first match in RegExp match array)
const second = ([, _]) => _;

const toAbsoluteURL = url => new URL(url, self.location);

// Creates a URL that bypasses the browser's HTTP cache by appending a random search parameter.
function noCache(url) {
  return new Request(url, { cache: 'no-store' });
}

// Removes the sw search paramter, if present.
function noSWParam(url) {
  const url2 = new URL(url);
  if (url2.searchParams.has(SW_CACHE_SEARCH_PARAM)) {
    url2.searchParams.delete(SW_CACHE_SEARCH_PARAM);
    return url2.href;
  }
  return url;
}

const warn = (e) => {
  console.warn(e);
  return new Response(e.message, { status: 500 });
}

async function getIconFontFiles() {
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/hj-test/assets/icomoon/fonts/') &&
    x.endsWith('.woff') 
  ));
  return [ICON_FONT, ...fontURLs];
}
 
async function getKaTeXFontFiles() {
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/hj-test/assets/bower_components/katex/dist/fonts/') &&
    x.endsWith('.woff2')
  ));
  return [KATEX_FONT, ...fontURLs];
}

async function getMathJaxFiles() {
  // NOTE: Removed due to MathJax' enormous size. 
  // Uncomment if you're using MathJax and don't mind forcing a 50 MB download on every visitor...
  /*
  const mathJaxFiles = STATIC_FILES.filter(x => (
    x.startsWith('/hj-test/assets/bower_components/MathJax/es5/') &&
    x.endsWith('.js')
  ));
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/hj-test/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2') &&
    x.endsWith('.woff')
  ));
  return [...mathJaxFiles, ...fontURLs];
  */
}

async function getGoogleFontsFiles() {
  const googleFontRes = await fetch(noCache(GOOGLE_FONTS)).catch(warn);
  if (googleFontRes.ok) {
    const text = await googleFontRes.text();
    return [GOOGLE_FONTS, ...matchAll(text, RE_CSS_URL).map(second)];
  }
  return [];
}

function addAll(cache, urls) {
  return Promise.all(
    urls.map(url => (
      fetch(noCache(toAbsoluteURL(url)))
        .then(res => cache.put(url, res))
        .catch(warn)
      )
    )
  );
}

async function cacheShell(cache) {
  const fontFiles = await Promise.all([
    getIconFontFiles(),
    /**/getGoogleFontsFiles(),/**/
    /**/
    /**/getMathJaxFiles(),/**/
  ]);

  const jsFiles = STATIC_FILES.filter(url => (
    url.startsWith('/hj-test/assets/js/') &&
    url.endsWith('.js') && !url.includes('LEGACY')
  ));

  const urls = SHELL_FILES.concat(jsFiles, ...fontFiles).filter(x => !!x);
  return addAll(cache, urls);
}

async function cacheAssets(cache) {
  const urls = PRE_CACHED_ASSETS.filter(x => !!x);
  return addAll(cache, urls);
}

async function cacheContent(cache) {
  const urls = CONTENT_FILES.filter(x => !!x);
  return addAll(cache, urls);
}

async function preCache() {
  const keys = await caches.keys();

  if (keys.includes(SHELL_CACHE) && keys.includes(ASSETS_CACHE)) {
    const contentCache = await caches.open(CONTENT_CACHE);
    return cacheContent(contentCache);
  } else {
    const [shellCache, assetsCache, contentCache] = await Promise.all([
      caches.open(SHELL_CACHE),
      caches.open(ASSETS_CACHE),
      caches.open(CONTENT_CACHE),
    ]);
    return Promise.all([
      cacheShell(shellCache),
      cacheAssets(assetsCache),
      cacheContent(contentCache),
    ]);
  }
}

async function onInstall() {
  await preCache();
  return self.skipWaiting();
}

const isSameSite = ({ origin, pathname }) => origin === SITE_URL.origin && pathname.startsWith(SITE_URL.pathname);
const isAsset = ({ pathname }) => pathname.startsWith("/hj-test/assets");
const hasSWParam = ({ searchParams }) => searchParams.has(SW_CACHE_SEARCH_PARAM);
const hasNoCacheParam = ({ searchParams }) => searchParams.has(NO_CACHE_SEARCH_PARAM);
const isGoogleFonts = ({ hostname }) => hostname === 'fonts.googleapis.com' || hostname === 'fonts.gstatic.com'

async function cacheResponse(cacheName, req, res) {
  const cache = await caches.open(cacheName);
  return cache.put(req, res);
}

async function onActivate() {
  await self.clients.claim();

  const keys = await caches.keys();

  return Promise.all(
    keys
      // Only consider caches created by this baseurl, i.e. allow multiple Hydejack installations on same domain.
      .filter(key => key.endsWith("sw/hj-test/"))
      // Delete old caches
      .filter(key => key !== SHELL_CACHE && key !== ASSETS_CACHE && key !== CONTENT_CACHE)
      .map(key => caches.delete(key))
  );
}

const NEVER = new Promise(() => {});

// Returns the first promise that resolves with non-nullish value,
// or `undefined` if all promises resolve with a nullish value.
// Note that this inherits the behavior of `Promise.race`,
// where the returned promise rejects as soon as one input promise rejects.
async function raceTruthy(iterable) {
  const ps = [...iterable].map(_ => Promise.resolve(_));
  let { length } = ps;
  const continueWhenNullish = value => value != null
    ? value
    : --length > 0
      ? NEVER
      : undefined;
  return Promise.race(ps.map(p => p.then(continueWhenNullish)));
}

async function fromNetwork(url, ...args) {
  const cacheName = isAsset(url) || hasSWParam(url) ? ASSETS_CACHE : CONTENT_CACHE;
  return fetchAndCache(cacheName, url, ...args);
}

async function fetchAndCache(cacheName, url, request, e) {
  const response = await fetch(noCache(noSWParam(url)));
  if (response.ok) e.waitUntil(cacheResponse(cacheName, request, response.clone()));
  return response;
}

async function onFetch(e) {
  const { request } = e;
  const url = new URL(request.url);

  // Bypass
  // ------
  // Go to network for non-GET request and Google Analytics right away.
  const shouldCache = isSameSite(url) || hasSWParam(url) || isGoogleFonts(url);
  if (request.method !== "GET" || !shouldCache || hasNoCacheParam(url)) {
    return fetch(request).catch(e => Promise.reject(e));
  }

  try {
    // Caches
    // ------
    const matching = await raceTruthy([
      caches.open(SHELL_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
      caches.open(ASSETS_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
      caches.open(CONTENT_CACHE).then(c => c.match(url.href, { ignoreSearch: true })),
    ]);

    if (matching) return matching;

    // Network
    // -------
    // Got to network otherwise. Show 404 when there's a network error.
    // TODO: Use separate offline site instead of 404!?
    return await fromNetwork(url, request, e);
  } catch (err) {
    // console.error(err)
    const cache = await caches.open(CONTENT_CACHE);
    return cache.match(OFFLINE_PAGE_URL);
  }
}

// 

