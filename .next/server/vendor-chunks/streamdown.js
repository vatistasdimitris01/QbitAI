"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/streamdown";
exports.ids = ["vendor-chunks/streamdown"];
exports.modules = {

/***/ "(ssr)/./node_modules/streamdown/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/streamdown/dist/index.js ***!
  \***********************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShikiThemeContext: () => (/* binding */ k),
/* harmony export */   Streamdown: () => (/* binding */ P),
/* harmony export */   "default": () => (/* binding */ xe)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(ssr)/./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-markdown */ "(ssr)/./node_modules/react-markdown/lib/index.js");
/* harmony import */ var rehype_katex__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rehype-katex */ "(ssr)/./node_modules/rehype-katex/lib/index.js");
/* harmony import */ var remark_gfm__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! remark-gfm */ "(ssr)/./node_modules/remark-gfm/lib/index.js");
/* harmony import */ var remark_math__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! remark-math */ "(ssr)/./node_modules/remark-math/lib/index.js");
/* harmony import */ var katex_dist_katex_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! katex/dist/katex.min.css */ "(ssr)/./node_modules/katex/dist/katex.min.css");
/* harmony import */ var harden_react_markdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! harden-react-markdown */ "(ssr)/./node_modules/harden-react-markdown/dist/index.js");
/* harmony import */ var _barrel_optimize_names_CheckIcon_CopyIcon_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=CheckIcon,CopyIcon!=!lucide-react */ "(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/icons/check.js");
/* harmony import */ var _barrel_optimize_names_CheckIcon_CopyIcon_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! __barrel_optimize__?names=CheckIcon,CopyIcon!=!lucide-react */ "(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/icons/copy.js");
/* harmony import */ var shiki__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! shiki */ "shiki");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clsx */ "(ssr)/./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tailwind-merge */ "(ssr)/./node_modules/tailwind-merge/dist/bundle-mjs.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "(ssr)/./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js");
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! marked */ "(ssr)/./node_modules/marked/lib/marked.esm.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([shiki__WEBPACK_IMPORTED_MODULE_3__]);
shiki__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/* __next_internal_client_entry_do_not_use__ ShikiThemeContext,Streamdown,default auto */ 












var s = (...e)=>(0,tailwind_merge__WEBPACK_IMPORTED_MODULE_5__.twMerge)((0,clsx__WEBPACK_IMPORTED_MODULE_4__.clsx)(e));

var C = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
    code: ""
});
async function D(e, t, n) {
    return await (0,shiki__WEBPACK_IMPORTED_MODULE_3__.codeToHtml)(e, {
        lang: t,
        theme: n
    });
}
var M = ({ code: e, language: t, className: n, children: o, ...r })=>{
    let [a, l] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""), c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(k);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        let d = !0;
        return D(e, t, c).then((m)=>{
            d && l(m);
        }), ()=>{
            d = !1;
        };
    }, [
        e,
        t,
        c
    ]), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(C.Provider, {
        value: {
            code: e
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "group relative",
            children: [
                (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    className: s("overflow-x-auto", n),
                    dangerouslySetInnerHTML: {
                        __html: a
                    },
                    ...r
                }),
                o
            ]
        })
    });
}, B = ({ onCopy: e, onError: t, timeout: n = 2e3, children: o, className: r, ...a })=>{
    let [l, c] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1), { code: d } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(C), m = async ()=>{
        var p;
        if (true) {
            t == null || t(new Error("Clipboard API not available"));
            return;
        }
        try {
            await navigator.clipboard.writeText(d), c(!0), e == null || e(), setTimeout(()=>c(!1), n);
        } catch (f) {
            t == null || t(f);
        }
    }, g = l ? _barrel_optimize_names_CheckIcon_CopyIcon_lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"] : _barrel_optimize_names_CheckIcon_CopyIcon_lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"];
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
        className: s("absolute top-2 right-2 shrink-0 rounded-md p-3 opacity-0 transition-all", "hover:bg-secondary group-hover:opacity-100", r),
        onClick: m,
        type: "button",
        ...a,
        children: o != null ? o : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(g, {
            size: 14
        })
    });
};

var I = {
    ol: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("ol", {
            className: s("ml-4 list-outside list-decimal", n),
            ...o,
            children: t
        }),
    li: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("li", {
            className: s("py-1", n),
            ...o,
            children: t
        }),
    ul: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("ul", {
            className: s("ml-4 list-outside list-disc", n),
            ...o,
            children: t
        }),
    hr: ({ node: e, className: t, ...n })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("hr", {
            className: s("my-6 border-border", t),
            ...n
        }),
    strong: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            className: s("font-semibold", n),
            ...o,
            children: t
        }),
    a: ({ node: e, children: t, className: n, href: o, ...r })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
            className: s("font-medium text-primary underline", n),
            href: o,
            rel: "noreferrer",
            target: "_blank",
            ...r,
            children: t
        }),
    h1: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h1", {
            className: s("mt-6 mb-2 font-semibold text-3xl", n),
            ...o,
            children: t
        }),
    h2: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h2", {
            className: s("mt-6 mb-2 font-semibold text-2xl", n),
            ...o,
            children: t
        }),
    h3: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3", {
            className: s("mt-6 mb-2 font-semibold text-xl", n),
            ...o,
            children: t
        }),
    h4: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h4", {
            className: s("mt-6 mb-2 font-semibold text-lg", n),
            ...o,
            children: t
        }),
    h5: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h5", {
            className: s("mt-6 mb-2 font-semibold text-base", n),
            ...o,
            children: t
        }),
    h6: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h6", {
            className: s("mt-6 mb-2 font-semibold text-sm", n),
            ...o,
            children: t
        }),
    table: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "my-4 overflow-x-auto",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("table", {
                className: s("w-full border-collapse border border-border", n),
                ...o,
                children: t
            })
        }),
    thead: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("thead", {
            className: s("bg-muted/50", n),
            ...o,
            children: t
        }),
    tbody: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("tbody", {
            className: s("divide-y divide-border", n),
            ...o,
            children: t
        }),
    tr: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("tr", {
            className: s("border-border border-b", n),
            ...o,
            children: t
        }),
    th: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("th", {
            className: s("px-4 py-2 text-left font-semibold text-sm", n),
            ...o,
            children: t
        }),
    td: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
            className: s("px-4 py-2 text-sm", n),
            ...o,
            children: t
        }),
    blockquote: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("blockquote", {
            className: s("my-4 border-muted-foreground/30 border-l-4 pl-4 text-muted-foreground italic", n),
            ...o,
            children: t
        }),
    code: ({ node: e, className: t, ...n })=>{
        var r, a;
        return ((r = e == null ? void 0 : e.position) == null ? void 0 : r.start.line) === ((a = e == null ? void 0 : e.position) == null ? void 0 : a.end.line) ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("code", {
            className: s("rounded bg-muted px-1.5 py-0.5 font-mono text-sm", t),
            ...n
        }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("code", {
            className: t,
            ...n
        });
    },
    pre: ({ node: e, className: t, children: n })=>{
        var a;
        let o = "javascript";
        typeof ((a = e == null ? void 0 : e.properties) == null ? void 0 : a.className) == "string" && (o = e.properties.className.replace("language-", ""));
        let r = "";
        return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(n) && n.props && typeof n.props == "object" && "children" in n.props && typeof n.props.children == "string" ? r = n.props.children : typeof n == "string" && (r = n), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(M, {
            className: s("my-4 h-auto rounded-lg border p-4", t),
            code: r,
            language: o,
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(B, {})
        });
    },
    sup: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("sup", {
            className: s("text-sm", n),
            ...o,
            children: t
        }),
    sub: ({ node: e, children: t, className: n, ...o })=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("sub", {
            className: s("text-sm", n),
            ...o,
            children: t
        })
};

var $ = (e)=>marked__WEBPACK_IMPORTED_MODULE_9__.marked.lexer(e).map((n)=>n.raw);
var z = /(!?\[)([^\]]*?)$/, G = /(\*\*)([^*]*?)$/, F = /(__)([^_]*?)$/, J = /(\*\*\*)([^*]*?)$/, Q = /(\*)([^*]*?)$/, X = /(_)([^_]*?)$/, Y = /(`)([^`]*?)$/, Z = /(~~)([^~]*?)$/, j = /(\$)([^$]*?)$/, E = /(\$\$)([^$]*?)$/, x = (e)=>{
    let t = e.match(z);
    if (t) {
        let n = e.lastIndexOf(t[1]);
        return e.substring(0, n);
    }
    return e;
}, ee = (e)=>e.match(G) && (e.match(/\*\*/g) || []).length % 2 === 1 ? `${e}**` : e, te = (e)=>e.match(F) && (e.match(/__/g) || []).length % 2 === 1 ? `${e}__` : e, ne = (e)=>e.split("").reduce((t, n, o)=>{
        if (n === "*") {
            let r = e[o - 1], a = e[o + 1];
            if (r === "\\") return t;
            if (r !== "*" && a !== "*") return t + 1;
        }
        return t;
    }, 0), oe = (e)=>e.match(Q) && ne(e) % 2 === 1 ? `${e}*` : e, re = (e)=>e.split("").reduce((t, n, o)=>{
        if (n === "_") {
            let r = e[o - 1], a = e[o + 1];
            if (r === "\\") return t;
            if (r !== "_" && a !== "_") return t + 1;
        }
        return t;
    }, 0), se = (e)=>e.match(X) && re(e) % 2 === 1 ? `${e}_` : e, ie = (e, t)=>{
    let n = e.substring(t, t + 3) === "```", o = t > 0 && e.substring(t - 1, t + 2) === "```", r = t > 1 && e.substring(t - 2, t + 1) === "```";
    return n || o || r;
}, ae = (e)=>{
    let t = 0;
    for(let n = 0; n < e.length; n++)e[n] === "`" && !ie(e, n) && t++;
    return t;
}, ce = (e)=>{
    if (e.match(/^```[^`\n]*```?$/) && !e.includes(`
`)) return e.endsWith("``") && !e.endsWith("```") ? `${e}\`` : e;
    let n = (e.match(/```/g) || []).length, o = n % 2 === 1;
    return (e.endsWith("```\n") || e.endsWith("```")) && n % 2 === 0 || n > 0 && n % 2 === 0 && e.includes(`
`) ? e : e.match(Y) && !o && ae(e) % 2 === 1 ? `${e}\`` : e;
}, le = (e)=>e.match(Z) && (e.match(/~~/g) || []).length % 2 === 1 ? `${e}~~` : e, de = (e)=>e.split("").reduce((t, n, o)=>{
        if (n === "$") {
            let r = e[o - 1], a = e[o + 1];
            if (r === "\\") return t;
            if (r !== "$" && a !== "$") return t + 1;
        }
        return t;
    }, 0), me = (e)=>e.match(E) && (e.match(/\$\$/g) || []).length % 2 === 1 ? `${e}$$` : e, pe = (e)=>e.match(j) && de(e) % 2 === 1 ? `${e}$` : e, ue = (e)=>{
    let t = 0, n = e.match(/\*+/g) || [];
    for (let o of n){
        let r = o.length;
        r >= 3 && (t += Math.floor(r / 3));
    }
    return t;
}, he = (e)=>/^\*{4,}$/.test(e) ? e : e.match(J) && ue(e) % 2 === 1 ? `${e}***` : e, N = (e)=>{
    if (!e || typeof e != "string") return e;
    let t = e;
    return t = x(t), t = he(t), t = ee(t), t = te(t), t = oe(t), t = se(t), t = ce(t), t = le(t), t = me(t), t = pe(t), t;
};

var Me = harden_react_markdown__WEBPACK_IMPORTED_MODULE_2__["default"] || harden_react_markdown__WEBPACK_IMPORTED_MODULE_2__, Be = Me(react_markdown__WEBPACK_IMPORTED_MODULE_10__.Markdown), k = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)("github-light"), Ie = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(({ content: e, shouldParseIncompleteMarkdown: t, ...n })=>{
    let o = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>typeof e == "string" && t ? N(e.trim()) : e, [
        e,
        t
    ]);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Be, {
        ...n,
        children: o
    });
}, (e, t)=>e.content === t.content), P = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(({ children: e, allowedImagePrefixes: t, allowedLinkPrefixes: n, defaultOrigin: o, parseIncompleteMarkdown: r = !0, components: a, rehypePlugins: l, remarkPlugins: c, className: d, shikiTheme: m = "github-light", ...g })=>{
    let p = (0,react__WEBPACK_IMPORTED_MODULE_0__.useId)(), f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>$(typeof e == "string" ? e : ""), [
        e
    ]);
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(k.Provider, {
        value: m,
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: s("space-y-4", d),
            ...g,
            children: f.map((S, _)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Ie, {
                    allowedImagePrefixes: t != null ? t : [
                        "*"
                    ],
                    allowedLinkPrefixes: n != null ? n : [
                        "*"
                    ],
                    components: {
                        ...I,
                        ...a
                    },
                    content: S,
                    defaultOrigin: o,
                    rehypePlugins: [
                        rehype_katex__WEBPACK_IMPORTED_MODULE_11__["default"],
                        ...l != null ? l : []
                    ],
                    remarkPlugins: [
                        remark_gfm__WEBPACK_IMPORTED_MODULE_12__["default"],
                        remark_math__WEBPACK_IMPORTED_MODULE_13__["default"],
                        ...c != null ? c : []
                    ],
                    shouldParseIncompleteMarkdown: r
                }, `${p}-block_${_}`))
        })
    });
}, (e, t)=>e.children === t.children && e.shikiTheme === t.shikiTheme);
P.displayName = "Streamdown";
var xe = P;


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/Icon.js":
/*!****************************************************************************!*\
  !*** ./node_modules/streamdown/node_modules/lucide-react/dist/esm/Icon.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Icon)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultAttributes.js */ \"(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/defaultAttributes.js\");\n/* harmony import */ var _shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/src/utils.js */ \"(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/shared/src/utils.js\");\n/**\n * @license lucide-react v0.539.0 - ISC\n *\n * This source code is licensed under the ISC license.\n * See the LICENSE file in the root directory of this source tree.\n */ \n\n\nconst Icon = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({ color = \"currentColor\", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = \"\", children, iconNode, ...rest }, ref)=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"svg\", {\n        ref,\n        ..._defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n        width: size,\n        height: size,\n        stroke: color,\n        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,\n        className: (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.mergeClasses)(\"lucide\", className),\n        ...!children && !(0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.hasA11yProp)(rest) && {\n            \"aria-hidden\": \"true\"\n        },\n        ...rest\n    }, [\n        ...iconNode.map(([tag, attrs])=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(tag, attrs)),\n        ...Array.isArray(children) ? children : [\n            children\n        ]\n    ]));\n //# sourceMappingURL=Icon.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyZWFtZG93bi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL0ljb24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxNQUFNLHFCQUFPLGtEQUNYLENBQ0UsRUFDRSxRQUFRLGdCQUNSLE9BQU8sSUFDUCxjQUFjLEdBQ2QscUJBQ0EsWUFBWSxJQUNaLFVBQ0EsVUFDQSxHQUFHLFFBRUwsb0JBRUEscURBQ0UsT0FDQTtRQUNFO1FBQ0EsR0FBRztRQUNILE9BQU87UUFDUCxRQUFRO1FBQ1IsUUFBUTtRQUNSLGFBQWEsc0JBQXVCLE9BQU8sV0FBVyxJQUFJLEtBQU0sT0FBTyxJQUFJLElBQUk7UUFDL0UsV0FBVyxtRUFBYSxVQUFVLFNBQVM7UUFDM0MsR0FBSSxDQUFDLFlBQVksQ0FBQyxrRUFBWSxJQUFJLEtBQUs7WUFBRSxlQUFlO1FBQUEsQ0FBTztRQUMvRCxHQUFHO0lBQUEsQ0FDTCxFQUNBO1dBQ0ssU0FBUyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssa0JBQU0scURBQWMsS0FBSyxLQUFLLENBQUM7V0FDdkQsTUFBTSxRQUFRLFFBQVEsSUFBSSxXQUFXO1lBQUMsUUFBUTtTQUFBO0tBQUEiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcYW50MTBcXERvd25sb2Fkc1xcc3JjXFxJY29uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGZvcndhcmRSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgZGVmYXVsdEF0dHJpYnV0ZXMgZnJvbSAnLi9kZWZhdWx0QXR0cmlidXRlcyc7XG5pbXBvcnQgeyBJY29uTm9kZSwgTHVjaWRlUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IG1lcmdlQ2xhc3NlcywgaGFzQTExeVByb3AgfSBmcm9tICdAbHVjaWRlL3NoYXJlZCc7XG5cbmludGVyZmFjZSBJY29uQ29tcG9uZW50UHJvcHMgZXh0ZW5kcyBMdWNpZGVQcm9wcyB7XG4gIGljb25Ob2RlOiBJY29uTm9kZTtcbn1cblxuLyoqXG4gKiBMdWNpZGUgaWNvbiBjb21wb25lbnRcbiAqXG4gKiBAY29tcG9uZW50IEljb25cbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wc1xuICogQHBhcmFtIHtzdHJpbmd9IHByb3BzLmNvbG9yIC0gVGhlIGNvbG9yIG9mIHRoZSBpY29uXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvcHMuc2l6ZSAtIFRoZSBzaXplIG9mIHRoZSBpY29uXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvcHMuc3Ryb2tlV2lkdGggLSBUaGUgc3Ryb2tlIHdpZHRoIG9mIHRoZSBpY29uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHByb3BzLmFic29sdXRlU3Ryb2tlV2lkdGggLSBXaGV0aGVyIHRvIHVzZSBhYnNvbHV0ZSBzdHJva2Ugd2lkdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wcy5jbGFzc05hbWUgLSBUaGUgY2xhc3MgbmFtZSBvZiB0aGUgaWNvblxuICogQHBhcmFtIHtJY29uTm9kZX0gcHJvcHMuY2hpbGRyZW4gLSBUaGUgY2hpbGRyZW4gb2YgdGhlIGljb25cbiAqIEBwYXJhbSB7SWNvbk5vZGV9IHByb3BzLmljb25Ob2RlIC0gVGhlIGljb24gbm9kZSBvZiB0aGUgaWNvblxuICpcbiAqIEByZXR1cm5zIHtGb3J3YXJkUmVmRXhvdGljQ29tcG9uZW50fSBMdWNpZGVJY29uXG4gKi9cbmNvbnN0IEljb24gPSBmb3J3YXJkUmVmPFNWR1NWR0VsZW1lbnQsIEljb25Db21wb25lbnRQcm9wcz4oXG4gIChcbiAgICB7XG4gICAgICBjb2xvciA9ICdjdXJyZW50Q29sb3InLFxuICAgICAgc2l6ZSA9IDI0LFxuICAgICAgc3Ryb2tlV2lkdGggPSAyLFxuICAgICAgYWJzb2x1dGVTdHJva2VXaWR0aCxcbiAgICAgIGNsYXNzTmFtZSA9ICcnLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBpY29uTm9kZSxcbiAgICAgIC4uLnJlc3RcbiAgICB9LFxuICAgIHJlZixcbiAgKSA9PlxuICAgIGNyZWF0ZUVsZW1lbnQoXG4gICAgICAnc3ZnJyxcbiAgICAgIHtcbiAgICAgICAgcmVmLFxuICAgICAgICAuLi5kZWZhdWx0QXR0cmlidXRlcyxcbiAgICAgICAgd2lkdGg6IHNpemUsXG4gICAgICAgIGhlaWdodDogc2l6ZSxcbiAgICAgICAgc3Ryb2tlOiBjb2xvcixcbiAgICAgICAgc3Ryb2tlV2lkdGg6IGFic29sdXRlU3Ryb2tlV2lkdGggPyAoTnVtYmVyKHN0cm9rZVdpZHRoKSAqIDI0KSAvIE51bWJlcihzaXplKSA6IHN0cm9rZVdpZHRoLFxuICAgICAgICBjbGFzc05hbWU6IG1lcmdlQ2xhc3NlcygnbHVjaWRlJywgY2xhc3NOYW1lKSxcbiAgICAgICAgLi4uKCFjaGlsZHJlbiAmJiAhaGFzQTExeVByb3AocmVzdCkgJiYgeyAnYXJpYS1oaWRkZW4nOiAndHJ1ZScgfSksXG4gICAgICAgIC4uLnJlc3QsXG4gICAgICB9LFxuICAgICAgW1xuICAgICAgICAuLi5pY29uTm9kZS5tYXAoKFt0YWcsIGF0dHJzXSkgPT4gY3JlYXRlRWxlbWVudCh0YWcsIGF0dHJzKSksXG4gICAgICAgIC4uLihBcnJheS5pc0FycmF5KGNoaWxkcmVuKSA/IGNoaWxkcmVuIDogW2NoaWxkcmVuXSksXG4gICAgICBdLFxuICAgICksXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBJY29uO1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/Icon.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/createLucideIcon.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/streamdown/node_modules/lucide-react/dist/esm/createLucideIcon.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createLucideIcon)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/src/utils.js */ \"(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/shared/src/utils.js\");\n/* harmony import */ var _Icon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon.js */ \"(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/Icon.js\");\n/**\n * @license lucide-react v0.539.0 - ISC\n *\n * This source code is licensed under the ISC license.\n * See the LICENSE file in the root directory of this source tree.\n */ \n\n\nconst createLucideIcon = (iconName, iconNode)=>{\n    const Component = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({ className, ...props }, ref)=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Icon_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n            ref,\n            iconNode,\n            className: (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.mergeClasses)(`lucide-${(0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.toKebabCase)((0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.toPascalCase)(iconName))}`, `lucide-${iconName}`, className),\n            ...props\n        }));\n    Component.displayName = (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.toPascalCase)(iconName);\n    return Component;\n};\n //# sourceMappingURL=createLucideIcon.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyZWFtZG93bi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2NyZWF0ZUx1Y2lkZUljb24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQVdBLE1BQU0sbUJBQW1CLENBQUMsVUFBa0I7SUFDMUMsTUFBTSwwQkFBWSxrREFBdUMsQ0FBQyxFQUFFLFdBQVcsR0FBRyxPQUFNLEVBQUcsb0JBQ2pGLHFEQUFjLGtEQUFNO1lBQ2xCO1lBQ0E7WUFDQSxXQUFXLG1FQUNULFVBQVUsa0VBQVksbUVBQWEsUUFBUSxDQUFDLENBQUMsSUFDN0MsVUFBVSxRQUFRLElBQ2xCO1lBRUYsR0FBRztRQUFBLENBQ0o7SUFHSCxVQUFVLGNBQWMsbUVBQWEsUUFBUTtJQUU3QyxPQUFPO0FBQ1QiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcYW50MTBcXERvd25sb2Fkc1xcc3JjXFxjcmVhdGVMdWNpZGVJY29uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGZvcndhcmRSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtZXJnZUNsYXNzZXMsIHRvS2ViYWJDYXNlLCB0b1Bhc2NhbENhc2UgfSBmcm9tICdAbHVjaWRlL3NoYXJlZCc7XG5pbXBvcnQgeyBJY29uTm9kZSwgTHVjaWRlUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCBJY29uIGZyb20gJy4vSWNvbic7XG5cbi8qKlxuICogQ3JlYXRlIGEgTHVjaWRlIGljb24gY29tcG9uZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gaWNvbk5hbWVcbiAqIEBwYXJhbSB7YXJyYXl9IGljb25Ob2RlXG4gKiBAcmV0dXJucyB7Rm9yd2FyZFJlZkV4b3RpY0NvbXBvbmVudH0gTHVjaWRlSWNvblxuICovXG5jb25zdCBjcmVhdGVMdWNpZGVJY29uID0gKGljb25OYW1lOiBzdHJpbmcsIGljb25Ob2RlOiBJY29uTm9kZSkgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSBmb3J3YXJkUmVmPFNWR1NWR0VsZW1lbnQsIEx1Y2lkZVByb3BzPigoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0sIHJlZikgPT5cbiAgICBjcmVhdGVFbGVtZW50KEljb24sIHtcbiAgICAgIHJlZixcbiAgICAgIGljb25Ob2RlLFxuICAgICAgY2xhc3NOYW1lOiBtZXJnZUNsYXNzZXMoXG4gICAgICAgIGBsdWNpZGUtJHt0b0tlYmFiQ2FzZSh0b1Bhc2NhbENhc2UoaWNvbk5hbWUpKX1gLFxuICAgICAgICBgbHVjaWRlLSR7aWNvbk5hbWV9YCxcbiAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgKSxcbiAgICAgIC4uLnByb3BzLFxuICAgIH0pLFxuICApO1xuXG4gIENvbXBvbmVudC5kaXNwbGF5TmFtZSA9IHRvUGFzY2FsQ2FzZShpY29uTmFtZSk7XG5cbiAgcmV0dXJuIENvbXBvbmVudDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUx1Y2lkZUljb247XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/createLucideIcon.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/defaultAttributes.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/streamdown/node_modules/lucide-react/dist/esm/defaultAttributes.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ defaultAttributes)\n/* harmony export */ });\n/**\n * @license lucide-react v0.539.0 - ISC\n *\n * This source code is licensed under the ISC license.\n * See the LICENSE file in the root directory of this source tree.\n */ var defaultAttributes = {\n    xmlns: \"http://www.w3.org/2000/svg\",\n    width: 24,\n    height: 24,\n    viewBox: \"0 0 24 24\",\n    fill: \"none\",\n    stroke: \"currentColor\",\n    strokeWidth: 2,\n    strokeLinecap: \"round\",\n    strokeLinejoin: \"round\"\n};\n //# sourceMappingURL=defaultAttributes.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyZWFtZG93bi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2RlZmF1bHRBdHRyaWJ1dGVzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztJQUFBLHdCQUFlO0lBQ2IsT0FBTztJQUNQLE9BQU87SUFDUCxRQUFRO0lBQ1IsU0FBUztJQUNULE1BQU07SUFDTixRQUFRO0lBQ1IsYUFBYTtJQUNiLGVBQWU7SUFDZixnQkFBZ0I7QUFDbEIiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcYW50MTBcXERvd25sb2Fkc1xcc3JjXFxkZWZhdWx0QXR0cmlidXRlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIHhtbG5zOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICB3aWR0aDogMjQsXG4gIGhlaWdodDogMjQsXG4gIHZpZXdCb3g6ICcwIDAgMjQgMjQnLFxuICBmaWxsOiAnbm9uZScsXG4gIHN0cm9rZTogJ2N1cnJlbnRDb2xvcicsXG4gIHN0cm9rZVdpZHRoOiAyLFxuICBzdHJva2VMaW5lY2FwOiAncm91bmQnLFxuICBzdHJva2VMaW5lam9pbjogJ3JvdW5kJyxcbn07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/defaultAttributes.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/icons/check.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/streamdown/node_modules/lucide-react/dist/esm/icons/check.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   __iconNode: () => (/* binding */ __iconNode),\n/* harmony export */   \"default\": () => (/* binding */ Check)\n/* harmony export */ });\n/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ \"(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/createLucideIcon.js\");\n/**\n * @license lucide-react v0.539.0 - ISC\n *\n * This source code is licensed under the ISC license.\n * See the LICENSE file in the root directory of this source tree.\n */ \nconst __iconNode = [\n    [\n        \"path\",\n        {\n            d: \"M20 6 9 17l-5-5\",\n            key: \"1gmf2c\"\n        }\n    ]\n];\nconst Check = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"check\", __iconNode);\n //# sourceMappingURL=check.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyZWFtZG93bi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2NoZWNrLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdPLE1BQU0sYUFBdUI7SUFBQztRQUFDO1FBQVE7WUFBRSxHQUFHO1lBQW1CLEtBQUs7UUFBQSxDQUFVO0tBQUM7Q0FBQTtBQWF0RixNQUFNLFFBQVEsaUVBQWlCLFNBQVMsVUFBVSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxhbnQxMFxcc3JjXFxpY29uc1xcY2hlY2sudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbic7XG5pbXBvcnQgeyBJY29uTm9kZSB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IF9faWNvbk5vZGU6IEljb25Ob2RlID0gW1sncGF0aCcsIHsgZDogJ00yMCA2IDkgMTdsLTUtNScsIGtleTogJzFnbWYyYycgfV1dO1xuXG4vKipcbiAqIEBjb21wb25lbnQgQG5hbWUgQ2hlY2tcbiAqIEBkZXNjcmlwdGlvbiBMdWNpZGUgU1ZHIGljb24gY29tcG9uZW50LCByZW5kZXJzIFNWRyBFbGVtZW50IHdpdGggY2hpbGRyZW4uXG4gKlxuICogQHByZXZpZXcgIVtpbWddKGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklnb2dJSGRwWkhSb1BTSXlOQ0lLSUNCb1pXbG5hSFE5SWpJMElnb2dJSFpwWlhkQ2IzZzlJakFnTUNBeU5DQXlOQ0lLSUNCbWFXeHNQU0p1YjI1bElnb2dJSE4wY205clpUMGlJekF3TUNJZ2MzUjViR1U5SW1KaFkydG5jbTkxYm1RdFkyOXNiM0k2SUNObVptWTdJR0p2Y21SbGNpMXlZV1JwZFhNNklESndlQ0lLSUNCemRISnZhMlV0ZDJsa2RHZzlJaklpQ2lBZ2MzUnliMnRsTFd4cGJtVmpZWEE5SW5KdmRXNWtJZ29nSUhOMGNtOXJaUzFzYVc1bGFtOXBiajBpY205MWJtUWlDajRLSUNBOGNHRjBhQ0JrUFNKTk1qQWdOaUE1SURFM2JDMDFMVFVpSUM4K0Nqd3ZjM1puUGdvPSkgLSBodHRwczovL2x1Y2lkZS5kZXYvaWNvbnMvY2hlY2tcbiAqIEBzZWUgaHR0cHM6Ly9sdWNpZGUuZGV2L2d1aWRlL3BhY2thZ2VzL2x1Y2lkZS1yZWFjdCAtIERvY3VtZW50YXRpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBMdWNpZGUgaWNvbnMgcHJvcHMgYW5kIGFueSB2YWxpZCBTVkcgYXR0cmlidXRlXG4gKiBAcmV0dXJucyB7SlNYLkVsZW1lbnR9IEpTWCBFbGVtZW50XG4gKlxuICovXG5jb25zdCBDaGVjayA9IGNyZWF0ZUx1Y2lkZUljb24oJ2NoZWNrJywgX19pY29uTm9kZSk7XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrO1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/icons/check.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/icons/copy.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/streamdown/node_modules/lucide-react/dist/esm/icons/copy.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   __iconNode: () => (/* binding */ __iconNode),\n/* harmony export */   \"default\": () => (/* binding */ Copy)\n/* harmony export */ });\n/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ \"(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/createLucideIcon.js\");\n/**\n * @license lucide-react v0.539.0 - ISC\n *\n * This source code is licensed under the ISC license.\n * See the LICENSE file in the root directory of this source tree.\n */ \nconst __iconNode = [\n    [\n        \"rect\",\n        {\n            width: \"14\",\n            height: \"14\",\n            x: \"8\",\n            y: \"8\",\n            rx: \"2\",\n            ry: \"2\",\n            key: \"17jyea\"\n        }\n    ],\n    [\n        \"path\",\n        {\n            d: \"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\",\n            key: \"zix9uf\"\n        }\n    ]\n];\nconst Copy = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"copy\", __iconNode);\n //# sourceMappingURL=copy.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyZWFtZG93bi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2NvcHkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBR08sTUFBTSxhQUF1QjtJQUNsQztRQUFDO1FBQVE7WUFBRSxPQUFPO1lBQU0sUUFBUTtZQUFNLEdBQUc7WUFBSyxHQUFHO1lBQUssSUFBSTtZQUFLLElBQUk7WUFBSyxLQUFLO1FBQUEsQ0FBVTtLQUFBO0lBQ3ZGO1FBQUM7UUFBUTtZQUFFLEdBQUc7WUFBMkQsS0FBSztRQUFBLENBQVU7S0FBQTtDQUMxRjtBQWFBLE1BQU0sT0FBTyxpRUFBaUIsUUFBUSxVQUFVIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGFudDEwXFxzcmNcXGljb25zXFxjb3B5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24nO1xuaW1wb3J0IHsgSWNvbk5vZGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBfX2ljb25Ob2RlOiBJY29uTm9kZSA9IFtcbiAgWydyZWN0JywgeyB3aWR0aDogJzE0JywgaGVpZ2h0OiAnMTQnLCB4OiAnOCcsIHk6ICc4Jywgcng6ICcyJywgcnk6ICcyJywga2V5OiAnMTdqeWVhJyB9XSxcbiAgWydwYXRoJywgeyBkOiAnTTQgMTZjLTEuMSAwLTItLjktMi0yVjRjMC0xLjEuOS0yIDItMmgxMGMxLjEgMCAyIC45IDIgMicsIGtleTogJ3ppeDl1ZicgfV0sXG5dO1xuXG4vKipcbiAqIEBjb21wb25lbnQgQG5hbWUgQ29weVxuICogQGRlc2NyaXB0aW9uIEx1Y2lkZSBTVkcgaWNvbiBjb21wb25lbnQsIHJlbmRlcnMgU1ZHIEVsZW1lbnQgd2l0aCBjaGlsZHJlbi5cbiAqXG4gKiBAcHJldmlldyAhW2ltZ10oZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlBZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWdvZ0lIZHBaSFJvUFNJeU5DSUtJQ0JvWldsbmFIUTlJakkwSWdvZ0lIWnBaWGRDYjNnOUlqQWdNQ0F5TkNBeU5DSUtJQ0JtYVd4c1BTSnViMjVsSWdvZ0lITjBjbTlyWlQwaUl6QXdNQ0lnYzNSNWJHVTlJbUpoWTJ0bmNtOTFibVF0WTI5c2IzSTZJQ05tWm1ZN0lHSnZjbVJsY2kxeVlXUnBkWE02SURKd2VDSUtJQ0J6ZEhKdmEyVXRkMmxrZEdnOUlqSWlDaUFnYzNSeWIydGxMV3hwYm1WallYQTlJbkp2ZFc1a0lnb2dJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUNqNEtJQ0E4Y21WamRDQjNhV1IwYUQwaU1UUWlJR2hsYVdkb2REMGlNVFFpSUhnOUlqZ2lJSGs5SWpnaUlISjRQU0l5SWlCeWVUMGlNaUlnTHo0S0lDQThjR0YwYUNCa1BTSk5OQ0F4Tm1NdE1TNHhJREF0TWkwdU9TMHlMVEpXTkdNd0xURXVNUzQ1TFRJZ01pMHlhREV3WXpFdU1TQXdJRElnTGprZ01pQXlJaUF2UGdvOEwzTjJaejRLKSAtIGh0dHBzOi8vbHVjaWRlLmRldi9pY29ucy9jb3B5XG4gKiBAc2VlIGh0dHBzOi8vbHVjaWRlLmRldi9ndWlkZS9wYWNrYWdlcy9sdWNpZGUtcmVhY3QgLSBEb2N1bWVudGF0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gTHVjaWRlIGljb25zIHByb3BzIGFuZCBhbnkgdmFsaWQgU1ZHIGF0dHJpYnV0ZVxuICogQHJldHVybnMge0pTWC5FbGVtZW50fSBKU1ggRWxlbWVudFxuICpcbiAqL1xuY29uc3QgQ29weSA9IGNyZWF0ZUx1Y2lkZUljb24oJ2NvcHknLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IGRlZmF1bHQgQ29weTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/icons/copy.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/shared/src/utils.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/streamdown/node_modules/lucide-react/dist/esm/shared/src/utils.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hasA11yProp: () => (/* binding */ hasA11yProp),\n/* harmony export */   mergeClasses: () => (/* binding */ mergeClasses),\n/* harmony export */   toCamelCase: () => (/* binding */ toCamelCase),\n/* harmony export */   toKebabCase: () => (/* binding */ toKebabCase),\n/* harmony export */   toPascalCase: () => (/* binding */ toPascalCase)\n/* harmony export */ });\n/**\n * @license lucide-react v0.539.0 - ISC\n *\n * This source code is licensed under the ISC license.\n * See the LICENSE file in the root directory of this source tree.\n */ const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, \"$1-$2\").toLowerCase();\nconst toCamelCase = (string)=>string.replace(/^([A-Z])|[\\s-_]+(\\w)/g, (match, p1, p2)=>p2 ? p2.toUpperCase() : p1.toLowerCase());\nconst toPascalCase = (string)=>{\n    const camelCase = toCamelCase(string);\n    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);\n};\nconst mergeClasses = (...classes)=>classes.filter((className, index, array)=>{\n        return Boolean(className) && className.trim() !== \"\" && array.indexOf(className) === index;\n    }).join(\" \").trim();\nconst hasA11yProp = (props)=>{\n    for(const prop in props){\n        if (prop.startsWith(\"aria-\") || prop === \"role\" || prop === \"title\") {\n            return true;\n        }\n    }\n};\n //# sourceMappingURL=utils.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyZWFtZG93bi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL3NoYXJlZC9zcmMvdXRpbHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQVFPLE1BQU0sY0FBYyxDQUFDLFNBQzFCLE9BQU8sUUFBUSxzQkFBc0IsT0FBTyxFQUFFO0FBUXpDLE1BQU0sY0FBYyxDQUFtQixTQUM1QyxDQUQ0QyxDQUM1QyxLQUFPLFFBQVEseUJBQXlCLENBQUMsT0FBTyxJQUFJLFVBQzdDLEdBQUcsYUFBWSxHQUFJLEdBQUc7QUFTeEIsTUFBTSxlQUFlLENBQW1CO0lBQzdDLE1BQU0sWUFBWSxZQUFZLE1BQU07SUFFcEMsT0FBUSxVQUFVLE9BQU8sQ0FBQyxFQUFFLGFBQVksR0FBSSxVQUFVLE1BQU0sQ0FBQztBQUMvRDtBQVFPLE1BQU0sZUFBZSxJQUEyQyxVQUNyRSxRQUNHLE9BQU8sQ0FBQyxXQUFXLE9BQU87UUFDekIsT0FDRSxRQUFRLFNBQVMsS0FDaEIsVUFBcUIsV0FBVyxNQUNqQyxNQUFNLFFBQVEsU0FBUyxNQUFNO0lBRWpDLENBQUMsRUFDQSxLQUFLLEdBQUcsRUFDUjtBQWdCRSxNQUFNLGNBQWMsQ0FBQztJQUMxQixVQUFXLFFBQVE7UUFDakIsSUFBSSxLQUFLLFdBQVcsT0FBTyxLQUFLLFNBQVMsVUFBVSxTQUFTLFNBQVM7WUFDbkUsT0FBTztRQUNUO0lBQ0Y7QUFDRiIsInNvdXJjZXMiOlsiQzpcXHNoYXJlZFxcc3JjXFx1dGlscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW1lbFRvUGFzY2FsIH0gZnJvbSAnLi91dGlsaXR5LXR5cGVzJztcblxuLyoqXG4gKiBDb252ZXJ0cyBzdHJpbmcgdG8ga2ViYWIgY2FzZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEga2ViYWJpemVkIHN0cmluZ1xuICovXG5leHBvcnQgY29uc3QgdG9LZWJhYkNhc2UgPSAoc3RyaW5nOiBzdHJpbmcpID0+XG4gIHN0cmluZy5yZXBsYWNlKC8oW2EtejAtOV0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xuXG4vKipcbiAqIENvbnZlcnRzIHN0cmluZyB0byBjYW1lbCBjYXNlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gQSBjYW1lbGl6ZWQgc3RyaW5nXG4gKi9cbmV4cG9ydCBjb25zdCB0b0NhbWVsQ2FzZSA9IDxUIGV4dGVuZHMgc3RyaW5nPihzdHJpbmc6IFQpID0+XG4gIHN0cmluZy5yZXBsYWNlKC9eKFtBLVpdKXxbXFxzLV9dKyhcXHcpL2csIChtYXRjaCwgcDEsIHAyKSA9PlxuICAgIHAyID8gcDIudG9VcHBlckNhc2UoKSA6IHAxLnRvTG93ZXJDYXNlKCksXG4gICk7XG5cbi8qKlxuICogQ29udmVydHMgc3RyaW5nIHRvIHBhc2NhbCBjYXNlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gQSBwYXNjYWxpemVkIHN0cmluZ1xuICovXG5leHBvcnQgY29uc3QgdG9QYXNjYWxDYXNlID0gPFQgZXh0ZW5kcyBzdHJpbmc+KHN0cmluZzogVCk6IENhbWVsVG9QYXNjYWw8VD4gPT4ge1xuICBjb25zdCBjYW1lbENhc2UgPSB0b0NhbWVsQ2FzZShzdHJpbmcpO1xuXG4gIHJldHVybiAoY2FtZWxDYXNlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY2FtZWxDYXNlLnNsaWNlKDEpKSBhcyBDYW1lbFRvUGFzY2FsPFQ+O1xufTtcblxuLyoqXG4gKiBNZXJnZXMgY2xhc3NlcyBpbnRvIGEgc2luZ2xlIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7YXJyYXl9IGNsYXNzZXNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5nIG9mIGNsYXNzZXNcbiAqL1xuZXhwb3J0IGNvbnN0IG1lcmdlQ2xhc3NlcyA9IDxDbGFzc1R5cGUgPSBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsPiguLi5jbGFzc2VzOiBDbGFzc1R5cGVbXSkgPT5cbiAgY2xhc3Nlc1xuICAgIC5maWx0ZXIoKGNsYXNzTmFtZSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBCb29sZWFuKGNsYXNzTmFtZSkgJiZcbiAgICAgICAgKGNsYXNzTmFtZSBhcyBzdHJpbmcpLnRyaW0oKSAhPT0gJycgJiZcbiAgICAgICAgYXJyYXkuaW5kZXhPZihjbGFzc05hbWUpID09PSBpbmRleFxuICAgICAgKTtcbiAgICB9KVxuICAgIC5qb2luKCcgJylcbiAgICAudHJpbSgpO1xuXG4vKipcbiAqIElzIGVtcHR5IHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZSB2YWx1ZSBpcyBhbiBlbXB0eSBzdHJpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGlzRW1wdHlTdHJpbmcgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHZhbHVlID09PSAnJztcblxuLyoqXG4gKiBDaGVjayBpZiBhIGNvbXBvbmVudCBoYXMgYW4gYWNjZXNzaWJpbGl0eSBwcm9wXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHByb3BzXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGUgY29tcG9uZW50IGhhcyBhbiBhY2Nlc3NpYmlsaXR5IHByb3BcbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0ExMXlQcm9wID0gKHByb3BzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSA9PiB7XG4gIGZvciAoY29uc3QgcHJvcCBpbiBwcm9wcykge1xuICAgIGlmIChwcm9wLnN0YXJ0c1dpdGgoJ2FyaWEtJykgfHwgcHJvcCA9PT0gJ3JvbGUnIHx8IHByb3AgPT09ICd0aXRsZScpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/streamdown/node_modules/lucide-react/dist/esm/shared/src/utils.js\n");

/***/ })

};
;