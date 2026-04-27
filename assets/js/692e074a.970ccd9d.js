"use strict";(self.webpackChunkapi_onlyoffice_com=self.webpackChunkapi_onlyoffice_com||[]).push([["690402"],{4410(e,t,r){r.d(t,{A:()=>o});let o={container:"container_unb8",toolbar:"toolbar_w0De",toolbarGroup:"toolbarGroup_Wb9C",toolbarGroupRight:"toolbarGroupRight_p7eS",label:"label_tEpc",selectTrigger:"selectTrigger_Huge",selectContent:"selectContent_yBi6",selectPopup:"selectPopup_ZN3T",selectOption:"selectOption_rLvl",selectIcon:"selectIcon_MQZf",notice:"notice_UIJS",desktopContent:"desktopContent_Az4M",resizeHandle:"resizeHandle_YPVe",resizeHandleGrip:"resizeHandleGrip_c2TW",tabsRoot:"tabsRoot_Bes3",tabsList:"tabsList_jX4U",tabPanel:"tabPanel_FBYA",tab:"tab_Mbpn",editorContainer:"editorContainer_s0wW",runButton:"runButton_tifg",preview:"preview_m4HJ"}},382461(e,t,r){r.r(t),r.d(t,{default:()=>k});var o=r(474848),c=r(983941),i=r(335527),s=r(753572),n=r(509526),a=r(165266),l=r(296540),d=r(830578),u=r(748805),p=r(4811);let m={manager:"Manager",editor:"Editor",viewer:"Viewer","room-selector":"Room selector","file-selector":"File selector",frame:"Frame",system:"System","public-room":"Public room"},h={manager:`const config = {
    src: "https://your-docspace.com",
    mode: "manager",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    showHeader: true,
    showTitle: true,
    showMenu: false,
    showFilter: true,
    disableActionButton: false, // Requires user with appropriate permissions
    infoPanelVisible: true, // Requires user with appropriate permissions
    init: true,
    filter: {
        count: 100,
        page: 1,
        sortorder: "descending",
        sortby: "DateAndTime",
        search: ""
    }
};

DocSpace.SDK.initManager(config);`,editor:`const config = {
    src: "https://your-docspace.com",
    mode: "editor",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    init: false,
    id: 3730262 // Replace with your file ID
};

DocSpace.SDK.initEditor(config);`,viewer:`const config = {
    src: "https://your-docspace.com",
    mode: "viewer",
    editorType: "embedded",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    init: false,
    id: 3730260 // Replace with your file ID
};

DocSpace.SDK.initViewer(config);`,"room-selector":`const config = {
    src: "https://your-docspace.com",
    mode: "room-selector",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    init: true,
    showSelectorCancel: true,
    showSelectorHeader: true,
    withSearch: true,
    acceptButtonLabel: "Select",
    cancelButtonLabel: "Cancel",
    isButtonMode: false,

    events: {
        onSelectCallback: null,
        onCloseCallback: null,
        onAppReady: null,
        onAppError: null
    }
};

DocSpace.SDK.initRoomSelector(config);`,"file-selector":`const config = {
    src: "https://your-docspace.com",
    mode: "file-selector",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    init: true,
    showSelectorCancel: true,
    showSelectorHeader: true,
    withSearch: true,
    acceptButtonLabel: "Select",
    cancelButtonLabel: "Cancel",
    withSubtitle: true,
    filterParam: "ALL",
    isButtonMode: false,

    events: {
        onSelectCallback: null,
        onCloseCallback: null,
        onAppReady: null,
        onAppError: null
    }
};

DocSpace.SDK.initFileSelector(config);`,frame:`const config = {
    src: "https://your-docspace.com",
    mode: "manager",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    init: true
};

DocSpace.SDK.initFrame(config);`,system:`const config = {
    src: "https://your-docspace.com",
    mode: "system",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    init: true,
    events: {
        onAppReady: null,
        onAppError: null
    }
};

DocSpace.SDK.initSystem(config);`,"public-room":`const config = {
    src: "https://your-docspace.com",
    mode: "public-room",
    width: "100%",
    height: "100%",
    frameId: "ds-frame",
    showHeader: true,
    showTitle: true,
    showMenu: false,
    showFilter: true,
    disableActionButton: false,
    infoPanelVisible: false,
    init: true,
    filter: {
        count: 100,
        page: 1,
        sortorder: "descending",
        sortby: "DateAndTime",
        search: "",
        withSubfolders: false
    },
    id: 2613800, // Replace with your room ID
    requestToken: "ZjIrNGhZM2tDbmFnbzRHMmxKODE4Umx5SHdXOUx4OXVpc3BpaTlyN1ZIOD0_IjEzZmQ4MmRkLTVkNTAtNDM0ZC1iZTE0LWM2M2ZkNDJkMDFhNCI", // Replace with your request token
    rootPath: "/rooms/share"
};

DocSpace.SDK.init(config);`},f="https://docspace-duv4mw.onlyoffice.com",S="johnsmith.testing2026@gmail.com",g="0455101f3594b2d0b353ce477735cbe13782b021484f1c8764f5c42e5ef9b1b4",b={manager:"initManager","public-room":"initPublicRoom",viewer:"initViewer",editor:"initEditor","room-selector":"initRoomSelector","file-selector":"initFileSelector",system:"initSystem",frame:"initFrame"},x=(0,l.forwardRef)(({mode:e,theme:t,id:r,requestToken:c,className:i,style:s,autoInit:n=!0},a)=>{let d=(0,l.useRef)(null),u=(0,l.useId)(),p=(0,l.useRef)(`ds-frame-${u.replace(/:/g,"")}`),m=(0,l.useCallback)(()=>{try{let e="u">typeof DocSpace&&DocSpace.SDK?.frames?.[p.current];e?.destroyFrame&&e.destroyFrame()}catch{}},[]),h=(0,l.useCallback)(()=>{let e=d.current;if(!e)return null;m(),e.innerHTML="";let t=document.createElement("div");return t.id=p.current,t.style.width="100%",t.style.height="100%",e.appendChild(t),t},[m]),S=(0,l.useCallback)(e=>{let t=d.current?.querySelector(`#${CSS.escape(p.current)}`);t&&(t.style.cssText="display:flex;align-items:center;justify-content:center;color:#888;font-size:14px;width:100%;height:100%;",t.textContent=e)},[]),g=(0,l.useCallback)(e=>{if(!h())return;let r=p.current,o="dark"===t;try{let t=DocSpace.SDK,c=new Proxy(t,{get(e,t){let c=e[t];return"function"==typeof c&&("init"===t||String(t).startsWith("init"))?t=>{let i=t.src&&"https://your-docspace.com"!==t.src?t.src:f,s={...t,src:i,frameId:r,width:"100%",height:"100%",checkCSP:!1,theme:o?"Dark":"Base"};return c.call(e,s)}:c}});Function("DocSpace",e)({SDK:c})}catch(e){S("Script error: "+(e?.message??e))}},[t,h,S]),x=(0,l.useCallback)(e=>{j().then(()=>g(e)).catch(e=>S(String(e)))},[g,S]);return(0,l.useImperativeHandle)(a,()=>({runScript:x}),[x]),(0,l.useEffect)(()=>{if(!n)return j().catch(()=>{}),m;if(!h())return;let o=p.current;return j().then(()=>(function(){if("u"<typeof DocSpace||!DocSpace.SDK)return void S("DocSpace SDK unavailable.");let i="dark"===t,s={frameId:o,src:f,width:"100%",height:"100%",checkCSP:!1,theme:i?"Dark":"Base",events:{onAppReady(){let e=DocSpace.SDK.frames[o];e?.setConfig&&e.setConfig({theme:i?"Dark":"Base"})},onAppError(e){S("DocSpace error: "+(e?.message??e))}}};if(void 0!==r&&(s.id=r),void 0!==c&&(s.requestToken=c),"public-room"===e){s.mode="public-room",s.rootPath="/rooms/share",DocSpace.SDK.init(s);return}let n=b[e]||"initManager";"function"!=typeof DocSpace.SDK[n]?S(`SDK method "${n}" is not available.`):DocSpace.SDK[n](s)})()).catch(()=>S("Failed to load DocSpace SDK.")),m},[n,e,t,r,c]),(0,o.jsx)("div",{className:i,style:s,ref:d})}),y=null;function j(){return y||(y=new Promise((e,t)=>{function r(){if(!S||!g)return void e();let t="ds-system-login",r=document.createElement("div");r.id=t,r.style.display="none",document.body.appendChild(r),DocSpace.SDK.initSystem({frameId:t,src:f,events:{async onAppReady(){let o=DocSpace.SDK.frames[t];try{await o.login(S,g)}catch{}finally{o.destroyFrame(),r.remove(),e()}},onAppError(){r.remove(),e()}}})}if("u">typeof DocSpace&&DocSpace.SDK)r();else{let e=document.createElement("script");e.src=`${f}/static/scripts/sdk/2.0.0/api.js?src=${encodeURIComponent(f)}`,e.onload=()=>r(),e.onerror=()=>t("Failed to load DocSpace SDK."),document.head.appendChild(e)}}))}var w=r(4410);let D=(0,l.lazy)(()=>Promise.all([r.e("85019"),r.e("949132")]).then(r.bind(r,625927)).then(e=>({default:e.DocSpaceEditor}))),v=({initialMode:e="manager"})=>{let[t,r]=(0,l.useState)(e),[i,s]=(0,l.useState)(h[e]),{colorMode:n,setColorMode:a}=(0,c.G)(),d=(0,l.useRef)(null),u=(0,l.useRef)(!1);(0,l.useEffect)(()=>{u.current||(u.current=!0,d.current?.runScript(i))},[]);let p=(0,l.useRef)(n);(0,l.useEffect)(()=>{p.current!==n&&(p.current=n,d.current?.runScript(i))},[n]);let m=(0,l.useCallback)(e=>{r(e);let t=h[e];s(t),d.current?.runScript(t)},[]),f=(0,l.useCallback)(()=>{d.current?.runScript(i)},[i]);return(0,o.jsxs)("div",{className:w.A.container,children:[(0,o.jsx)(C,{mode:t,onModeChange:m,theme:n,onThemeChange:a}),(0,o.jsx)("div",{className:w.A.notice,children:"This playground may not work in Safari or incognito/private browsing mode due to third-party cookie restrictions."}),(0,o.jsx)(A,{script:i,onScriptChange:s,onRun:f,previewRef:d,mode:t,theme:n})]})},C=({mode:e,onModeChange:t,theme:r,onThemeChange:c})=>(0,o.jsxs)("div",{className:w.A.toolbar,children:[(0,o.jsxs)("div",{className:w.A.toolbarGroup,children:[(0,o.jsx)("div",{className:w.A.label,children:"Mode:"}),(0,o.jsxs)(d.bL,{value:e,onValueChange:e=>t(e),children:[(0,o.jsxs)(d.l9,{className:w.A.selectTrigger,children:[(0,o.jsx)(d.WT,{}),(0,o.jsx)(d.In,{asChild:!0,children:(0,o.jsx)("div",{className:w.A.selectIcon})})]}),(0,o.jsx)(d.ZL,{children:(0,o.jsx)(d.UC,{className:w.A.selectContent,position:"popper",children:(0,o.jsx)(d.LM,{className:w.A.selectPopup,children:Object.keys(m).map(e=>(0,o.jsx)(d.q7,{value:e,className:w.A.selectOption,children:(0,o.jsx)(d.p4,{children:m[e]})},e))})})})]})]}),(0,o.jsxs)("div",{className:`${w.A.toolbarGroup} ${w.A.toolbarGroupRight}`,children:[(0,o.jsx)("div",{className:w.A.label,children:"Theme:"}),(0,o.jsxs)(d.bL,{value:r,onValueChange:e=>c(e),children:[(0,o.jsxs)(d.l9,{className:w.A.selectTrigger,children:[(0,o.jsx)(d.WT,{}),(0,o.jsx)(d.In,{asChild:!0,children:(0,o.jsx)("div",{className:w.A.selectIcon})})]}),(0,o.jsx)(d.ZL,{children:(0,o.jsx)(d.UC,{className:w.A.selectContent,position:"popper",children:(0,o.jsxs)(d.LM,{className:w.A.selectPopup,children:[(0,o.jsx)(d.q7,{value:"light",className:w.A.selectOption,children:(0,o.jsx)(d.p4,{children:"Light"})}),(0,o.jsx)(d.q7,{value:"dark",className:w.A.selectOption,children:(0,o.jsx)(d.p4,{children:"Dark"})})]})})})]})]})]}),A=({script:e,onScriptChange:t,onRun:r,previewRef:c,mode:i,theme:s})=>!function(e="(max-width: 767px)"){let[t,r]=(0,l.useState)(!1);return(0,l.useEffect)(()=>{let t=window.matchMedia(e);r(t.matches);let o=e=>r(e.matches);return t.addEventListener("change",o),()=>t.removeEventListener("change",o)},[e]),t}()?(0,o.jsxs)(p.YZ,{direction:"horizontal",className:w.A.desktopContent,children:[(0,o.jsx)(p.Zk,{minSize:20,defaultSize:40,children:(0,o.jsx)(l.Suspense,{children:(0,o.jsx)(D,{value:e,onChange:t,onRun:r,theme:s})})}),(0,o.jsx)(p.TW,{className:w.A.resizeHandle,children:(0,o.jsx)("div",{className:w.A.resizeHandleGrip,children:(0,o.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("circle",{cx:"9",cy:"12",r:"1"}),(0,o.jsx)("circle",{cx:"9",cy:"5",r:"1"}),(0,o.jsx)("circle",{cx:"9",cy:"19",r:"1"}),(0,o.jsx)("circle",{cx:"15",cy:"12",r:"1"}),(0,o.jsx)("circle",{cx:"15",cy:"5",r:"1"}),(0,o.jsx)("circle",{cx:"15",cy:"19",r:"1"})]})})}),(0,o.jsx)(p.Zk,{minSize:20,defaultSize:60,children:(0,o.jsx)(x,{ref:c,mode:i,theme:s,autoInit:!1,className:w.A.preview})})]}):(0,o.jsxs)(u.bL,{className:w.A.tabsRoot,defaultValue:"editor",children:[(0,o.jsxs)(u.B8,{className:w.A.tabsList,children:[(0,o.jsx)(u.l9,{value:"editor",className:w.A.tab,children:"Editor"}),(0,o.jsx)(u.l9,{value:"preview",className:w.A.tab,children:"Preview"})]}),(0,o.jsx)(u.UC,{value:"editor",className:w.A.tabPanel,children:(0,o.jsx)(l.Suspense,{children:(0,o.jsx)(D,{value:e,onChange:t,onRun:r,theme:s})})}),(0,o.jsx)(u.UC,{value:"preview",className:w.A.tabPanel,children:(0,o.jsx)(x,{ref:c,mode:i,theme:s,autoInit:!1,className:w.A.preview})})]}),k=()=>{let e=(0,i.zy)(),{mode:t}=(0,a.j)(e.search,{mode:"mode"});return(0,o.jsxs)(c.a,{children:[(0,o.jsxs)(s.A,{children:[(0,o.jsx)("title",{children:"DocSpace SDK Playground | ONLYOFFICE"}),(0,o.jsx)("meta",{name:"description",content:"An interactive platform to explore and test ONLYOFFICE DocSpace SDK embedding modes \u2014 manager, editor, viewer, selectors, and more."}),(0,o.jsx)("meta",{property:"og:title",content:"DocSpace SDK Playground | ONLYOFFICE"}),(0,o.jsx)("meta",{property:"og:description",content:"An interactive platform to explore and test ONLYOFFICE DocSpace SDK embedding modes \u2014 manager, editor, viewer, selectors, and more."})]}),(0,o.jsx)(n.default,{children:()=>(0,o.jsx)(v,{initialMode:t})})]})}},165266(e,t,r){function o(e){if("u"<typeof window)return e;let t=location.href;return(t=t.substring(0,t.lastIndexOf("/")))+e}function c(e,t){let r=new URLSearchParams(e),o={};for(let e in t){let c=t[e],i="string"==typeof c?c:c.paramName,s="string"==typeof c?void 0:c.defaultValue,n=r.get(i);null!==n?o[e]=n:void 0!==s&&(o[e]=s)}return o}r.d(t,{b:()=>o,j:()=>c})}}]);