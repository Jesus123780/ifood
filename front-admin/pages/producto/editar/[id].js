import { useRouter } from "next/router";
import { ProductEdit } from "../../../container/producto/editar";
// import { CustomTable } from "../../container/pruebas";

export default function ProductEditView() {
    const location = useRouter()
    const id = location.query.id
    return (<ProductEdit id={id}  />)
}