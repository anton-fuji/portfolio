// トップページだけで使う Geist。全体のフォントと同じく非ブロッキングで読み込む。
const GEIST_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&display=swap";

const ENABLE_GEIST_STYLESHEET = `(function(){var l=document.getElementById("geist-font");if(!l)return;var a=function(){l.media="all"};if(l.sheet){a()}else{l.addEventListener("load",a)}})();`;

export function Head() {
  return (
    <>
      <link id="geist-font" rel="stylesheet" href={GEIST_STYLESHEET} media="print" />
      <script dangerouslySetInnerHTML={{ __html: ENABLE_GEIST_STYLESHEET }} />
      <noscript>
        <link rel="stylesheet" href={GEIST_STYLESHEET} />
      </noscript>
    </>
  );
}
