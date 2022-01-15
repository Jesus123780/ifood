import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import React from 'react'
// import currencyFormatter from 'currency-formatter'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/en-au'

// Create 
const styles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 20,
    },
    section: {
        paddingBottom: 20
    },
    sectionInfo: {
        paddingBottom: 20,
        paddingTop: 20,
        width: '100%',
        flexDirection: 'row'
        // flexWrap: 'wrap'
    },
    sectionHeader: {
        flexDirection: 'column',
        lineHeight: 1,
        paddingVertical: 20,
    },
    viewParagraph: {
        paddingTop: 15,
        paddingBottom: 10
    },
    tableSection: {
        flexDirection: 'column',
        paddingVertical: 20,
    },
    tableRow: {
        flexDirection: 'row',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: '#cb1d6c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableRowItems: {
        flexDirection: 'row',
        overflow: 'hidden',
        width: '100%',
    },
    tableCell: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        overflow: 'hidden',
        borderColor: '#afafaf',
        paddingHorizontal: 6,
        paddingVertical: 4,
        fontSize: 7
    },
    headerText: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
        paddingVertical: 4,
        fontSize: 7
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        alignSelf: 'flex-end',
    },
    subtitle: {
        fontSize: 7,
        color: '#000',
        textDecoration: 'underline',
        textAlign: 'right'
    },
    row: {
        padding: 5,
        marginLeft: 20,
        marginRight: 20,
    },
    header: {
        padding: 1,
        justifyContent: 'center',
        backgroundColor: '#cb1d6c'
    },
    textHeader: {
        color: '#fff',
        fontSize: 10,

    },
    image: {
        objectFit: 'contain',
    },
})

const InvoicePdfGenerate = ({ pdfDocumentData }) => {
    const { dataInvoice } = pdfDocumentData
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.row}>
                    <Text style={styles.subtitle}>{moment().format('LL')} Generated document</Text>
                </View>
                <View style={{ width: 250, height: 100, marginBottom: 8 }}>
                    <Image style={[styles.image, { width: '100%', height: '100%' }]} src="/images/Spice-Logo.jpg" />
                </View>
                <View style={styles.sectionHeader}>
                    <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#ccc' }]}>#  12312312</Text>
                    <Text style={[styles.headerText, { fontSize: 30, fontWeight: 400, color: '#000' }]}>12312</Text>
                    <Text style={[styles.headerText, { fontSize: 13, fontWeight: 100, color: '#000' }]}> 2312</Text>
                    <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}> Data created</Text>
                    <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}> EventCommences: </Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Name</Text>
                </View>
                <View style={styles.tableSection}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>N° ITEM</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Subtotal Tickets Sold</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Ticket Type </Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Sales Received</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Subtotal</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Comm Subtotal</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>VAT On Comm</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Ticket Cat TotalDue</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Ticket Type Discount</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Subtotal Ticket TypeLess Discount</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Ticket Price</Text>
                    </View>
                    {dataInvoice && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((x, i) => (
                        <View key={x._id} style={styles.tableRowItems}>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>{i + 1}</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>121212</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>12121</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>123123</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>123123</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>123123</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>123123</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>123123</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>123123</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>123123</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>123123</Text>
                        </View>
                    ))}
                </View>
                <View style={[styles.sectionInfo]}>
                    <View>
                        <View style={{ width: 300, marginBottom: 8 }}>
                            <Text style={[styles.headerText, { fontSize: 15, fontWeight: 100, color: '#000' }]}>Total Due</Text>
                            <Text style={[styles.headerText, { fontSize: 9, fontWeight: 100, color: '#000' }]}> 231231231 </Text>
                        </View>
                    </View>
                    <View>
                        <View style={{ borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, width: 300, marginBottom: 8 }}>
                            <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000' }]}>Total Sales Received</Text>
                            <Text style={[styles.headerText, { fontSize: 9, fontWeight: 100, color: '#000' }]}> 12312312</Text>
                        </View>
                        <View style={{ borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, width: 300, marginBottom: 8 }}>
                            <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000' }]}>Total Discounts</Text>
                            <Text style={[styles.headerText, { fontSize: 9, fontWeight: 100, color: '#000' }]}> 12312312 </Text>
                        </View>
                        <View style={{ borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, width: 300, marginBottom: 8 }}>
                            <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000' }]}>Total Vat On Comms</Text>
                            <Text style={[styles.headerText, { fontSize: 9, fontWeight: 100, color: '#000' }]}> 12312</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerRow}>
                        <Text style={{ paddingBottom: 10 }}>3213123</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export const generatePdfDocumentInvoice = async documentData => {
    console.log(documentData)
    const blob = await pdf((
        <InvoicePdfGenerate
            title={`doc ${'name' || ''}`}
            pdfDocumentData={documentData}
        />
    )).toBlob()
    saveAs(blob, 'name' || 'Doc')
}

generatePdfDocumentInvoice.propTypes = {
    pdfDocumentData: PropTypes.object
}