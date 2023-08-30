"use strict";
exports.id = 336;
exports.ids = [336];
exports.modules = {

/***/ 7631:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ getICOProjectById),
/* harmony export */   U: () => (/* binding */ getICOJettons)
/* harmony export */ });
/* harmony import */ var constants_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5699);
/* harmony import */ var libs_axios_instance_axios_instance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5410);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([libs_axios_instance_axios_instance__WEBPACK_IMPORTED_MODULE_1__]);
libs_axios_instance_axios_instance__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const getICOJettons = async ()=>{
    const { data } = await libs_axios_instance_axios_instance__WEBPACK_IMPORTED_MODULE_1__/* .AXIOS_LAUNCHPAD_INSTANCE */ .U.get(constants_api__WEBPACK_IMPORTED_MODULE_0__/* .ApiRoutes */ .M.GetICOProjects);
    return data;
};
const getICOProjectById = async (id)=>{
    const { data } = await libs_axios_instance_axios_instance__WEBPACK_IMPORTED_MODULE_1__/* .AXIOS_LAUNCHPAD_INSTANCE */ .U.get(constants_api__WEBPACK_IMPORTED_MODULE_0__/* .ApiRoutes */ .M.GetICOProjectById, {
        params: {
            id
        }
    });
    return data;
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5699:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ ApiRoutes),
/* harmony export */   x: () => (/* binding */ LAUNCHPAD_BASE_API_URL)
/* harmony export */ });
const LAUNCHPAD_BASE_API_URL = "https://launchpad-front-end.vercel.app";
const ApiRoutes = {
    GetICOProjects: "/api/jettons/getICOJettons",
    GetICOProjectById: "/api/jettons/getICOJettonById"
};


/***/ }),

/***/ 6512:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ AppRoutes),
/* harmony export */   f: () => (/* binding */ tonAddressExplorerLink)
/* harmony export */ });
const AppRoutes = {
    Home: "/",
    Project: "/project",
    Participate: "/participate"
};
const tonAddressExplorerLink = "https://testnet.ton.cx/address/";


/***/ }),

/***/ 5410:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ AXIOS_LAUNCHPAD_INSTANCE)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
/* harmony import */ var constants_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5699);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const AXIOS_LAUNCHPAD_INSTANCE = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseURL: constants_api__WEBPACK_IMPORTED_MODULE_1__/* .LAUNCHPAD_BASE_API_URL */ .x
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8449:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  W: () => (/* binding */ Container)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
;// CONCATENATED MODULE: ./src/ui/Container/style.ts

const Wrapper = external_styled_components_.styled.div`
  width: 100%;
  padding: 0 12px;
`;

;// CONCATENATED MODULE: ./src/ui/Container/Container.tsx


const Container = (props)=>{
    const { children } = props;
    return /*#__PURE__*/ jsx_runtime.jsx(Wrapper, {
        children: children
    });
};


/***/ }),

/***/ 7592:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  a: () => (/* binding */ Loader)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
;// CONCATENATED MODULE: ./src/ui/Loader/style.ts

const Wrapper = external_styled_components_.styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
  font-weight: 500;
  color: ${({ theme })=>theme.color.text};
`;

;// CONCATENATED MODULE: ./src/ui/Loader/Loader.tsx


const Loader = ()=>{
    return /*#__PURE__*/ jsx_runtime.jsx(Wrapper, {});
};


/***/ })

};
;