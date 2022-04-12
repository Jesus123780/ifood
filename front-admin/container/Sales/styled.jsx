import styled from 'styled-components';

export const Ticket = styled.div`
        width: 155px;
        max-width: 155px;
        position: relative;
        min-width: 155px;
 
   td,
th,
tr,
table {
    border-top: 1px solid black;
    border-collapse: collapse;
}

td.producto,
th.producto {
    width: 75px;
    max-width: 75px;
}

td.cantidad,
th.cantidad {
    width: 40px;
    max-width: 40px;
    word-break: break-all;
}

td.precio,
th.precio {
    width: 40px;
    max-width: 40px;
    word-break: break-all;
}

.centrado {
    text-align: center;
    align-content: center;
}

.ticket {
    width: 155px;
    max-width: 155px;
}

img{ 
        width: 155px;
        max-width: 155px;
        object-fit: cover;
        min-width: 155px;
        width: 100%;
    }
`