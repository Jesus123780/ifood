import React from 'react'
import PropTypes from 'prop-types'
import { Ticket } from './styled'

const GenerateSales = () => {
    // const download = () => {
    //     window.print();
    //   };
    const download = (elementId, uniqueIframeId) => {
        const content = document.getElementById(elementId)
        let pri
        if (document.getElementById(uniqueIframeId)) {
            pri = document.getElementById(uniqueIframeId).contentWindow
        } else {
            const iframe = document.createElement('iframe')
            iframe.setAttribute('title', uniqueIframeId)
            iframe.setAttribute('id', uniqueIframeId)
            console.log(iframe)
            // iframe.setAttribute('style', 'width: 155px; position: relative;')
            document.body.appendChild(iframe)
            pri = iframe.contentWindow
        }
        pri.document.open()
        pri.document.write(content.innerHTML)
        pri.document.close()
        pri.focus()
        pri.print()
    }
    return (
        <div>
            <button onClick={() => download('ticket', 'frame-ticket')}>print</button>
            <iframe id="frame-ticket" style={{ width: '155px', minWidth: '155px' }}>
            </iframe>
            <Ticket>
                <div id="ticket" className="ticket">
                    <img
                        src="https://yt3.ggpht.com/-3BKTe8YFlbA/AAAAAAAAAAI/AAAAAAAAAAA/ad0jqQ4IkGE/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
                        alt="Logotipo" />
                    <p className="centrado">TICKET DE VENTA</p>
                    <table>
                        <thead>
                            <tr>
                                <th>CANT</th>
                                <th>PRODUCTO</th>
                                <th>$$</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1.00</td>
                                <td>CHEETOS VERDES 80 G</td>
                                <td>$8.50</td>
                            </tr>
                            <tr>
                                <td>2.00</td>
                                <td>KINDER DELICE</td>
                                <td>$10.00</td>
                            </tr>
                            <tr>
                                <td>1.00</td>
                                <td>COCA COLA 600 ML</td>
                                <td>$10.00</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>TOTAL</td>
                                <td>$28.50</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Ticket>
        </div>
    )
}

GenerateSales.propTypes = {
    data: PropTypes.array
}

export default GenerateSales