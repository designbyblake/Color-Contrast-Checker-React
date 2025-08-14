/** @type {import('stylelint').Config} */
export default {
    "extends": ["stylelint-config-standard-scss", "stylelint-config-prettier"],
    "plugins": ["stylelint-scss", "stylelint-order", "stylelint-prettier"],
    "rules": {
        "prettier/prettier": true,
        "property-no-vendor-prefix": null,
        "at-rule-no-unknown": null,
        "color-hex-length": "long",
        "declaration-colon-newline-after": null,
        "font-family-name-quotes": null,
        "max-nesting-depth": 4,
        "order/properties-alphabetical-order": true,
        "scss/at-mixin-pattern": null,
        "color-function-notation": "legacy",
        "alpha-value-notation": "number",
        "value-keyword-case": null,
        "scss/double-slash-comment-whitespace-inside": null,
        "selector-pseudo-class-no-unknown": [
            true,
            {
                "ignorePseudoClasses": ["global"]
            }
        ],
        "no-descending-specificity": null
    },
    "ignoreFiles": [
        "src/stories/**/*.css",
        "dist/**/*",
        "coverage/**",
        "storybook-static/**/*"
    ]
};