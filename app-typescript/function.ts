// functions
function sumar(valor: number, valor2: number): number {
  return valor + valor2;
}

// void equivale a undefined se pude usar
function imprimir(): void {
  console.log(sumar(2, 2));
}
// imprimir();
const throwError = (message: string): void => {
  if (!message) {
    throw new Error(message);
  }
};

// ASIGNACIÓN
let sumar2: (a: number, b: number) => number;
sumar2 = sumar;
// console.log(sumar2(2, 2));

function imprimir2(
  a: number,
  b: number,
  mostrar: (value: number) => void
): void {
  let resultado = a + b;
  mostrar(resultado);
}

imprimir2(1, 2, (x) => {
  console.log(x)
});
