const names=['강남구 프라임공인','서초구 골드공인','송파구 센트럴공인','마포구 랜드공인','관악구 스테이션공인','성동구 하이엔드공인'];
const caseCards=document.getElementById('caseCards');
if(caseCards){
  caseCards.innerHTML=names.map((n,i)=>`<article class="card"><div class="imgbox"><div class="rank">${i+1}</div><div class="office-img"></div></div><div class="card-body"><h3>${n}</h3><p>매물 사진·영상 자동 송출 · 사무실 이미지 개선</p><div class="price">월 최대 <span class="red">400,000원</span></div></div></article>`).join('');
}

const formModal=document.getElementById('formModal');
const legalModal=document.getElementById('legalModal');

document.querySelectorAll('.openForm').forEach(b=>b.addEventListener('click',()=>formModal.classList.add('on')));
document.querySelectorAll('.closeModal').forEach(b=>b.addEventListener('click',()=>formModal.classList.remove('on')));
document.querySelectorAll('.openLegal').forEach(b=>b.addEventListener('click',(e)=>{
  e.preventDefault();
  e.stopPropagation();
  document.getElementById('legalTitle').textContent=b.dataset.title;
  legalModal.classList.add('on');
}));
const closeLegal=document.querySelector('.closeLegal');
if(closeLegal) closeLegal.addEventListener('click',()=>legalModal.classList.remove('on'));
[formModal,legalModal].forEach(m=>m&&m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('on')}));

function setupAgreementGroup(group){
  const all=group.querySelector('.all-check input');
  const checks=[...group.querySelectorAll('.term-row input[type="checkbox"]')];
  const required=checks.filter(c=>c.dataset.required==='true');
  if(!all || !checks.length) return;
  all.addEventListener('change',()=>{checks.forEach(c=>c.checked=all.checked)});
  checks.forEach(c=>c.addEventListener('change',()=>{all.checked=checks.every(x=>x.checked)}));
  group.requiredChecked=()=>required.every(c=>c.checked);
}

document.querySelectorAll('.term-group').forEach(setupAgreementGroup);

document.querySelectorAll('.submitConsult').forEach(btn=>btn.addEventListener('click',(e)=>{
  const group=btn.closest('.formbox, .modal')?.querySelector('.term-group');
  if(group && group.requiredChecked && !group.requiredChecked()){
    e.preventDefault();
    alert('필수 약관에 동의해 주세요.');
    return;
  }
  alert('상담 신청 기능은 다음 단계에서 연결됩니다.');
}));
