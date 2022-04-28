// INIT
let vehiculo: string = "";
// let any: arr = [];
let cantidad: number = 0;
let esAutorizado: boolean;
// any.forEach((e) => e);

// OBJECTS
// ENUMS
enum role {
  estudiante,
  profesor,
}

let persona: {
  nombre: string;
  edad: number;
  direccion: {
    calle: string;
    comuna: string;
  };
  cursos: string[];
  role: role;
} = {
  nombre: "Jesus",
  edad: 12,
  direccion: {
    calle: "los presentes",
    comuna: "santiago",
  },
  cursos: ["Flutter", "Patrones de diseño", "SQL"],
  role: role.profesor,
};
console.log(persona);
// FIN DE DATOS PRIMITIVOS
// ARRAYS
for (const hobbie of persona.cursos) {
  //   console.log(hobbie.toLocaleUpperCase());
}

// tipo de dato personalizado
// TUPLES
type vehicleType = [string, number, string];
let Automobile: vehicleType = ["Mazda", 2020, "rojo"];
let bicicleta: vehicleType = ["Mazda", 2020, "rojo"];
// console.log(Automobile);

// *********************************tipo de datos ANY ********************************
let hobbies: any[] = ['Futbol', 1, 'Leer'];
// console.log(persona);

// UNION
