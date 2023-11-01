import {Document, StyleSheet, Page, View, Text, } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fcf8fd'
  },
  section: {
    margin: 10,
    padding: 10,
    textAlign: 'center',
  }
});

interface propsPDF{
  title: string,
  text: Array<any>,
}

const PDF = ({props}:{props:propsPDF}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{props.title}</Text>
        </View>
        <View style={styles.section}>
          <Text>здесб результат в идеале</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PDF;