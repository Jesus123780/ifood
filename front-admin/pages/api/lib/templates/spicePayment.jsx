/* eslint-disable @next/next/no-img-element */
import { dateFormat } from '../utils'

const Styles = {
  body: {
    backgroundColor: '#fff',
    margin: '0px',
    padding: '0px'
  },
  section_one: {
    margin: 0
  },
  container: {
    maxWidth: '30cm',
    margin: '0 auto',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    backgroundColor: 'white',
    fontSize: '0px',
    padding: '40px',
    fontFamily: '\'Roboto\',sans-serif'
  },
  text: {
    fontSize: '14px',
    display: 'inline-block',
    fontWeight: '300',
    color: '#000000',
    lineHeight: 1.4,
    verticalAlign: 'middle',
    fontFamily: '\'Roboto\',sans-serif'
  },
  textBlock: {
    fontSize: '16px',
    display: 'inline-block',
    fontWeight: '300',
    color: '#000000',
    lineHeight: 1.4,
    margin: '15px 0',
    verticalAlign: 'middle',
    fontFamily: '\'Roboto\',sans-serif'
  },
  textBold: {
    fontSize: '12px',
    display: 'inline-block',
    fontWeight: '600',
    color: '#000000',
    lineHeight: 1.4,
    verticalAlign: 'middle',
    fontFamily: '\'Roboto\',sans-serif'
  },
  header: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#1a0303',
    display: '-webkit-box',
    lineHeight: '40px',
    flexWrap: 'wrap',
    fontWeight: '400px',
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    margin: '0px',
    justifyContent: 'space-between'
  },
  lineitembox: {
    fontSize: '10px',
    color: ' #000',
    lineHeight: '20px',
    border: '1px dotted #c7c7c7',
    fontWeight: '400px',
    margin: '0px',
    width: '100%',
    textOverflow: 'ellipsis',
    minWidth: '100%',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'start'
  },
  wrapperInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0px',
    flexWrap: 'wrap',
    width: '50%',
    minWidth: '50%',
    alignContent: 'center',
    maxWidth: '50%'
  },
  wrapperFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0px',
    flexWrap: 'wrap',
    alignContent: 'center',
    width: '90%',
    minWidth: '90%',
    maxWidth: '90%',
    placeContent: 'center flex-end'
  },
  subheader: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#1a0303',
    display: 'flex',
    justifyContent: 'space-between',
    wordBreak: 'break-word',
    lineHeight: '40px',
    fontWeight: '400px',
    margin: '0px',
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%'
  },
  headerline: {
    fontSize: '16px',
    marginBottom: '16px',
    backgroundColor: '#cb1d6c',
    color: '#fff',
    margin: '0px',
    padding: '5px',
    verticalAlign: 'middle'
  },
  img: {
    display: 'inline',
    wordBreak: 'break-word',
    width: '25%',
    minWidth: '25%',
    maxWidth: '25%',
    verticalAlign: 'middle'
  },
  paragraph: {
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: '300',
    color: '#000000',
    wordBreak: 'break-word',
    width: 'calc(75% - 40px)',
    minWidth: 'calc(75% - 40px)',
    maxWidth: 'calc(75% - 40px)',
    overflow: 'hidden',
    margin: '0',
    lineHeight: 1.4,
    verticalAlign: 'middle'
  },
  title: {
    display: 'inline-block',
    overflow: 'hidden',
    fontSize: '40px',
    fontFamily: '\'Roboto\',sans-serif',
    fontWeight: '300',
    color: '#000000',
    wordBreak: 'break-word',
    lineHeight: 1.4,
    verticalAlign: 'middle'
  },
  LateralInfo: {
    display: 'inline-block',
    overflow: 'hidden',
    fontSize: '20px',
    fontFamily: '\'Roboto\',sans-serif',
    fontWeight: '300',
    color: '#000000',
    wordBreak: 'break-word',
    lineHeight: 1.4,
    verticalAlign: 'middle'
  },
  Subparagraph: {
    display: 'inline-block',
    fontSize: '17px',
    overflow: 'hidden',
    fontWeight: '400',
    wordBreak: 'break-word',
    color: '#000000',
    lineHeight: 1.4,
    verticalAlign: 'middle'
  },
  Card: {
    borderLeft: '1px dotted #c7c7c7',
    padding: '5px',
    maxWidth: '12%',
    wordBreak: 'break-word',
    minWidth: '12%',
    overflow: 'hidden',
    width: '12%'
  },
  logo: {
    overflow: 'hidden',
    wordBreak: 'break-word',
    height: '150px',
    objectFit: 'contain',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0px',
    flexWrap: 'wrap',
    width: '50%',
    minWidth: '50%',
    alignContent: 'center',
    maxWidth: '50%'
  },
  linkInvoice: {
    overflow: 'hidden',
    wordBreak: 'break-word',
    height: '150px',
    objectFit: 'contain',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0px',
    flexWrap: 'wrap',
    width: '10%',
    minWidth: '10%',
    alignContent: 'center',
    maxWidth: '10%'
  },
  subtext: {
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    wordBreak: 'break-word',
    overflow: 'hidden'
  },
  TextCard: {
    fontSize: '12px',
    display: 'inline-block',
    fontWeight: '300',
    overflow: 'hidden',
    color: '#000000',
    wordBreak: 'break-word',
    lineHeight: 1.4,
    verticalAlign: 'middle',
    fontFamily: '\'Roboto\',sans-serif'
  },
  TextCardBold: {
    overflow: 'hidden',
    fontSize: '12px',
    display: 'inline-block',
    fontWeight: '400',
    color: '#000000',
    lineHeight: 1.4,
    wordBreak: 'break-word',
    verticalAlign: 'middle',
    fontFamily: '\'Roboto\',sans-serif'
  },
  block: {
    width: '33.33%',
    minWidth: '33.33%',
    maxWidth: '33.33%',
    height: '100px',
    display: 'inline-grid',
    justifyContent: 'flex-start',
    textAlign: 'start'
  },
  ctnFooter: {
    width: '33.33%',
    minWidth: '33.33%',
    maxWidth: '33.33%',
    height: '100px',
    display: 'inline-grid',
    justifyContent: 'flex-end',
    textAlign: 'start'
  },
  btn: {
    minHeight: '36px',
    fontWeight: '300',
    backgroundColor: '#ce081f',
    overflow: 'hidden',
    border: 'none',
    padding: '10px',
    wordBreak: 'break-word',
    display: 'inline-flex',
    flexFlow: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 'auto',
    maxWidth: 'auto',
    margin: '20px 0',
    lineHeight: '20px',
    cursor: 'pointer',
    borderRadius: '18px',
    fontSize: '15px',
    color: '#fff',
    height: '40px',
    width: 'auto',
    textAlign: 'center'
  }
}
const data = [
  {
    '_id' : '61c5b4b8526d1563142ff641',
    'Date' : '2021-12-24T08:34:58.002Z',
    'isPaymentConfirm' : false,
    'idComp' : '61c38c5500f2d114980e255f',
    'Idescription' : 'Esta es la ultima description',
    'totalInvoicePayment' : 51.3,
    'lineItemsInvoiceIsPay' : [ 
      {
        'isPaid' : false,
        'isApprovedByInvoiceSender' : false,
        'hasBeenReceived' : false,
        'isRedo' : false,
        '_id' : '61c5b4b8526d1563142ff644',
        'agentDetails' : {
          'legalName' : 'SPICE YORKS LIMITED',
          'agentContact' : 'Jonathan Banks',
          'agentTradingName' : 'Spice Yorkshire',
          'agentEmail' : 'jonathan@spiceyorks.com',
          'agentAddress1' : '2 Cuniver Court',
          'agentAddress2' : 'Liversedge',
          'agentAddress3' : '',
          'agentCity' : 'West Yorkshire',
          'agentCountry' : 'England',
          'agentPostCode' : 'WF15 8LR',
          'VATRegNo' : '',
          'agentVATRegistered' : false,
          'agentCompanyNumber' : '04633951'
        },
        'lineItemsArray' : [ 
          {
            '_id' : '61c5b4b8526d1563142ff645',
            'newArray' : []
          }
        ]
      }, 
      {
        'isPaid' : false,
        'isApprovedByInvoiceSender' : false,
        'hasBeenReceived' : false,
        'isRedo' : false,
        '_id' : '61c5b4b8526d1563142ff647',
        'agentDetails' : {
          'legalName' : 'SPICE YORKS LIMITED',
          'agentContact' : 'Jonathan Banks',
          'agentTradingName' : 'Spice Yorkshire',
          'agentEmail' : 'jonathan@spiceyorks.com',
          'agentAddress1' : '2 Cuniver Court',
          'agentAddress2' : 'Liversedge',
          'agentAddress3' : '',
          'agentCity' : 'West Yorkshire',
          'agentCountry' : 'England',
          'agentPostCode' : 'WF15 8LR',
          'VATRegNo' : '',
          'agentVATRegistered' : false,
          'agentCompanyNumber' : '04633951'
        },
        'lineItemsArray' : [ 
          {
            '_id' : '61c5b4b8526d1563142ff648',
            'newArray' : []
          }
        ]
      }, 
      {
        'isPaid' : false,
        'isApprovedByInvoiceSender' : false,
        'hasBeenReceived' : false,
        'isRedo' : false,
        '_id' : '61c5b4b9526d1563142ff64a',
        'agentDetails' : {
          'legalName' : 'SPICE YORKS LIMITED',
          'agentContact' : 'Jonathan Banks',
          'agentTradingName' : 'Spice Yorkshire',
          'agentEmail' : 'jonathan@spiceyorks.com',
          'agentAddress1' : '2 Cuniver Court',
          'agentAddress2' : 'Liversedge',
          'agentAddress3' : '',
          'agentCity' : 'West Yorkshire',
          'agentCountry' : 'England',
          'agentPostCode' : 'WF15 8LR',
          'VATRegNo' : '',
          'agentVATRegistered' : false,
          'agentCompanyNumber' : '04633951'
        },
        'lineItemsArray' : [ 
          {
            '_id' : '61c5b4b9526d1563142ff64b',
            'newArray' : []
          }
        ]
      }, 
      {
        'isPaid' : false,
        'isApprovedByInvoiceSender' : false,
        'hasBeenReceived' : false,
        'isRedo' : false,
        '_id' : '61c5b4b9526d1563142ff64d',
        'agentDetails' : {
          'legalName' : 'SPICE YORKS LIMITED',
          'agentContact' : 'Jonathan Banks',
          'agentTradingName' : 'Spice Yorkshire',
          'agentEmail' : 'jonathan@spiceyorks.com',
          'agentAddress1' : '2 Cuniver Court',
          'agentAddress2' : 'Liversedge',
          'agentAddress3' : '',
          'agentCity' : 'West Yorkshire',
          'agentCountry' : 'England',
          'agentPostCode' : 'WF15 8LR',
          'VATRegNo' : '',
          'agentVATRegistered' : false,
          'agentCompanyNumber' : '04633951'
        },
        'lineItemsArray' : [ 
          {
            '_id' : '61c5b4b9526d1563142ff64e',
            'newArray' : []
          }
        ]
      }
    ],
    '__v' : 0
  }
]
export const SpicePayment = () => {

  return (
    <div>
      <body style={Styles.body}>
        <div style={Styles.container} >
          <div style={Styles.header} >
            <div style={Styles.logo}>
              <img
                alt='SpiceLogo'
                src='https://www.spiceuk.com/Images/Spice-Logo.jpg'
                style={Styles.logo}
              />
            </div>
            <div style={Styles.wrapperInfo}>
              <div style={Styles.block}>
                <h5 style={Styles.LateralInfo}>INVOICE DATE:  </h5>
              </div>
              <div style={Styles.block}>
                <h5 style={Styles.LateralInfo}>{dateFormat(data[0].Date)} </h5>
              </div>
            </div>
          </div>
          <h1 style={Styles.title}> COMMISSION PAYMENT</h1>
          <div>
          </div>
          {data && data[0]?.lineItemsInvoiceIsPay?.map(item => {
            return (
              <div key={item._id}>
                <h2 style={Styles.headerline} > Agent Trading Name: {item.agentDetails.agentTradingName}  </h2>
                <div style={Styles.section_one}>
                  <div style={Styles.lineitembox}>
                    <div style={Styles.Card}>
                      <h2 style={Styles.TextCard}>Ticket Type:</h2>
                    </div>
                    <div style={Styles.Card}>
                      <h2 style={Styles.TextCard}>Total Tix Sold:</h2>
                    </div>
                    <div style={Styles.Card}>
                      <h2 style={Styles.TextCard}>Rev Tix Sold:</h2>
                    </div>
                    <div style={Styles.Card}>
                      <h2 style={Styles.TextCard}>Subtotal:</h2>
                    </div>
                    <div style={Styles.Card}>
                      <h2 style={Styles.TextCard}>Commission Due for Tix Sales:</h2>
                    </div>
                    <div style={Styles.Card}>
                      <h2 style={Styles.TextCard}> Total Discounts Applied to Sales:</h2>
                    </div>
                    <div style={Styles.Card}>
                      <h2 style={Styles.TextCard}>Total Due After Discounts:</h2>
                    </div>
                    <div style={Styles.Card}>
                      <h2 style={Styles.TextCard}>Ticket Price:</h2>
                    </div>
                  </div>
                  {item && item?.lineItemsArray?.map(lineitem => {
                    return (
                      <div key={lineitem._id} style={Styles.lineitembox} >
                        <div style={Styles.Card}>
                          <h4 style={Styles.TextCardBold}>{lineitem?.ticketType}</h4>
                        </div>
                        <div style={Styles.Card}>
                          <h4 style={Styles.TextCardBold}> 12</h4>
                        </div>
                        <div style={Styles.Card}>
                          <h4 style={Styles.TextCardBold}>£ 12</h4>
                        </div>
                        <div style={Styles.Card}>
                          <h4 style={Styles.TextCardBold}>£ 12</h4>
                        </div>
                        <div style={Styles.Card}>
                          <h4 style={Styles.TextCardBold}>£ 12</h4>
                        </div>
                        <div style={Styles.Card}>
                          <h4 style={Styles.TextCardBold}>£ 12</h4>
                        </div>
                        <div style={Styles.Card}>
                          <h4 style={Styles.TextCardBold}>£ 12</h4>
                        </div>
                        <div style={Styles.Card}>
                          <h4 style={Styles.TextCardBold}>£ 12</h4>
                        </div>
                      </div>
                    )
                  })}
                  <div style={Styles.header} >
                    <div style={Styles.linkInvoice}>
                      <a
                        href='http://localhost:3000/invoice${item.link}'
                        rel='noreferrer'
                        target='_blank'
                      ><span style={Styles.btn} >View Invoice</span> </a>
                    </div>
                    <div style={Styles.wrapperFooter}>
                      <div style={Styles.ctnFooter}>
                        <h5 style={Styles.textBold}>Total Revenue of Tickets You Sold:  </h5>
                        <h5 style={Styles.text}>Total Commission (including VAT) Payable to you: </h5>
                        <h5 style={Styles.text}>Total Payable by your group to the event owner: </h5>
                      </div>
                      <div style={Styles.ctnFooter}>
                        <h5 style={Styles.text}>£ {parseFloat(item?.total_sales_received).toFixed(2)}  </h5>
                        <h5 style={Styles.text}>£ {item?.total_comm_due}</h5>
                        <h5 style={Styles.text}>£ {item?.invoice_total}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </body>
    </div>
  )
}
