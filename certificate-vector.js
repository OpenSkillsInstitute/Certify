(function () {
  'use strict';
  let permitted = false;
  try { permitted = sessionStorage.getItem('osi-access') === 'granted'; } catch {}
  if (!permitted) { location.replace('login.html'); return; }
  document.querySelector('#auth-pending').hidden = true;
  document.querySelector('#certificate-app').hidden = false;
  const {normalizeName,referenceForName,datesForStart}=window.OSICertificate;
  const form=document.querySelector('#certificate-form');
  const nameField=document.querySelector('#full-name');
  const dateField=document.querySelector('#start-date');
  const button=document.querySelector('#download-pdf');
  const status=document.querySelector('#download-status');
  const summary=document.querySelector('#preview-summary');
  const svg=document.querySelector('#certificate-svg');
  const NS='http://www.w3.org/2000/svg';
  const C={ink:'#111811',muted:'#30372e',gold:'#c8ac61',light:'#e7d9a6',paper:'#fffef9'};
  const decode=data=>Uint8Array.from(atob(data),c=>c.charCodeAt(0));
  let fonts=null, fontBytes=null, latinFontBytes=null, latinSupported=new Set(), ready=false, busy=false, model=[];
  const fontFamily={sans:'Arial, sans-serif',bold:'Arial, sans-serif',serif:'"Times New Roman", Times, serif',serifBold:'"Times New Roman", Times, serif',name:'"OSI Certificate Name", serif'};
  function element(tag,attributes,text){
    const node=document.createElementNS(NS,tag);
    for(const [key,value] of Object.entries(attributes))node.setAttribute(key,String(value));
    if(text!==undefined)node.textContent=text;
    return node;
  }
  function polygon(points){return points.map(([x,y],i)=>(i?'L':'M')+x.toFixed(3)+' '+y.toFixed(3)).join(' ')+' Z';}
  function circle(x,y,r){
    const k=.5522847498*r;
    return `M ${x+r} ${y} C ${x+r} ${y+k} ${x+k} ${y+r} ${x} ${y+r} C ${x-k} ${y+r} ${x-r} ${y+k} ${x-r} ${y} C ${x-r} ${y-k} ${x-k} ${y-r} ${x} ${y-r} C ${x+k} ${y-r} ${x+r} ${y-k} ${x+r} ${y} Z`;
  }
  function star(x,y,r){return polygon(Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*Math.PI/5;const q=i%2?r*.44:r;return[x+Math.cos(a)*q,y+Math.sin(a)*q]}));}
  function certificateDateRange(dates){
    if(!dates)return 'Select a start date';
    const a=dates.start,b=dates.end;
    const month=d=>new Intl.DateTimeFormat('en-US',{month:'long',timeZone:'UTC'}).format(d);
    if(a.getUTCFullYear()===b.getUTCFullYear()){
      if(a.getUTCMonth()===b.getUTCMonth())return `${month(a)} ${a.getUTCDate()}–${b.getUTCDate()}, ${a.getUTCFullYear()}`;
      return `${month(a)} ${a.getUTCDate()}–${month(b)} ${b.getUTCDate()}, ${a.getUTCFullYear()}`;
    }
    return `${month(a)} ${a.getUTCDate()}, ${a.getUTCFullYear()}–${month(b)} ${b.getUTCDate()}, ${b.getUTCFullYear()}`;
  }
  function makeLayout(name,dates,reference){
    const shapes=[];
    const path=(d,fill,stroke=null,width=1)=>shapes.push({type:'path',d,fill,stroke,width});
    const line=(x1,y1,x2,y2,color,width=1)=>path(`M ${x1} ${y1} L ${x2} ${y2}`,null,color,width);
    const text=(value,x,y,size,font='sans',color=C.ink,align='center')=>{
      const width=fonts[font].widthOfTextAtSize(value,size);
      shapes.push({type:'text',value,x:align==='center'?x-width/2:x,y,size,font,color,width});
    };
    path('M 0 0 H 1188 V 840 H 0 Z',C.paper);
    path(polygon([[0,0],[152,0],[0,152]]),C.gold);
    path(polygon([[152,0],[202,0],[0,202],[0,152]]),C.ink);
    path(polygon([[1188,840],[1036,840],[1188,688]]),C.gold);
    path(polygon([[986,840],[1036,840],[1188,688],[1188,638]]),C.ink);
    path('M 23 23 H 1165 V 817 H 23 Z',null,C.ink,3);
    path('M 32 32 H 1156 V 808 H 32 Z',null,'#d6bc79',1);
    text('OPEN SKILLS INSTITUTE',594,82,22);
    text('P R O F E S S I O N A L   D E V E L O P M E N T  &  T R A I N I N G',594,109,10,'sans','#3e492e');
    line(420,132,550,132,C.gold);line(638,132,768,132,C.gold);
    path(polygon([[594,124],[602,132],[594,140],[586,132]]),C.gold);
    text('Certificate of Completion',594,209,64,'bold');
    text('T H I S   C E R T I F I C A T E   I S   P R E S E N T E D   T O',594,258,11,'sans',C.muted);
    const value=name||'Your Full Name';
    let fitted=null;
    for(let size=58;size>=24&&!fitted;size--){
      if(fonts.name.widthOfTextAtSize(value,size)<=920){fitted={lines:[value],size};break;}
      const chars=Array.from(value);let best=null;
      for(let i=1;i<chars.length;i++){
        const a=chars.slice(0,i).join('').trimEnd(),b=chars.slice(i).join('').trimStart();
        const width=Math.max(fonts.name.widthOfTextAtSize(a,size),fonts.name.widthOfTextAtSize(b,size));
        const score=width+(/\s/u.test(chars[i-1]+chars[i])?0:60);
        if(width<=920&&(!best||score<best.score))best={lines:[a,b],score};
      }
      if(best)fitted={lines:best.lines,size};
    }
    if(!fitted)fitted={lines:[value],size:24*920/fonts.name.widthOfTextAtSize(value,24)};
    const nameBaseline=fitted.lines.length>1?365-(fitted.size+5):350;
    fitted.lines.forEach((part,i)=>text(part,594,nameBaseline+i*(fitted.size+5),fitted.size,'name'));
    line(209,380,979,380,C.gold);
    text('In recognition of the successful completion of the',594,405,16,'sans',C.muted);
    const recognition=[{value:'15-hour professional development training program',font:'bold'},{value:' in',font:'bold'}];
    let recognitionX=594-recognition.reduce((sum,run)=>sum+fonts[run.font].widthOfTextAtSize(run.value,17),0)/2;
    for(const run of recognition){text(run.value,recognitionX,429,17,run.font,C.ink,'left');recognitionX+=fonts[run.font].widthOfTextAtSize(run.value,17);}
    text('Public Information Management',594,466,33,'serifBold');
    text('and Effective Communication',594,503,33,'serifBold');
    const programDescription='This professional development program provides comprehensive training in public information management and effective communication, emphasizing audience analysis, accurate and ethical information dissemination, preparation of clear and accessible communication materials, strategic selection of communication channels, and the application of active listening and feedback techniques to strengthen professional communication practices.';
    const lines=[];let paragraphLine='';
    for(const word of programDescription.split(' ')){
      const candidate=paragraphLine?paragraphLine+' '+word:word;
      if(paragraphLine&&fonts.sans.widthOfTextAtSize(candidate,16)>1000){lines.push(paragraphLine);paragraphLine=word;}else paragraphLine=candidate;
    }
    if(paragraphLine)lines.push(paragraphLine);
    lines.forEach((value,i)=>text(value,594,533+i*22,16,'sans',C.muted));
    text(certificateDateRange(dates)+'  ·  Online Self-Paced Training',594,638,17,'bold',C.ink);
    text('CERTIFICATE CODE: '+(reference||'OSI-XXXXXXXX'),594,663,12,'sans','#3e492e');
    // Crisp coin-style seal, made entirely from vector shapes and live text.
    const cx=186,cy=727;
    path(polygon(Array.from({length:96},(_,i)=>{const a=i*Math.PI/48;const r=i%2?72:75;return[cx+Math.cos(a)*r,cy+Math.sin(a)*r]})),C.gold,'#ad914a',.8);
    path(circle(cx,cy,67),C.ink,C.light,1.2);
    path(circle(cx,cy,62),null,C.gold,1.2);
    path(circle(cx,cy,55),null,'#bba160',.5);
    for(let i=0;i<44;i++){const a=i*Math.PI*2/44;path(circle(cx+Math.cos(a)*58.5,cy+Math.sin(a)*58.5,.75),C.light);}
    path(star(cx,cy-43,4),C.light);
    text('OPEN SKILLS',cx,cy-24,8.7,'sans',C.light);
    text('OSI',cx,cy+11,34,'serifBold',C.light);
    line(cx-27,cy+19,cx+27,cy+19,C.gold,.7);
    text('I N S T I T U T E',cx,cy+35,8.3,'sans',C.light);
    shapes.push({type:'image',x:485.6,y:660.7,width:216.8,height:72.3});
    line(434,735,754,735,'#bec2b1');
    text('DAN JOHNSON',594,760,17,'bold');
    text('T R A I N I N G   D I R E C T O R',594,780,10,'sans',C.muted);
    text('420 Lexington Avenue · Suite 1402 · New York, NY 10170 · United States',594,800,10,'sans',C.muted);
    text('15',993,727,35,'serif');
    text('T R A I N I N G   H O U R S',993,750,10,'sans','#3e492e');
    return shapes;
  }
  function render(){
    svg.replaceChildren();
    for(const shape of model){
      if(shape.type==='path')svg.append(element('path',{d:shape.d,fill:shape.fill||'none',stroke:shape.stroke||'none','stroke-width':shape.width}));
      else if(shape.type==='text')svg.append(element('text',{x:shape.x,y:shape.y,'font-family':fontFamily[shape.font],'font-size':shape.size,'font-weight':/Bold|bold/.test(shape.font)?700:400,fill:shape.color,textLength:shape.width,lengthAdjust:'spacingAndGlyphs'},shape.value));
      else svg.append(element('image',{x:shape.x,y:shape.y,width:shape.width,height:shape.height,href:window.OSISignature,preserveAspectRatio:'none'}));
    }
  }
  let current={name:'',dates:null,reference:''};
  function update(){
    const name=normalizeName(nameField.value),dates=datesForStart(dateField.value),reference=referenceForName(name);
    const visible=/[\p{L}\p{N}]/u.test(name)&&!/[\p{Cc}\p{Cf}]/u.test(name);
    const supported=!fonts||Array.from(name).every(char=>fonts.name.getCharacterSet().includes(char.codePointAt(0)));
    nameField.setCustomValidity(name&&!visible?'Enter a visible name without control characters.':!supported?'This name contains characters not supported by the certificate font.':'');
    document.querySelector('#end-date').value=dates?dates.endLabel:'';
    document.querySelector('#reference-code').value=reference;
    current={name,dates,reference};
    if(ready){model=makeLayout(supported?name:'',dates,reference);render();}
    button.disabled=!ready||busy||!visible||!supported||!dates||!nameField.validity.valid;
    if(!busy)status.textContent=!ready?'Preparing certificate fonts…':!button.disabled?'Ready to download your certificate PDF.':'Enter your full name and start date to download.';
    summary.textContent=`Certificate for ${name||'Your Full Name'}. Public Information Management and Effective Communication. Independent online learning, 15 hours across five days. ${dates?dates.startLabel+' to '+dates.endLabel+'. ':''}Training Director: Dan Johnson. Institute address: 420 Lexington Avenue, Suite 1402, New York, NY 10170, United States. Reference: ${reference||'not entered'}.`;
  }
  form.addEventListener('input',update);
  form.addEventListener('submit',async event=>{
    event.preventDefault();update();if(button.disabled||!form.reportValidity())return;
    const exportModel=model.slice(),exportReference=current.reference,exportName=current.name;
    busy=true;button.disabled=true;button.setAttribute('aria-busy','true');status.textContent='Preparing your certificate PDF…';
    try{
      const pdf=await PDFLib.PDFDocument.create();pdf.registerFontkit(window.fontkit);
      const F=await createFonts(pdf,exportName);
      const page=pdf.addPage([841.89,595.28]),scale=841.89/1188;
      const rgb=hex=>PDFLib.rgb(parseInt(hex.slice(1,3),16)/255,parseInt(hex.slice(3,5),16)/255,parseInt(hex.slice(5,7),16)/255);
      const signature=await pdf.embedPng(window.OSISignature);
      for(const shape of exportModel){
        if(shape.type==='path')page.drawSvgPath(shape.d,{x:0,y:595.28,scale,color:shape.fill?rgb(shape.fill):undefined,borderColor:shape.stroke?rgb(shape.stroke):undefined,borderWidth:shape.stroke?shape.width:0});
        else if(shape.type==='text')page.drawText(shape.value,{x:shape.x*scale,y:595.28-shape.y*scale,size:shape.size*scale,font:F[shape.font],color:rgb(shape.color)});
        else page.drawImage(signature,{x:shape.x*scale,y:595.28-(shape.y+shape.height)*scale,width:shape.width*scale,height:shape.height*scale});
      }
      pdf.setTitle('OSI Certificate - Public Information Management');pdf.setAuthor('Open Skills Institute');
      pdf.setSubject('Online Self-Paced Training - 15-hour professional development program');
      const bytes=await pdf.save();
      const url=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));
      const link=document.createElement('a');link.href=url;link.download=`OSI-Certificate-${exportReference}.pdf`;document.body.append(link);link.click();link.remove();
      setTimeout(()=>URL.revokeObjectURL(url),60000);
      status.textContent='Certificate PDF prepared. Check your browser downloads.';
    }catch(error){status.textContent='The PDF could not be prepared. Keep all website files together and try again.';console.error('Certificate PDF export:',error);}
    finally{const message=status.textContent;busy=false;update();status.textContent=message;button.removeAttribute('aria-busy');}
  });
  async function createFonts(pdf,name){
    const S=PDFLib.StandardFonts;
    const bytes=name!==undefined&&Array.from(name).every(c=>latinSupported.has(c.codePointAt(0)))?latinFontBytes:fontBytes;
    return{sans:await pdf.embedFont(S.Helvetica),bold:await pdf.embedFont(S.HelveticaBold),serif:await pdf.embedFont(S.TimesRoman),serifBold:await pdf.embedFont(S.TimesRomanBold),name:await pdf.embedFont(bytes,{subset:false})};
  }
  document.querySelector('#logout').addEventListener('click',()=>{try{sessionStorage.removeItem('osi-access')}catch{}location.replace('login.html')});
  window.addEventListener('pageshow',()=>{try{if(sessionStorage.getItem('osi-access')!=='granted')location.replace('login.html')}catch{location.replace('login.html')}});
  update();
  (async()=>{
    try{
      fontBytes=decode(window.OSICertificateFont);
      latinFontBytes=decode(window.OSICertificateLatinFont);
      const face=new FontFace('OSI Certificate Name',fontBytes);await face.load();document.fonts.add(face);
      const measurement=await PDFLib.PDFDocument.create();measurement.registerFontkit(window.fontkit);fonts=await createFonts(measurement);
      const latinFont=await measurement.embedFont(latinFontBytes,{subset:false});latinSupported=new Set(latinFont.getCharacterSet());
      ready=true;update();
    }catch(error){status.textContent='Certificate resources could not be loaded. Keep all supplied files together and reload.';console.error('Certificate initialization:',error);}
  })();
})();
