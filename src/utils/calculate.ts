// src/utils/calculate/calculate.ts

type Operator = "+" | "-" | "*" | "/";

export function calculate(expression: string): number {
  const tokens = tokenize(expression);
  const postfixTokens = infixToPostfix(tokens);
  return evaluatePostfix(postfixTokens);
}

export function tokenize(expression: string): string[] {
  const tokens: string[] = [];
  let currentToken = "";

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (isNumber(char)) {
      currentToken += char;
    } else if (isOperator(char) || isParenthesis(char)) {
      if (currentToken !== "") {
        tokens.push(currentToken);
        currentToken = "";
      }
      tokens.push(char);
    } else if (isWhitespace(char)) {
      if (currentToken !== "") {
        tokens.push(currentToken);
        currentToken = "";
      }
    } else {
      throw new Error(`Invalid character: ${char}`);
    }
  }

  if (currentToken !== "") {
    tokens.push(currentToken);
  }

  return tokens;
}
export function infixToPostfix(tokens: string[]): string[] {
  const operatorStack: string[] = [];
  const outputQueue: string[] = [];

  for (const token of tokens) {
    if (isNumber(token)) {
      outputQueue.push(token);
    } else if (isOperator(token)) {
      while (
        operatorStack.length > 0 &&
        isOperator(operatorStack[operatorStack.length - 1]) &&
        getPrecedence(token as Operator) <=
          getPrecedence(operatorStack[operatorStack.length - 1] as Operator)
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      operatorStack.push(token);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      if (operatorStack.length === 0) {
        throw new Error("Mismatched parentheses");
      }
      operatorStack.pop();
    }
  }

  while (operatorStack.length > 0) {
    const operator = operatorStack.pop()!;
    if (operator === "(" || operator === ")") {
      throw new Error("Mismatched parentheses");
    }
    outputQueue.push(operator);
  }

  return outputQueue;
}

export function evaluatePostfix(tokens: string[]): number {
  const stack: number[] = [];

  for (const token of tokens) {
    if (isNumber(token)) {
      stack.push(parseFloat(token));
    } else if (isOperator(token)) {
      const operand2 = stack.pop()!;
      const operand1 = stack.pop()!;
      const result = applyOperator(token as Operator, operand1, operand2);
      stack.push(result);
    }
  }

  if (stack.length !== 1) {
    throw new Error("Invalid expression");
  }

  return stack[0];
}

export function isNumber(token: string): boolean {
  return /^-?\d+(\.\d+)?$/.test(token);
}

export function isOperator(token: string): boolean {
  return ["+", "-", "*", "/"].includes(token);
}

export function isParenthesis(token: string): boolean {
  return ["(", ")"].includes(token);
}

export function isWhitespace(char: string): boolean {
  return /\s/.test(char);
}

export function getPrecedence(operator: Operator): number {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    default:
      return 0;
  }
}

export function applyOperator(
  operator: Operator,
  operand1: number,
  operand2: number
): number {
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      if (operand2 === 0) {
        throw new Error("Division by zero");
      }
      return operand1 / operand2;
    default:
      throw new Error(`Invalid operator: ${operator}`);
  }
}
