(function () {
  if (document.getElementById('studyChatBox')) {
    var b = document.getElementById('studyChatBox');
    b.style.display = b.style.display === 'none' ? 'block' : 'none';
    return;
  }

  var css = document.createElement('style');
  css.innerHTML = `
#studyChatBox,#studyChatBox *{box-sizing:border-box!important;font-family:Arial!important}
#studyChatBox{position:fixed!important;right:18px!important;bottom:78px!important;width:245px!important;background:rgba(255,255,255,.08)!important;border:1px solid rgba(203,213,225,.16)!important;border-radius:10px!important;box-shadow:none!important;z-index:999999!important;overflow:hidden!important;opacity:.32!important;transition:opacity .18s,background .18s!important}
#studyChatBox:hover,#studyChatBox:focus-within{opacity:.55!important;background:rgba(255,255,255,.25)!important;box-shadow:none!important}
#studyChatHeader{height:22px!important;background:transparent!important;border-bottom:1px solid rgba(203,213,225,.12)!important;display:flex!important;justify-content:flex-end!important;align-items:center!important;padding:0 5px!important}
#studyChatClose{border:1px solid rgba(203,213,225,.18)!important;background:rgba(255,255,255,.08)!important;color:rgba(17,24,39,.35)!important;border-radius:6px!important;width:22px!important;height:18px!important;cursor:pointer!important;font-size:13px!important}
#studyChatBox:hover #studyChatClose{background:rgba(255,255,255,.18)!important;color:rgba(17,24,39,.55)!important}
#studyChatBody{padding:7px!important;background:transparent!important}
#studyQuestion{width:100%!important;height:54px!important;resize:vertical!important;border:1px solid rgba(203,213,225,.18)!important;border-radius:7px!important;padding:6px!important;font-size:11px!important;outline:none!important;background:rgba(255,255,255,.06)!important;color:rgba(17,24,39,.45)!important}
#studyChatBox:hover #studyQuestion,#studyQuestion:focus{background:rgba(255,255,255,.28)!important;color:rgba(17,24,39,.65)!important;border-color:rgba(203,213,225,.32)!important}
#studyQuestion::placeholder{color:rgba(17,24,39,.25)!important}
#studyChatButtons{display:flex!important;gap:5px!important;margin-top:6px!important}
#studyChatSend,#studyGoogleBtn{flex:1!important;border:1px solid rgba(203,213,225,.16)!important;border-radius:7px!important;height:24px!important;background:rgba(255,255,255,.05)!important;color:rgba(17,24,39,.32)!important;font-size:10px!important;font-weight:600!important;cursor:pointer!important}
#studyChatBox:hover #studyChatSend,#studyChatBox:hover #studyGoogleBtn{background:rgba(255,255,255,.22)!important;color:rgba(17,24,39,.55)!important}
`;

  document.head.appendChild(css);

  var box = document.createElement('div');
  box.id = 'studyChatBox';
  box.innerHTML = `
<div id="studyChatHeader">
  <button id="studyChatClose" type="button">−</button>
</div>
<div id="studyChatBody">
  <textarea id="studyQuestion" placeholder="Escribe..."></textarea>
  <div id="studyChatButtons">
    <button id="studyChatSend" type="button">ChatGPT</button>
    <button id="studyGoogleBtn" type="button">Google</button>
  </div>
</div>
`;

  document.body.appendChild(box);

  document.getElementById('studyChatClose').onclick = function () {
    document.getElementById('studyQuestion').value = '';
    box.style.display = 'none';
  };

  document.getElementById('studyChatSend').onclick = function () {
    var q = document.getElementById('studyQuestion').value.trim();
    if (!q) return;

    var t = document.createElement('textarea');
    t.value = q;
    t.style.position = 'fixed';
    t.style.left = '-9999px';
    document.body.appendChild(t);
    t.focus();
    t.select();

    try {
      document.execCommand('copy');
    } catch (e) {}

    document.body.removeChild(t);

    window.open(
      'https://chatgpt.com/',
      '_blank',
      'width=560,height=740,left=80,top=60,resizable=yes,scrollbars=yes,noopener,noreferrer'
    );

    document.getElementById('studyQuestion').value = '';
    box.style.display = 'none';
  };

  document.getElementById('studyGoogleBtn').onclick = function () {
    var q = document.getElementById('studyQuestion').value.trim();
    if (!q) return;

    window.open(
      'https://www.google.com/search?q=' + encodeURIComponent(q),
      '_blank',
      'width=780,height=740,left=120,top=60,resizable=yes,scrollbars=yes,noopener,noreferrer'
    );

    document.getElementById('studyQuestion').value = '';
    box.style.display = 'none';
  };

  document.addEventListener(
    'keydown',
    function (e) {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        e.stopPropagation();

        var b = document.getElementById('studyChatBox');
        if (!b) return;

        if (b.style.display === 'none') {
          b.style.display = 'block';
          setTimeout(function () {
            var i = document.getElementById('studyQuestion');
            if (i) i.focus();
          }, 80);
        } else {
          var i = document.getElementById('studyQuestion');
          if (i) i.value = '';
          b.style.display = 'none';
        }
      }
    },
    true
  );
})();
