enum role {
  Doctor,
  Anestesista,
  Asistente,
  Administrativo,
}
const medico = {
  name: "Jesus",
  email: "juvinaojesusd@gmail.com",
  role: role.Doctor,
  total: 12,
  currentBill() {
    return `Valor actual de la factura es de ${this?.name}`;
  }
};
interface Staff {
  name: string;
  email: string;
  total: number;
  role: role;
  currentBill(): string;
}
const printStaff = (staff: { name: string; email: string; role: role }) => {
  console.log(staff);
};
const printStaffInter = (staff: Staff) => {
  const { currentBill } = staff || {}
  const total = currentBill()
  console.log(total);
};

printStaffInter(medico);
