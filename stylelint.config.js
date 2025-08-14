/** @type {import('stylelint').Config} */
export default {
    extends: ["stylelint-config-standard-scss"],
    plugins: ["stylelint-scss", "stylelint-order", "stylelint-prettier"],
    rules: {
        "alpha-value-notation": "percentage",
        "at-rule-no-unknown": null,
        "color-function-notation": "modern",
        "color-hex-length": "short",
        "font-family-name-quotes": null,
        "max-nesting-depth": 4,
        "no-descending-specificity": null,
        "order/properties-alphabetical-order": true,
        "prettier/prettier": true,
        "property-no-vendor-prefix": null,
        "scss/at-mixin-pattern": null,
        "scss/double-slash-comment-whitespace-inside": null,
        "selector-pseudo-class-no-unknown": [
            true,
            {
                "ignorePseudoClasses": ["global"]
            }
        ],
        "value-keyword-case": null
    },
    ignoreFiles: [
        "src/stories/**/*.css",
        "dist/**/*",
        "coverage/**",
        "storybook-static/**/*"
    ]
};