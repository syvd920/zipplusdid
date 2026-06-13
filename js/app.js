const names=['강남구 프라임공인','서초구 골드공인','송파구 센트럴공인','마포구 랜드공인','관악구 스테이션공인','성동구 하이엔드공인'];
document.getElementById('caseCards').innerHTML=names.map((n,i)=>`<article class="card"><div class="imgbox"><div class="rank">${i+1}</div><div class="office-img"></div></div><div class="card-body"><h3>${n}</h3><p>매물 사진·영상 자동 송출 · 사무실 이미지 개선</p><div class="price">월 최대 <span class="red">300,000원</span></div></div></article>`).join('');
const formModal=document.getElementById('formModal'), legalModal=document.getElementById('legalModal');
document.querySelectorAll('.openForm').forEach(b=>b.onclick=()=>formModal.classList.add('on'));
document.querySelectorAll('.closeModal').forEach(b=>b.onclick=()=>formModal.classList.remove('on'));
document.querySelectorAll('.openLegal').forEach(b=>b.onclick=()=>{document.getElementById('legalTitle').textContent=b.dataset.title;legalModal.classList.add('on')});
document.querySelector('.closeLegal').onclick=()=>legalModal.classList.remove('on');
[formModal,legalModal].forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('on')}));
