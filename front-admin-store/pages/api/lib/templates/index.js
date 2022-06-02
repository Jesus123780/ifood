/* eslint-disable import/no-anonymous-default-export */
export default ({ username, code, company }) => {
  return `<!DOCTYPE html>

  <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
  <title></title>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
  <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"/>
  <!--<![endif]-->
  <style>
          * {
              box-sizing: border-box;
          }
  
          body {
              margin: 0;
              padding: 0;
          }
  
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
          }
  
          #MessageViewBody a {
              color: inherit;
              text-decoration: none;
          }
  
          p {
              line-height: inherit
          }
  
          @media (max-width:620px) {
              .icons-inner {
                  text-align: center;
              }
  
              .icons-inner td {
                  margin: 0 auto;
              }
  
              .row-content {
                  width: 100% !important;
              }
  
              .image_block img.big {
                  width: auto !important;
              }
  
              .stack .column {
                  width: 100%;
                  display: block;
              }
          }
      </style>
  </head>
  <body style="margin: 0; background-color: #d9dffa; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
  <table border="0" cellpadding="0" cellspacing="0" className="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" className="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa; background-image: url('images/body_background_2.png'); background-position: top center; background-repeat: repeat;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" className="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
  <tbody>
  <tr>
  <td className="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-left: 50px; padding-right: 50px; padding-top: 15px; padding-bottom: 15px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="10" cellspacing="0" className="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td>
  <div style="font-family: sans-serif">
  <div style="font-size: 14px; mso-line-height-alt: 16.8px; color: #506bec; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
  <p style="margin: 0; font-size: 14px;"><strong><span style="font-size:38px;">Hello ${ username }</span></strong></p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="10" cellspacing="0" className="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td>
  <div style="font-family: sans-serif">
  <div style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
  <p style="margin: 0; font-size: 14px;">We have detected that you have sent an invitation to join the company ${ company } <br/>to the user ${ username }</p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="10" cellspacing="0" className="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td>
  <div style="font-family: sans-serif">
  <div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
  <p style="margin: 0; font-size: 12px; mso-line-height-alt: 14.399999999999999px;"></p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" className="button_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:20px;text-align:left;">
  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/teams/invite/jejejeje" style="height:48px;width:161px;v-text-anchor:middle;" arcsize="34%" stroke="false" fillcolor="#506bec"><w:anchorlock/><v:textbox inset="5px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="http://localhost:3000/teams/manage/${ code }" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#506bec;border-radius:16px;width:auto;border-top:0px solid TRANSPARENT;border-right:0px solid TRANSPARENT;border-bottom:0px solid TRANSPARENT;border-left:0px solid TRANSPARENT;padding-top:8px;padding-bottom:8px;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:25px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">Manage access</span></span></a>
  <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="10" cellspacing="0" className="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td>
  <div style="font-family: sans-serif">
  <div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
  <p style="margin: 0; font-size: 12px; mso-line-height-alt: 14.399999999999999px;"></p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="10" cellspacing="0" className="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td>
  <div style="font-family: sans-serif">
  <div style="font-size: 14px; mso-line-height-alt: 16.8px; color: #40507a; line-height: 1.2; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">
  <p style="margin: 0; font-size: 14px;">Not interested in the invitation? You can ignore this message.</p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" className="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" className="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
  <tbody>
  <tr>
  <td className="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" className="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="width:100%;padding-right:0px;padding-left:0px;">
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" className="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" className="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px;" width="600">
  <tbody>
  <tr>
  <td className="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" className="icons_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="color:#9d9d9d;font-family:inherit;font-size:15px;padding-bottom:5px;padding-top:5px;text-align:center;">
  <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="text-align:center;">
  <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
  <!--[if !vml]><!-->
  <table cellpadding="0" cellspacing="0" className="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
  <!--<![endif]-->
  <tr>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table><!-- End -->
  </body>
  </html>`
}
