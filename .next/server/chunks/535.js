"use strict";
exports.id = 535;
exports.ids = [535];
exports.modules = {

/***/ 4389:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ GlobalStyle)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const GlobalStyle = styled_components__WEBPACK_IMPORTED_MODULE_0__.createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme })=>theme.color.bg};
  }

`;


/***/ }),

/***/ 3555:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ theme)
/* harmony export */ });
const theme = {
    color: {
        bg: `var(--tg-theme-bg-color)`,
        text: `var(--tg-theme-text-color)`,
        hint: `var(--tg-theme-hint-color)`,
        link: `var(--tg-theme-link-color)`,
        btn: `var(--tg-theme-button-color)`,
        btnText: `var(--tg-theme-button-text-color)`,
        bgSecondary: `var(--tg-theme-secondary-bg-color)`
    }
};


/***/ }),

/***/ 1035:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ useTelegram)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useTelegram = ()=>{
    const [tgOptions, setTgOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const tg = window.Telegram?.WebApp;
        const onClose = ()=>{
            tg.close();
        };
        setTgOptions({
            tg,
            onClose,
            user: tg?.initDataUnsafe?.user,
            backButton: tg?.BackButton
        });
    }, []);
    return tgOptions;
};


/***/ }),

/***/ 9212:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9648);
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4298);
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_script__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1175);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var assets_style_GlobalStyle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4389);
/* harmony import */ var assets_style_theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3555);
/* harmony import */ var hooks_useTelegram_useTelegram__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1035);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);
axios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];









const queryClient = new react_query__WEBPACK_IMPORTED_MODULE_4__.QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 0,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: false,
            onError: (err)=>{
                if (err instanceof axios__WEBPACK_IMPORTED_MODULE_2__.AxiosError) {
                    console.log(`Ooops! ${err.name}: ${err.message}`);
                }
            }
        },
        mutations: {
            onError: (err)=>{
                if (err instanceof axios__WEBPACK_IMPORTED_MODULE_2__.AxiosError) {
                    console.log(`Ooops! ${err.name}: ${err.message}`);
                }
            }
        }
    }
});
function App({ Component, pageProps }) {
    const tgOptions = (0,hooks_useTelegram_useTelegram__WEBPACK_IMPORTED_MODULE_8__/* .useTelegram */ .f)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (tgOptions?.tg) {
            tgOptions.tg.ready();
        }
    }, [
        tgOptions
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_query__WEBPACK_IMPORTED_MODULE_4__.QueryClientProvider, {
        client: queryClient,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(styled_components__WEBPACK_IMPORTED_MODULE_5__.ThemeProvider, {
                theme: assets_style_theme__WEBPACK_IMPORTED_MODULE_7__/* .theme */ .r,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(assets_style_GlobalStyle__WEBPACK_IMPORTED_MODULE_6__/* .GlobalStyle */ .Z, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                        ...pageProps
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_script__WEBPACK_IMPORTED_MODULE_3___default()), {
                src: "https://telegram.org/js/telegram-web-app.js"
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3104:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Document)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6859);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);


function Document() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {
        lang: "en",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("body", {
                className: "bg-gray-dark-900",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {})
                ]
            })
        ]
    });
}


/***/ })

};
;