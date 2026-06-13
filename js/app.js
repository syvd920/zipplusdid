const names=['강남구 프라임공인','서초구 골드공인','송파구 센트럴공인','마포구 랜드공인','관악구 스테이션공인','성동구 하이엔드공인'];
const caseCards=document.getElementById('caseCards');
if(caseCards){
  caseCards.innerHTML=names.map((n,i)=>`<article class="card"><div class="imgbox"><div class="rank">${i+1}</div><div class="office-img"></div></div><div class="card-body"><h3>${n}</h3><p>매물 사진·영상 자동 송출 · 사무실 이미지 개선</p><div class="price">월 최대 <span class="red">400,000원</span></div></div></article>`).join('');
}

const formModal=document.getElementById('formModal');
const legalModal=document.getElementById('legalModal');
const legalTexts={
  '개인정보 수집 및 이용동의': `<p>집플러스는 상담 신청 및 서비스 안내를 위해 상호명, 연락처, 지역 정보를 수집합니다.</p><p>수집된 정보는 상담 진행, 설치 가능 여부 확인, 고객 문의 응대 목적으로 사용됩니다.</p><p>보유 기간은 상담 신청일로부터 1년이며, 필수 항목 동의 거부 시 상담 신청이 제한될 수 있습니다.</p>`,
  '개인정보 제3자 제공 동의': `<p>상담 및 설치 안내를 위해 필요한 경우 담당 영업자, 설치 협력사 등에게 최소한의 정보가 제공될 수 있습니다.</p><p>제공 항목은 상호명, 연락처, 지역이며, 제공 목적 달성 후 관련 법령에 따라 안전하게 파기됩니다.</p>`,
  '마케팅 활용 및 서비스 관련 정보 수신 동의': `<p>집플러스 DID 서비스 안내, 광고수익 프로그램, 이벤트 및 혜택 안내를 위해 연락처를 활용할 수 있습니다.</p><p>해당 동의는 선택사항이며 동의하지 않아도 상담 신청은 가능합니다.</p>`,
  '이용약관': `<p>본 랜딩페이지는 집플러스 DID 상담 신청을 위한 페이지입니다.</p><p>상담 신청자는 정확한 정보를 입력해야 하며, 허위 정보 입력 시 상담이 제한될 수 있습니다.</p><p>서비스 이용 조건, 설치 가능 여부, 비용 및 정산 조건은 상담 및 계약 단계에서 최종 확인됩니다.</p>`,
  '개인정보 처리방침': `<p>집플러스는 이용자의 개인정보 보호를 중요하게 생각하며, 상담 신청 과정에서 수집되는 개인정보를 안전하게 관리합니다.</p><p>수집 항목은 상호명, 연락처, 지역이며 상담 진행, 서비스 안내, 설치 가능 여부 확인 목적으로 사용됩니다.</p><p>이용자는 개인정보 열람, 정정, 삭제를 요청할 수 있습니다.</p>`,
  '이메일무단수집거부': `<p>본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부합니다.</p><p>이를 위반할 경우 관련 법령에 따라 처벌될 수 있습니다.</p>`
};


document.querySelectorAll('.openForm').forEach(b=>b.addEventListener('click',()=>formModal.classList.add('on')));
document.querySelectorAll('.closeModal').forEach(b=>b.addEventListener('click',()=>formModal.classList.remove('on')));
document.querySelectorAll('.openLegal').forEach(b=>b.addEventListener('click',(e)=>{
  e.preventDefault();
  e.stopPropagation();
  const title=b.dataset.title || '약관 안내';
  document.getElementById('legalTitle').textContent=title;
  const body=document.getElementById('legalBody');
  if(body) body.innerHTML=legalTexts[title] || legalTexts['개인정보 처리방침'];
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
  if(btn.classList.contains('is-loading')) return;
  btn.classList.add('is-loading');
  btn.setAttribute('aria-busy','true');
  const originalText=btn.textContent;
  setTimeout(()=>{
    btn.classList.remove('is-loading');
    btn.removeAttribute('aria-busy');
    btn.textContent=originalText;
    alert('상담 신청 기능은 다음 단계에서 연결됩니다.');
  }, 900);
}));
