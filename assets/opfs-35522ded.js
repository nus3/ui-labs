import"./modulepreload-polyfill-3cfb730f.js";const d=async e=>await(await navigator.storage.getDirectory()).getFileHandle(e),u=async e=>await(await navigator.storage.getDirectory()).getDirectoryHandle(e),g=async e=>{await(await navigator.storage.getDirectory()).getFileHandle(e,{create:!0})},v=async e=>{await(await navigator.storage.getDirectory()).getDirectoryHandle(e,{create:!0})},D=async e=>{const o=await(await d(e)).getFile();console.info(await o.text())},p=async(e,t)=>{const o=await d(e),a=t,r=await o.createWritable();await r.write(a),await r.close()},k=async e=>{await(await d(e)).remove()},H=async e=>{await(await u(e)).remove({recursive:!0})},E=async(e,t)=>{const o=await u(e);await(await d(t)).move(o)},R=async(e,t)=>{const o=await navigator.storage.getDirectory(),r=await(await u(e)).getFileHandle(t);console.log(await o.resolve(r))},y=async(e,t=".")=>{const o={},a=e.values(),r=[];for await(const i of a){const m=`${t}/${i.name}`;i.kind==="file"?r.push(i):i.kind==="directory"&&r.push((async()=>({name:i.name,kind:i.kind,relativePath:m,entries:await y(i,m),handle:i}))())}return(await Promise.all(r)).forEach(i=>{o[i.name]=i}),o},f=e=>{const t=document.createElement("ul");for(let o in e){const a=e[o],r=document.createElement("li"),s=a.kind==="directory"?`dir: ${a.name}`:a.name;r.innerText=s,a.kind==="directory"&&a.entries&&r.appendChild(f(a.entries)),t.appendChild(r)}return t},w=async()=>{const e=await navigator.storage.getDirectory();return await y(e)},c=()=>{const e=document.querySelector("#form"),t=new FormData(e);return{fileName:t.get("fileName"),dirName:t.get("dirName"),text:t.get("text")}},L=()=>{document.querySelector("#mCreate").addEventListener("click",()=>{const{fileName:n}=c();g(n)}),document.querySelector("#mCreateDir").addEventListener("click",()=>{const{dirName:n}=c();v(n)}),document.querySelector("#mRead").addEventListener("click",()=>{const{fileName:n}=c();D(n)}),document.querySelector("#mWrite").addEventListener("click",()=>{const{fileName:n,text:l}=c();p(n,l)}),document.querySelector("#mDelete").addEventListener("click",()=>{const{fileName:n}=c();k(n)}),document.querySelector("#mDeleteDir").addEventListener("click",()=>{const{dirName:n}=c();H(n)}),document.querySelector("#mMove").addEventListener("click",()=>{const{fileName:n,dirName:l}=c();E(l,n)}),document.querySelector("#mResolvePath").addEventListener("click",()=>{const{fileName:n,dirName:l}=c();R(l,n)}),document.querySelector("#mList").addEventListener("click",()=>{const n=w();console.info(n)}),document.querySelector("#reset").addEventListener("click",async()=>{(await navigator.storage.getDirectory()).remove({recursive:!0})}),document.querySelector("#reload").addEventListener("click",()=>{window.location.reload()})};function q(){return new Worker("/ui-labs/assets/worker-650d2d52.js")}const N=async()=>{var o,a;const e=await w(),t=f(e);(o=document.querySelector("#mListWrapper"))==null||o.appendChild(t),L(),(a=document.querySelector("#webWorker"))==null||a.addEventListener("click",()=>{const r=new q;r.onmessage=s=>{alert(s.data)},r.postMessage(c())})};N();
