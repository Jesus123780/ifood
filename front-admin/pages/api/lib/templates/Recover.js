/* eslint-disable import/no-anonymous-default-export */
export default ({ code }) => {
  return `<!DOCTYPE html>
    <html lang="es">
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet" />
    <style type="text/css">
        body {
            display: flex !important;
            flex-direction: column !important;
            margin: 0 !important;
        }
    </style>
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Email</title>
        <style>
            body {
                margin: 0;
                padding: 0;
            }
    
            img {
                border: 0 none;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
    
            a img {
                border: 0 none;
            }
    
            .imageFix {
                display: block;
            }
    
            table,
            td {
                border-collapse: collapse;
            }
    
            #bodyTable {
                height: 100% !important;
                margin: 0;
                padding: 0;
                width: 100% !important;
            }
    
            body {
                font-family: Arial, Helvetica, sans-serif;
            }
    
            @media only screen and (max-device-width: 480px) {
                .block {
                    display: block;
                    border: 1px solid red;
                }
            }
        </style>
    </head>
    
    <body style="color: #595756">
        <table role="presentation" min-width="400px" max-width="700px" border="0" bgcolor="#ffffff" cellpadding="0"
            cellspacing="0" style="margin: 0 auto">
            <tr>
                <td height="40px">&nbsp;</td>
            </tr>
            <tr>
                <td align="center"> <span style="text-align: center; font-size: 30px; font-weight: bold;">
                        <p style="margin: 40px 0 0;"> Hello </p>
                    </span> <span style="text-align: center; font-size: 18px; margin: 5px 60px 30px; display: block;"> This is the code to access your account: </span> </td>
            </tr>
            <tr>
                <td>
                    <table width="100%" height="70px" border="0" cellpadding="0" cellspacing="0" style="min-width: 340px; ">
                        <tr>
                            <td align="center" bgcolor="#F5F0EB" style="border-radius: 4px; text-align: center;"> <span
                                    style="text-align: center; font-size: 36px; font-weight: bold; color: #3F3E3E; letter-spacing: 20px;">
                                    ${code} </span> </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table border="0" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td align="center"> <span
                                    style="text-align: center; font-size: 16px; margin: 20px 0 40px; display: block; color: #A6A29F;">
                                    This code is valid for 15 minutes, counted from the receipt of this email </span> </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
            <td> <a href="https://smartreportz.com/"
                    style="text-align: center; color: #F5E9DA; font-weight: bold; text-decoration: unset; font-size: 16px; display: block;">
                    <table border="0" height="50px" width="335px" align="center" cellpadding="5" cellspacing="10"
                        bgcolor="#EA1D2C" style=" border-radius: 4px;">
                        <tr>
                            <td align="center"> <span
                                    style="text-align: center; color: #F5E9DA; font-weight: bold; text-decoration: unset; font-size: 16px; display: block;">Entrar</span>
                            </td>
                        </tr>
                    </table>
                </a> </td>
        </tr>
            <tr>
                <td>
                    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="10"
                        style="margin: 60px auto 0">
                        <tr>
                            <td height="1" bgcolor="#F5F0EB"></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table border="0" align="center" cellpadding="0" cellspacing="10">
                        <tr>
                            <td height="1" bgcolor="#F5F0EB"></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="10">
                        <tr>
                            <td height="1" bgcolor="#F5F0EB"></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td heigth="40px">&nbsp;</td>
            </tr>
            <tr>
                <td> <span style="text-align: center; font-size: 14px; color: #A6A29F; line-height: 18px;">
                        <p style="margin: 0;"> &copy; 2022 Smart Accounting - All rights reserved. </p>
                        <p style="margin: 0;"> This is an automatic email </p>
                    </span> </td>
            </tr>
        </table>
    </body>
    
    </html>`
}
