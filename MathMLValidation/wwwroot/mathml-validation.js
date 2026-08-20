const mathMlNamespace = "http://www.w3.org/1998/Math/MathML";

let staticFormulaMarkup;

export function inspect(root) {
    const formulas = [...root.querySelectorAll("[data-case] math")];
    const elements = formulas.flatMap(formula => [formula, ...formula.querySelectorAll("*")]);
    const failures = elements
        .filter(element => element.namespaceURI !== mathMlNamespace)
        .map(element => ({
            caseNumber: element.closest("[data-case]")?.dataset.case ?? "unknown",
            elementName: element.localName,
            actualNamespace: element.namespaceURI ?? "null"
        }));

    const currentStaticFormulaMarkup = root.querySelector('[data-case="1"] math')?.outerHTML;
    staticFormulaMarkup ??= currentStaticFormulaMarkup;

    return {
        passed: formulas.length > 0 && failures.length === 0,
        formulaCount: formulas.length,
        elementCount: elements.length,
        staticFormulaUnchanged: currentStaticFormulaMarkup === staticFormulaMarkup,
        failures
    };
}