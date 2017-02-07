module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "babel",
    "react",
    "promise",
    "html",
    "flowtype"
  ],
  "env": {
    "browser" : true
  },
  "globals": {
    "__DEV__"      : false,
    "__TEST__"     : false,
    "__BETA__"     : false,
    "__PROD__"     : false,
    "__COVERAGE__" : false
  },
  "rules": {
    "key-spacing"          : 0,
    "jsx-quotes"           : [2, "prefer-single"],
    "max-len"              : [2, 120, 2],
    "object-curly-spacing" : [2, "always"],
    "flowtype/boolean-style": [
     2,
     "bool"
   ],
    "flowtype/space-after-type-colon": [
        2,
        "always"
    ],
    "flowtype/space-before-type-colon": [
        2,
        "never"
    ],
    "flowtype/define-flow-type": 1,
    "flowtype/use-flow-type": 1,
    "semi": [ 2, "never" ],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  },
  "extends": [
    "airbnb",
    "plugin:flowtype/recommended"
  ]
}
