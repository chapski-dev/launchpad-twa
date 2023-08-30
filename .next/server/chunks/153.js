"use strict";
exports.id = 153;
exports.ids = [153];
exports.modules = {

/***/ 6153:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  I: () => (/* binding */ Input_Input)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
;// CONCATENATED MODULE: ./src/ui/Input/style.ts

const Input = external_styled_components_.styled.input`
  color: ${({ theme })=>theme.color.text};
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  background-color: ${({ theme })=>theme.color.bgSecondary};
  width: 100%;
  outline: none;
  border: none;
  padding: 14px 16px;
  border-radius: 10px;
  border: ${({ error })=>error && `1px solid red`};

  &::placeholder {
    color: ${({ theme })=>theme.color.hint};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
    -webkit-transition-deмlay: 9999s;
    -webkit-text-fill-color: ${({ theme })=>theme.color.hint};
  }
`;

;// CONCATENATED MODULE: ./src/ui/Input/Input.tsx


const Input_Input = (props)=>{
    const { className, disabled, onChange, value, error, placeholder, name, type, max, min } = props;
    return /*#__PURE__*/ jsx_runtime.jsx(Input, {
        className: className,
        disabled: disabled,
        error: error,
        max: max,
        min: min,
        name: name,
        onChange: (e)=>onChange(e),
        placeholder: placeholder,
        type: type,
        value: value
    });
};


/***/ })

};
;