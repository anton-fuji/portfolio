const FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap";

// フォント CSS は描画をブロックしないよう media="print" で取得し、読み込み後に適用する。
const ENABLE_FONT_STYLESHEET = `(function(){var l=document.getElementById("web-fonts");if(!l)return;var a=function(){l.media="all"};if(l.sheet){a()}else{l.addEventListener("load",a)}})();`;

export function Head() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link id="web-fonts" rel="stylesheet" href={FONT_STYLESHEET} media="print" />
      <script dangerouslySetInnerHTML={{ __html: ENABLE_FONT_STYLESHEET }} />
      <noscript>
        <link rel="stylesheet" href={FONT_STYLESHEET} />
      </noscript>
    </>
  );
}
