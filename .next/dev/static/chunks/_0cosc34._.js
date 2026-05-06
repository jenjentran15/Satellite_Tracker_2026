(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/hooks/useNaturalQuery.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNaturalQuery",
    ()=>useNaturalQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useNaturalQuery() {
    _s();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const abortRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const submit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNaturalQuery.useCallback[submit]": async (queryText, context = null)=>{
            const q = (queryText || query).trim();
            if (!q) return;
            if (abortRef.current) abortRef.current.abort();
            abortRef.current = new AbortController();
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('/api/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: q,
                        context
                    }),
                    signal: abortRef.current.signal
                });
                if (!res.ok) throw new Error(`API error ${res.status}`);
                const data = await res.json();
                if (data.success) {
                    setResult(data.result);
                    setHistory({
                        "useNaturalQuery.useCallback[submit]": (prev)=>[
                                {
                                    query: q,
                                    result: data.result,
                                    timestamp: Date.now()
                                },
                                ...prev.slice(0, 9)
                            ]
                    }["useNaturalQuery.useCallback[submit]"]);
                } else {
                    setError(data.error || 'Unknown error');
                }
            } catch (err) {
                if (err.name !== 'AbortError') setError(err.message);
            } finally{
                setLoading(false);
            }
        }
    }["useNaturalQuery.useCallback[submit]"], [
        query
    ]);
    const clear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNaturalQuery.useCallback[clear]": ()=>{
            setQuery('');
            setResult(null);
            setError(null);
        }
    }["useNaturalQuery.useCallback[clear]"], []);
    return {
        query,
        setQuery,
        result,
        loading,
        error,
        history,
        submit,
        clear
    };
}
_s(useNaturalQuery, "zmsvUOBJDvtZeYUjoIuQ/TKd75E=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/NaturalQueryBar/NaturalQueryBar.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actions": "NaturalQueryBar-module__F21nTq__actions",
  "bar": "NaturalQueryBar-module__F21nTq__bar",
  "clearBtn": "NaturalQueryBar-module__F21nTq__clearBtn",
  "dropdown": "NaturalQueryBar-module__F21nTq__dropdown",
  "error": "NaturalQueryBar-module__F21nTq__error",
  "focused": "NaturalQueryBar-module__F21nTq__focused",
  "followUp": "NaturalQueryBar-module__F21nTq__followUp",
  "icon": "NaturalQueryBar-module__F21nTq__icon",
  "input": "NaturalQueryBar-module__F21nTq__input",
  "loading": "NaturalQueryBar-module__F21nTq__loading",
  "resultPill": "NaturalQueryBar-module__F21nTq__resultPill",
  "section": "NaturalQueryBar-module__F21nTq__section",
  "sectionLabel": "NaturalQueryBar-module__F21nTq__sectionLabel",
  "spin": "NaturalQueryBar-module__F21nTq__spin",
  "spinner": "NaturalQueryBar-module__F21nTq__spinner",
  "submitBtn": "NaturalQueryBar-module__F21nTq__submitBtn",
  "suggestion": "NaturalQueryBar-module__F21nTq__suggestion",
  "wrapper": "NaturalQueryBar-module__F21nTq__wrapper",
});
}),
"[project]/components/NaturalQueryBar/NaturalQueryBar.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NaturalQueryBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNaturalQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useNaturalQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/NaturalQueryBar/NaturalQueryBar.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const SUGGESTIONS = [
    'Show me all Starlink satellites',
    'High risk conjunctions right now',
    'Debris above 800 km altitude',
    'Satellites visible from Los Angeles tonight',
    'GPS constellation',
    'What launched in 2024?',
    'Show Russian satellites in LEO',
    'Inactive satellites near ISS orbit'
];
function NaturalQueryBar({ onResult, onClear }) {
    _s();
    const { query, setQuery, result, loading, error, history, submit, clear } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNaturalQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNaturalQuery"])();
    const [focused, setFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSuggestions, setShowSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NaturalQueryBar.useEffect": ()=>{
            if (result) {
                onResult?.(result);
                setShowSuggestions(false);
            }
        }
    }["NaturalQueryBar.useEffect"], [
        result,
        onResult
    ]);
    function handleKey(e) {
        if (e.key === 'Enter') submit();
        if (e.key === 'Escape') {
            clear();
            onClear?.();
            setShowSuggestions(false);
        }
    }
    function handleSuggestion(s) {
        setQuery(s);
        submit(s);
    }
    const filteredSuggestions = query.length > 1 ? SUGGESTIONS.filter((s)=>s.toLowerCase().includes(query.toLowerCase())) : SUGGESTIONS;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].bar} ${focused ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].focused : ''} ${loading ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loading : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon,
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].spinner
                        }, void 0, false, {
                            fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                            lineNumber: 51,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 16 16",
                            fill: "none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "6.5",
                                    cy: "6.5",
                                    r: "4",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5"
                                }, void 0, false, {
                                    fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M10 10L13.5 13.5",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5",
                                    strokeLinecap: "round"
                                }, void 0, false, {
                                    fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                        value: query,
                        onChange: (e)=>{
                            setQuery(e.target.value);
                            setShowSuggestions(true);
                        },
                        onFocus: ()=>{
                            setFocused(true);
                            setShowSuggestions(true);
                        },
                        onBlur: ()=>{
                            setFocused(false);
                            setTimeout(()=>setShowSuggestions(false), 150);
                        },
                        onKeyDown: handleKey,
                        placeholder: "Ask anything — 'show Starlink over Europe' or 'high risk conjunctions'...",
                        autoComplete: "off",
                        spellCheck: false
                    }, void 0, false, {
                        fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actions,
                        children: [
                            result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultPill,
                                children: result.humanSummary
                            }, void 0, false, {
                                fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            query && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].clearBtn,
                                onClick: ()=>{
                                    clear();
                                    onClear?.();
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 14 14",
                                    fill: "none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M2 2L12 12M12 2L2 12",
                                        stroke: "currentColor",
                                        strokeWidth: "1.5",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].submitBtn,
                                onClick: ()=>submit(),
                                disabled: !query.trim() || loading,
                                children: loading ? 'Thinking...' : 'Search'
                            }, void 0, false, {
                                fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                children: [
                    "Query failed: ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                lineNumber: 97,
                columnNumber: 9
            }, this),
            showSuggestions && focused && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dropdown,
                children: [
                    history.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionLabel,
                                children: "Recent"
                            }, void 0, false, {
                                fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, this),
                            history.slice(0, 3).map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].suggestion,
                                    onClick: ()=>handleSuggestion(h.query),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "12",
                                            height: "12",
                                            viewBox: "0 0 12 12",
                                            fill: "none",
                                            style: {
                                                opacity: .5
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M6 1v5l3 2",
                                                    stroke: "currentColor",
                                                    strokeWidth: "1.3",
                                                    strokeLinecap: "round"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                                    lineNumber: 108,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "6",
                                                    cy: "6",
                                                    r: "5",
                                                    stroke: "currentColor",
                                                    strokeWidth: "1.3"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                                    lineNumber: 109,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                            lineNumber: 107,
                                            columnNumber: 19
                                        }, this),
                                        h.query
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                    lineNumber: 106,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                        lineNumber: 103,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionLabel,
                                children: "Try asking"
                            }, void 0, false, {
                                fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this),
                            filteredSuggestions.slice(0, 5).map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].suggestion,
                                    onClick: ()=>handleSuggestion(s),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "12",
                                            height: "12",
                                            viewBox: "0 0 12 12",
                                            fill: "none",
                                            style: {
                                                opacity: .4
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "5",
                                                    cy: "5",
                                                    r: "3.5",
                                                    stroke: "currentColor",
                                                    strokeWidth: "1.3"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                                    lineNumber: 121,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M8 8L10.5 10.5",
                                                    stroke: "currentColor",
                                                    strokeWidth: "1.3",
                                                    strokeLinecap: "round"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                                    lineNumber: 122,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                            lineNumber: 120,
                                            columnNumber: 17
                                        }, this),
                                        s
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    result?.followUp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionLabel,
                                children: "Suggested next"
                            }, void 0, false, {
                                fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                lineNumber: 131,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].suggestion} ${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].followUp}`,
                                onClick: ()=>handleSuggestion(result.followUp),
                                children: [
                                    result.followUp,
                                    " →"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                                lineNumber: 132,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                        lineNumber: 130,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
                lineNumber: 101,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/NaturalQueryBar/NaturalQueryBar.jsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(NaturalQueryBar, "+DBeNO5Aa2Z4ynnMaVCWtKsLgUo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNaturalQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNaturalQuery"]
    ];
});
_c = NaturalQueryBar;
var _c;
__turbopack_context__.k.register(_c, "NaturalQueryBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/satelliteFilter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * applyQueryFilter
 * Takes the parsed NLQ result from Claude and filters a satellite array.
 *
 * Each satellite object should have this shape (from your TLE/catalog pipeline):
 * {
 *   noradId: number,
 *   name: string,
 *   type: 'active' | 'debris' | 'rocket_body' | 'inactive',
 *   operator: string,
 *   constellation: string | null,
 *   altitude: number,          // km, current computed altitude
 *   inclination: number,       // degrees
 *   orbitType: 'LEO' | 'MEO' | 'GEO' | 'HEO',
 *   launchYear: number | null,
 *   lat: number,               // current ground track latitude
 *   lon: number,               // current ground track longitude
 *   riskLevel: 'high' | 'medium' | 'low' | null,
 * }
 */ __turbopack_context__.s([
    "applyQueryFilter",
    ()=>applyQueryFilter,
    "getHighlightColor",
    ()=>getHighlightColor
]);
function applyQueryFilter(satellites, nlqResult) {
    if (!nlqResult || !nlqResult.filters) return satellites;
    const f = nlqResult.filters;
    let results = [
        ...satellites
    ];
    if (f.type && f.type.length > 0) {
        results = results.filter((s)=>f.type.includes(s.type));
    }
    if (f.operator) {
        const op = f.operator.toLowerCase();
        results = results.filter((s)=>s.operator?.toLowerCase().includes(op));
    }
    if (f.constellation) {
        const con = f.constellation.toLowerCase();
        results = results.filter((s)=>s.constellation?.toLowerCase().includes(con) || s.name?.toLowerCase().includes(con));
    }
    if (f.altitudeMin != null) {
        results = results.filter((s)=>s.altitude >= f.altitudeMin);
    }
    if (f.altitudeMax != null) {
        results = results.filter((s)=>s.altitude <= f.altitudeMax);
    }
    if (f.inclination != null) {
        results = results.filter((s)=>Math.abs(s.inclination - f.inclination) <= 5);
    }
    if (f.orbitType) {
        results = results.filter((s)=>s.orbitType === f.orbitType);
    }
    if (f.riskLevel) {
        results = results.filter((s)=>s.riskLevel === f.riskLevel);
    }
    if (f.launchYearMin != null) {
        results = results.filter((s)=>s.launchYear >= f.launchYearMin);
    }
    if (f.launchYearMax != null) {
        results = results.filter((s)=>s.launchYear <= f.launchYearMax);
    }
    if (f.visibleFrom) {
        const { lat, lon } = f.visibleFrom;
        results = results.filter((s)=>isApproxVisible(s, lat, lon));
    }
    if (f.keyword) {
        const kw = f.keyword.toLowerCase();
        results = results.filter((s)=>s.name?.toLowerCase().includes(kw) || s.operator?.toLowerCase().includes(kw));
    }
    return results;
}
/**
 * Rough ground-track visibility check.
 * A satellite is "overhead" if its subsatellite point is within ~2500 km.
 * For real visibility (naked eye), you'd also check elevation angle and sunlight.
 */ function isApproxVisible(sat, observerLat, observerLon) {
    const R = 6371;
    const dLat = (sat.lat - observerLat) * Math.PI / 180;
    const dLon = (sat.lon - observerLon) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(observerLat * Math.PI / 180) * Math.cos(sat.lat * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    const distKm = R * 2 * Math.asin(Math.sqrt(a));
    return distKm < 2500;
}
function getHighlightColor(satellite, filteredIds, defaultColor = 0x60a5fa) {
    if (!filteredIds || filteredIds.size === 0) return defaultColor;
    if (filteredIds.has(satellite.noradId)) {
        return satellite.riskLevel === 'high' ? 0xef4444 : satellite.riskLevel === 'medium' ? 0xf59e0b : 0x22c55e;
    }
    return 0x334155;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/dashboard.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "barFill": "dashboard-module__Gx_nyq__barFill",
  "barLabel": "dashboard-module__Gx_nyq__barLabel",
  "barPct": "dashboard-module__Gx_nyq__barPct",
  "barRow": "dashboard-module__Gx_nyq__barRow",
  "barTrack": "dashboard-module__Gx_nyq__barTrack",
  "clock": "dashboard-module__Gx_nyq__clock",
  "conjCard": "dashboard-module__Gx_nyq__conjCard",
  "conjHeader": "dashboard-module__Gx_nyq__conjHeader",
  "conjMeta": "dashboard-module__Gx_nyq__conjMeta",
  "conjObjects": "dashboard-module__Gx_nyq__conjObjects",
  "conjSlash": "dashboard-module__Gx_nyq__conjSlash",
  "conjTca": "dashboard-module__Gx_nyq__conjTca",
  "detailDrawer": "dashboard-module__Gx_nyq__detailDrawer",
  "drawerClose": "dashboard-module__Gx_nyq__drawerClose",
  "drawerGrid": "dashboard-module__Gx_nyq__drawerGrid",
  "drawerHeader": "dashboard-module__Gx_nyq__drawerHeader",
  "drawerRow": "dashboard-module__Gx_nyq__drawerRow",
  "drawerTitle": "dashboard-module__Gx_nyq__drawerTitle",
  "followUpBtn": "dashboard-module__Gx_nyq__followUpBtn",
  "globe": "dashboard-module__Gx_nyq__globe",
  "globeLegend": "dashboard-module__Gx_nyq__globeLegend",
  "globePanel": "dashboard-module__Gx_nyq__globePanel",
  "header": "dashboard-module__Gx_nyq__header",
  "headerCenter": "dashboard-module__Gx_nyq__headerCenter",
  "headerLeft": "dashboard-module__Gx_nyq__headerLeft",
  "headerRight": "dashboard-module__Gx_nyq__headerRight",
  "heatmapWrap": "dashboard-module__Gx_nyq__heatmapWrap",
  "hmCell": "dashboard-module__Gx_nyq__hmCell",
  "hmLabels": "dashboard-module__Gx_nyq__hmLabels",
  "legendDot": "dashboard-module__Gx_nyq__legendDot",
  "legendItem": "dashboard-module__Gx_nyq__legendItem",
  "liveChip": "dashboard-module__Gx_nyq__liveChip",
  "liveDot": "dashboard-module__Gx_nyq__liveDot",
  "logo": "dashboard-module__Gx_nyq__logo",
  "logoAccent": "dashboard-module__Gx_nyq__logoAccent",
  "logoMark": "dashboard-module__Gx_nyq__logoMark",
  "logoText": "dashboard-module__Gx_nyq__logoText",
  "main": "dashboard-module__Gx_nyq__main",
  "moreCount": "dashboard-module__Gx_nyq__moreCount",
  "pulse": "dashboard-module__Gx_nyq__pulse",
  "queryBanner": "dashboard-module__Gx_nyq__queryBanner",
  "queryBannerText": "dashboard-module__Gx_nyq__queryBannerText",
  "riskBadge": "dashboard-module__Gx_nyq__riskBadge",
  "risk_high": "dashboard-module__Gx_nyq__risk_high",
  "risk_low": "dashboard-module__Gx_nyq__risk_low",
  "risk_medium": "dashboard-module__Gx_nyq__risk_medium",
  "root": "dashboard-module__Gx_nyq__root",
  "satDot": "dashboard-module__Gx_nyq__satDot",
  "satInfo": "dashboard-module__Gx_nyq__satInfo",
  "satMeta": "dashboard-module__Gx_nyq__satMeta",
  "satName": "dashboard-module__Gx_nyq__satName",
  "satRow": "dashboard-module__Gx_nyq__satRow",
  "sectionLabel": "dashboard-module__Gx_nyq__sectionLabel",
  "sidebar": "dashboard-module__Gx_nyq__sidebar",
  "slideUp": "dashboard-module__Gx_nyq__slideUp",
  "statChip": "dashboard-module__Gx_nyq__statChip",
  "statLabel": "dashboard-module__Gx_nyq__statLabel",
  "statVal": "dashboard-module__Gx_nyq__statVal",
  "tab": "dashboard-module__Gx_nyq__tab",
  "tabActive": "dashboard-module__Gx_nyq__tabActive",
  "tabContent": "dashboard-module__Gx_nyq__tabContent",
  "tabs": "dashboard-module__Gx_nyq__tabs",
});
}),
"[project]/app/dashboard/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/NaturalQueryBar/NaturalQueryBar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$satelliteFilter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/satelliteFilter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/dashboard/dashboard.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const MOCK_SATELLITES = Array.from({
    length: 340
}, (_, i)=>({
        noradId: 25544 + i,
        name: i === 0 ? 'ISS (ZARYA)' : i < 60 ? `STARLINK-${3000 + i}` : i < 120 ? `DEBRIS-${2020 + i}` : i < 180 ? `GPS-${i}` : `SAT-${1000 + i}`,
        type: i < 60 ? 'active' : i < 140 ? 'debris' : i < 180 ? 'active' : i % 5 === 0 ? 'inactive' : 'active',
        operator: i < 60 ? 'SpaceX' : i < 120 ? 'Unknown' : i < 180 ? 'US Space Force' : 'Various',
        constellation: i < 60 ? 'Starlink' : i < 180 ? 'GPS' : null,
        altitude: 200 + Math.random() * 35000,
        inclination: 10 + Math.random() * 100,
        orbitType: i < 60 ? 'LEO' : i < 180 ? 'MEO' : Math.random() > 0.8 ? 'GEO' : 'LEO',
        launchYear: 2010 + Math.floor(Math.random() * 15),
        lat: (Math.random() - 0.5) * 160,
        lon: (Math.random() - 0.5) * 360,
        riskLevel: i % 40 === 0 ? 'high' : i % 15 === 0 ? 'medium' : null
    }));
const CONJUNCTIONS = [
    {
        id: 1,
        obj1: 'ISS',
        obj2: 'DEBRIS-2021-07',
        sep: '1.9 km',
        risk: 'high',
        tca: 'T+03:15',
        alt: '410 km'
    },
    {
        id: 2,
        obj1: 'STARLINK-3041',
        obj2: 'SL-24 R/B',
        sep: '4.7 km',
        risk: 'high',
        tca: 'T+06:22',
        alt: '548 km'
    },
    {
        id: 3,
        obj1: 'SENTINEL-6',
        obj2: 'COSMOS-1408',
        sep: '12.3 km',
        risk: 'medium',
        tca: 'T+11:40',
        alt: '1336 km'
    },
    {
        id: 4,
        obj1: 'TERRA',
        obj2: 'SL-16 DEB',
        sep: '28.9 km',
        risk: 'low',
        tca: 'T+18:05',
        alt: '705 km'
    }
];
function Dashboard() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        satellites: MOCK_SATELLITES,
        filtered: null,
        angle: 0,
        hoveredId: null
    });
    const [queryMeta, setQueryMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedSat, setSelectedSat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tick, setTick] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('conjunctions');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            const tick = {
                "Dashboard.useEffect.tick": ()=>{
                    const el = document.getElementById('clock');
                    if (el) {
                        const now = new Date();
                        el.textContent = now.getUTCHours().toString().padStart(2, '0') + ':' + now.getUTCMinutes().toString().padStart(2, '0') + ':' + now.getUTCSeconds().toString().padStart(2, '0') + ' UTC';
                    }
                }
            }["Dashboard.useEffect.tick"];
            tick();
            const id = setInterval(tick, 1000);
            return ({
                "Dashboard.useEffect": ()=>clearInterval(id)
            })["Dashboard.useEffect"];
        }
    }["Dashboard.useEffect"], []);
    const handleQueryResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Dashboard.useCallback[handleQueryResult]": (nlqResult)=>{
            const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$satelliteFilter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyQueryFilter"])(MOCK_SATELLITES, nlqResult);
            stateRef.current.filtered = filtered;
            setQueryMeta({
                summary: nlqResult.humanSummary,
                count: filtered.length,
                followUp: nlqResult.followUp
            });
            setTick({
                "Dashboard.useCallback[handleQueryResult]": (t)=>t + 1
            }["Dashboard.useCallback[handleQueryResult]"]);
        }
    }["Dashboard.useCallback[handleQueryResult]"], []);
    const handleClear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Dashboard.useCallback[handleClear]": ()=>{
            stateRef.current.filtered = null;
            setQueryMeta(null);
            setTick({
                "Dashboard.useCallback[handleClear]": (t)=>t + 1
            }["Dashboard.useCallback[handleClear]"]);
        }
    }["Dashboard.useCallback[handleClear]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            function resize() {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            }
            resize();
            window.addEventListener('resize', resize);
            function draw() {
                const { satellites, filtered, angle } = stateRef.current;
                const w = canvas.width, h = canvas.height;
                const cx = w / 2, cy = h / 2;
                const R = Math.min(w, h) * 0.36;
                ctx.clearRect(0, 0, w, h);
                // deep space background
                ctx.fillStyle = '#020817';
                ctx.fillRect(0, 0, w, h);
                // stars
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                for(let i = 0; i < 180; i++){
                    const sx = (i * 137 + 11) % w;
                    const sy = (i * 97 + 53) % h;
                    const sr = i % 7 === 0 ? 1.2 : 0.5;
                    ctx.beginPath();
                    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
                    ctx.fill();
                }
                // atmosphere glow
                const atmGrad = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.12);
                atmGrad.addColorStop(0, 'rgba(56,189,248,0.18)');
                atmGrad.addColorStop(1, 'rgba(56,189,248,0)');
                ctx.beginPath();
                ctx.arc(cx, cy, R * 1.12, 0, Math.PI * 2);
                ctx.fillStyle = atmGrad;
                ctx.fill();
                // globe
                ctx.beginPath();
                ctx.arc(cx, cy, R, 0, Math.PI * 2);
                ctx.fillStyle = '#0c1a2e';
                ctx.fill();
                ctx.strokeStyle = 'rgba(56,189,248,0.25)';
                ctx.lineWidth = 1;
                ctx.stroke();
                // grid lines
                ctx.strokeStyle = 'rgba(56,189,248,0.08)';
                ctx.lineWidth = 0.5;
                for(let lat = -60; lat <= 60; lat += 30){
                    ctx.beginPath();
                    let first = true;
                    for(let lon = 0; lon <= 360; lon += 3){
                        const φ = lat * Math.PI / 180;
                        const λ = lon * Math.PI / 180 + angle;
                        const z = Math.cos(φ) * Math.sin(λ);
                        if (z < 0) {
                            first = true;
                            continue;
                        }
                        const px = cx + R * Math.cos(φ) * Math.cos(λ);
                        const py = cy - R * Math.sin(φ);
                        first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                        first = false;
                    }
                    ctx.stroke();
                }
                for(let lon = 0; lon < 360; lon += 30){
                    ctx.beginPath();
                    let first = true;
                    for(let lat = -80; lat <= 80; lat += 3){
                        const φ = lat * Math.PI / 180;
                        const λ = lon * Math.PI / 180 + angle;
                        const z = Math.cos(φ) * Math.sin(λ);
                        if (z < 0) {
                            first = true;
                            continue;
                        }
                        const px = cx + R * Math.cos(φ) * Math.cos(λ);
                        const py = cy - R * Math.sin(φ);
                        first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                        first = false;
                    }
                    ctx.stroke();
                }
                // satellites
                const filteredIds = filtered ? new Set(filtered.map({
                    "Dashboard.useEffect.draw": (s)=>s.noradId
                }["Dashboard.useEffect.draw"])) : null;
                const displaySats = filtered || satellites;
                displaySats.forEach({
                    "Dashboard.useEffect.draw": (sat, i)=>{
                        const φ = sat.lat * Math.PI / 180;
                        const λ = sat.lon * Math.PI / 180 + angle;
                        const z = Math.cos(φ) * Math.sin(λ);
                        if (z < -0.1) return;
                        const altScale = 1 + sat.altitude / 40000 * 0.45;
                        const px = cx + R * altScale * Math.cos(φ) * Math.cos(λ);
                        const py = cy - R * altScale * Math.sin(φ);
                        const opacity = 0.4 + z * 0.6;
                        let color;
                        if (sat.riskLevel === 'high') color = `rgba(239,68,68,${opacity})`;
                        else if (sat.riskLevel === 'medium') color = `rgba(245,158,11,${opacity})`;
                        else if (sat.type === 'debris') color = `rgba(148,163,184,${opacity * 0.5})`;
                        else if (sat.constellation === 'Starlink') color = `rgba(96,165,250,${opacity})`;
                        else if (sat.constellation === 'GPS') color = `rgba(52,211,153,${opacity})`;
                        else color = `rgba(148,163,184,${opacity * 0.7})`;
                        const r = sat.riskLevel === 'high' ? 3.5 : sat.type === 'debris' ? 1.2 : 2;
                        if (sat.riskLevel === 'high') {
                            ctx.beginPath();
                            ctx.arc(px, py, 8, 0, Math.PI * 2);
                            ctx.fillStyle = `rgba(239,68,68,${opacity * 0.15})`;
                            ctx.fill();
                        }
                        ctx.beginPath();
                        ctx.arc(px, py, r, 0, Math.PI * 2);
                        ctx.fillStyle = color;
                        ctx.fill();
                    }
                }["Dashboard.useEffect.draw"]);
                // orbit rings for high risk
                if (!filtered) {
                    CONJUNCTIONS.filter({
                        "Dashboard.useEffect.draw": (c)=>c.risk === 'high'
                    }["Dashboard.useEffect.draw"]).forEach({
                        "Dashboard.useEffect.draw": (c, i)=>{
                            const orbitR = R * (1 + 0.08 + i * 0.04);
                            ctx.beginPath();
                            ctx.ellipse(cx, cy, orbitR, orbitR * 0.3, angle * 0.5, 0, Math.PI * 2);
                            ctx.strokeStyle = 'rgba(239,68,68,0.2)';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([
                                4,
                                6
                            ]);
                            ctx.stroke();
                            ctx.setLineDash([]);
                        }
                    }["Dashboard.useEffect.draw"]);
                }
                stateRef.current.angle += 0.0008;
                animRef.current = requestAnimationFrame(draw);
            }
            draw();
            return ({
                "Dashboard.useEffect": ()=>{
                    cancelAnimationFrame(animRef.current);
                    window.removeEventListener('resize', resize);
                }
            })["Dashboard.useEffect"];
        }
    }["Dashboard.useEffect"], []);
    const highCount = CONJUNCTIONS.filter((c)=>c.risk === 'high').length;
    const totalTracked = queryMeta ? queryMeta.count : MOCK_SATELLITES.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].root,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerLeft,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logo,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoMark
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 207,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoText,
                                        children: [
                                            "ORBIT",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoAccent,
                                                children: "WATCH"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 208,
                                                columnNumber: 52
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 208,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].liveChip,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].liveDot
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 211,
                                        columnNumber: 13
                                    }, this),
                                    "LIVE"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.jsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerCenter,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NaturalQueryBar$2f$NaturalQueryBar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onResult: handleQueryResult,
                            onClear: handleClear
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.jsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerRight,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statChip,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statVal,
                                        children: totalTracked.toLocaleString()
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 222,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statLabel,
                                        children: "tracked"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statChip,
                                style: {
                                    '--chip-accent': '#ef4444'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statVal,
                                        style: {
                                            color: '#ef4444'
                                        },
                                        children: highCount
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 226,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statLabel,
                                        children: "high risk"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 225,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].clock,
                                id: "clock",
                                children: "--:-- UTC"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.jsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.jsx",
                lineNumber: 204,
                columnNumber: 7
            }, this),
            queryMeta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].queryBanner,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].queryBannerText,
                        children: [
                            "Showing ",
                            queryMeta.count.toLocaleString(),
                            " satellites — ",
                            queryMeta.summary
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.jsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, this),
                    queryMeta.followUp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].followUpBtn,
                        onClick: ()=>{},
                        children: [
                            'Try: "',
                            queryMeta.followUp,
                            '" →'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.jsx",
                        lineNumber: 239,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.jsx",
                lineNumber: 234,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].main,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].globePanel,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                ref: canvasRef,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].globe
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].globeLegend,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].legendItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: '#60a5fa'
                                                },
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].legendDot
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 250,
                                                columnNumber: 49
                                            }, this),
                                            "Starlink"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 250,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].legendItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: '#34d399'
                                                },
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].legendDot
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 251,
                                                columnNumber: 49
                                            }, this),
                                            "GPS"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].legendItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: '#f59e0b'
                                                },
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].legendDot
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 252,
                                                columnNumber: 49
                                            }, this),
                                            "Medium risk"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].legendItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: '#ef4444'
                                                },
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].legendDot
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 253,
                                                columnNumber: 49
                                            }, this),
                                            "High risk"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 253,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].legendItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: '#94a3b8',
                                                    opacity: 0.5
                                                },
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].legendDot
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 254,
                                                columnNumber: 49
                                            }, this),
                                            "Debris"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 249,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.jsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebar,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabs,
                                children: [
                                    'conjunctions',
                                    'satellites',
                                    'heatmap'
                                ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tab} ${activeTab === tab ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabActive : ''}`,
                                        onClick: ()=>setActiveTab(tab),
                                        children: tab.charAt(0).toUpperCase() + tab.slice(1)
                                    }, tab, false, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            activeTab === 'conjunctions' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionLabel,
                                        children: "Active conjunction alerts"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 269,
                                        columnNumber: 15
                                    }, this),
                                    CONJUNCTIONS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].conjCard,
                                            onClick: ()=>setSelectedSat(c),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].conjHeader,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].riskBadge} ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['risk_' + c.risk]}`,
                                                            children: c.risk.toUpperCase()
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.jsx",
                                                            lineNumber: 273,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].conjTca,
                                                            children: c.tca
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.jsx",
                                                            lineNumber: 274,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.jsx",
                                                    lineNumber: 272,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].conjObjects,
                                                    children: [
                                                        c.obj1,
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].conjSlash,
                                                            children: "/"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.jsx",
                                                            lineNumber: 276,
                                                            columnNumber: 64
                                                        }, this),
                                                        " ",
                                                        c.obj2
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.jsx",
                                                    lineNumber: 276,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].conjMeta,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                c.sep,
                                                                " separation"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.jsx",
                                                            lineNumber: 278,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: c.alt
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.jsx",
                                                            lineNumber: 279,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.jsx",
                                                    lineNumber: 277,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, c.id, true, {
                                            fileName: "[project]/app/dashboard/page.jsx",
                                            lineNumber: 271,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this),
                            activeTab === 'satellites' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionLabel,
                                        children: queryMeta ? `${queryMeta.count} results` : 'All objects'
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, this),
                                    (stateRef.current.filtered || MOCK_SATELLITES).slice(0, 12).map((sat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].satRow,
                                            onClick: ()=>setSelectedSat(sat),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].satDot,
                                                    style: {
                                                        background: sat.riskLevel === 'high' ? '#ef4444' : sat.riskLevel === 'medium' ? '#f59e0b' : sat.type === 'debris' ? '#475569' : '#60a5fa'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.jsx",
                                                    lineNumber: 293,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].satInfo,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].satName,
                                                            children: sat.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.jsx",
                                                            lineNumber: 297,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].satMeta,
                                                            children: [
                                                                sat.orbitType,
                                                                " · ",
                                                                Math.round(sat.altitude),
                                                                " km · ",
                                                                sat.type
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.jsx",
                                                            lineNumber: 298,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.jsx",
                                                    lineNumber: 296,
                                                    columnNumber: 19
                                                }, this),
                                                sat.riskLevel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].riskBadge} ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['risk_' + sat.riskLevel]}`,
                                                    children: sat.riskLevel
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.jsx",
                                                    lineNumber: 300,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, sat.noradId, true, {
                                            fileName: "[project]/app/dashboard/page.jsx",
                                            lineNumber: 292,
                                            columnNumber: 17
                                        }, this)),
                                    (stateRef.current.filtered || MOCK_SATELLITES).length > 12 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].moreCount,
                                        children: [
                                            "+",
                                            (stateRef.current.filtered || MOCK_SATELLITES).length - 12,
                                            " more objects"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 304,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 287,
                                columnNumber: 13
                            }, this),
                            activeTab === 'heatmap' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionLabel,
                                        children: "LEO congestion by altitude band"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 311,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heatmapWrap,
                                        children: Array.from({
                                            length: 36
                                        }, (_, i)=>{
                                            const density = [
                                                1,
                                                2,
                                                3,
                                                5,
                                                7,
                                                9,
                                                8,
                                                7,
                                                6,
                                                8,
                                                5,
                                                3,
                                                2,
                                                3,
                                                4,
                                                6,
                                                8,
                                                10,
                                                9,
                                                8,
                                                7,
                                                9,
                                                6,
                                                4,
                                                3,
                                                4,
                                                5,
                                                7,
                                                9,
                                                10,
                                                10,
                                                9,
                                                8,
                                                10,
                                                7,
                                                5
                                            ][i];
                                            const norm = density / 10;
                                            const r = Math.round(34 + norm * 200);
                                            const g = Math.round(160 - norm * 140);
                                            const b = Math.round(200 - norm * 180);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hmCell,
                                                style: {
                                                    background: `rgb(${r},${g},${b})`,
                                                    opacity: 0.4 + norm * 0.6
                                                },
                                                title: `${300 + i * 47} km — density ${Math.round(norm * 100)}%`
                                            }, i, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 320,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hmLabels,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "300 km"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 325,
                                                columnNumber: 48
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Low → High"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 325,
                                                columnNumber: 67
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "2000 km"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 325,
                                                columnNumber: 90
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionLabel,
                                        style: {
                                            marginTop: 16
                                        },
                                        children: "Orbit type breakdown"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 326,
                                        columnNumber: 15
                                    }, this),
                                    [
                                        [
                                            'LEO',
                                            68,
                                            '#60a5fa'
                                        ],
                                        [
                                            'MEO',
                                            14,
                                            '#34d399'
                                        ],
                                        [
                                            'GEO',
                                            12,
                                            '#f59e0b'
                                        ],
                                        [
                                            'HEO',
                                            6,
                                            '#c084fc'
                                        ]
                                    ].map(([label, pct, color])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].barRow,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].barLabel,
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.jsx",
                                                    lineNumber: 329,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].barTrack,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].barFill,
                                                        style: {
                                                            width: `${pct}%`,
                                                            background: color
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.jsx",
                                                        lineNumber: 330,
                                                        columnNumber: 52
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.jsx",
                                                    lineNumber: 330,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].barPct,
                                                    children: [
                                                        pct,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.jsx",
                                                    lineNumber: 331,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, label, true, {
                                            fileName: "[project]/app/dashboard/page.jsx",
                                            lineNumber: 328,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.jsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.jsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            selectedSat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].detailDrawer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerHeader,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerTitle,
                                children: selectedSat.name || `${selectedSat.obj1} / ${selectedSat.obj2}`
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 342,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerClose,
                                onClick: ()=>setSelectedSat(null),
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 343,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.jsx",
                        lineNumber: 341,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerGrid,
                        children: [
                            selectedSat.altitude && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerRow,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Altitude"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 347,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    Math.round(selectedSat.altitude),
                                                    " km"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 347,
                                                columnNumber: 70
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 347,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerRow,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Orbit type"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 348,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: selectedSat.orbitType
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 348,
                                                columnNumber: 72
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 348,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerRow,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Type"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 349,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: selectedSat.type
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 349,
                                                columnNumber: 66
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 349,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerRow,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Operator"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 350,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: selectedSat.operator
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 350,
                                                columnNumber: 70
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 350,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerRow,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Launch year"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 351,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: selectedSat.launchYear
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 351,
                                                columnNumber: 73
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 351,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerRow,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "NORAD ID"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 352,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: selectedSat.noradId
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 352,
                                                columnNumber: 70
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 352,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            selectedSat.sep && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerRow,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Separation"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 355,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: selectedSat.sep
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 355,
                                                columnNumber: 72
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 355,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerRow,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Time of CA"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 356,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: selectedSat.tca
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 356,
                                                columnNumber: 72
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 356,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerRow,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Altitude"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 357,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: selectedSat.alt
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 357,
                                                columnNumber: 70
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 357,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$dashboard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerRow,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Risk level"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 358,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: selectedSat.risk === 'high' ? '#ef4444' : selectedSat.risk === 'medium' ? '#f59e0b' : '#22c55e'
                                                },
                                                children: selectedSat.risk.toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 358,
                                                columnNumber: 72
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.jsx",
                        lineNumber: 345,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.jsx",
                lineNumber: 340,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.jsx",
        lineNumber: 203,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "Ffl9XtfZF2VHPwpuQcedRdNdHCk=");
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0cosc34._.js.map