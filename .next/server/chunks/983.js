"use strict";
exports.id = 983;
exports.ids = [983];
exports.modules = {

/***/ 3736:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  x: () => (/* binding */ Line)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
;// CONCATENATED MODULE: ./src/ui/Line/style.ts

const Wrapper = external_styled_components_.styled.div`
  width: 100%;
  height: 1px;
  background-color: #ffffff33;
`;

;// CONCATENATED MODULE: ./src/ui/Line/Line.tsx


const Line = ()=>{
    return /*#__PURE__*/ jsx_runtime.jsx(Wrapper, {});
};


/***/ }),

/***/ 3299:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  m: () => (/* binding */ Tabs)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
;// CONCATENATED MODULE: ./src/ui/Tabs/style.ts

const Wrapper = external_styled_components_.styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const TabItem = external_styled_components_.styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const TabItemLabel = external_styled_components_.styled.span`
  line-height: 22px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme, isActive })=>isActive ? theme.color.btn : theme.color.hint};
  cursor: ${({ isActive })=>isActive ? "auto" : "pointer"};
  transition: all 0.3s;
  padding: 0 12px;
`;
const TabLine = external_styled_components_.styled.div`
  width: 100%;
  height: 3px;
  background-color: ${({ isActive, theme })=>isActive ? theme.color.btn : theme.color.bg};
  transition: all 0.3s;
`;

;// CONCATENATED MODULE: ./src/ui/Tabs/Tabs.tsx


const Tabs = (props)=>{
    const { tabs, onChange, activeTab } = props;
    return /*#__PURE__*/ jsx_runtime.jsx(Wrapper, {
        children: tabs.map((tab)=>{
            const isActive = tab.value === activeTab.value;
            return /*#__PURE__*/ (0,jsx_runtime.jsxs)(TabItem, {
                onClick: ()=>onChange(tab),
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx(TabItemLabel, {
                        isActive: isActive,
                        children: tab.label
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx(TabLine, {
                        isActive: isActive
                    })
                ]
            }, tab.value);
        })
    });
};


/***/ })

};
;