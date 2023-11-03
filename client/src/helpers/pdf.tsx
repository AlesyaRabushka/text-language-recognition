import {Document, StyleSheet, Page, View, Text, Font, } from "@react-pdf/renderer";


Font.register({
  family: "Roboto",
  src:
    "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fcf8fd'
  },
  section: {
    margin: 10,
    padding: 10,
    textAlign: 'left',
    fontFamily: 'Roboto',
  }
});

interface propsPDF{
  title: string,
  result: string,
}

const PDF = ({props}:{props:propsPDF}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{props.title}</Text>
        </View>
        <View style={styles.section}>
          <Text>{props.result}</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PDF;