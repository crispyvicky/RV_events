import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#111" },
  brand: { fontSize: 22, letterSpacing: 3, marginBottom: 4 },
  muted: { color: "#666", marginBottom: 2 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 24 },
  sectionTitle: { fontSize: 11, marginTop: 20, marginBottom: 8, letterSpacing: 1 },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1 solid #ddd",
    paddingBottom: 6,
    marginBottom: 4,
    fontWeight: "bold",
  },
  tableRow: { flexDirection: "row", paddingVertical: 5, borderBottom: "1 solid #f0f0f0" },
  colDesc: { width: "46%" },
  colQty: { width: "12%" },
  colRate: { width: "21%" },
  colAmt: { width: "21%", textAlign: "right" },
  totals: { marginTop: 16, alignItems: "flex-end" },
  totalLine: { flexDirection: "row", width: 200, justifyContent: "space-between", marginBottom: 4 },
  grand: { marginTop: 6, fontSize: 12, fontWeight: "bold" },
  notes: { marginTop: 28, color: "#555", lineHeight: 1.4 },
});

function money(n) {
  return `INR ${Number(n || 0).toLocaleString("en-IN")}`;
}

export function QuotePdfDocument({ quote, settings }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.brand}>{settings.companyName || "RV EVENTS"}</Text>
        <Text style={styles.muted}>{settings.address}</Text>
        <Text style={styles.muted}>
          {settings.email} · {settings.phone}
        </Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.sectionTitle}>BILL TO</Text>
            <Text>{quote.client?.name}</Text>
            <Text style={styles.muted}>{quote.client?.email}</Text>
            <Text style={styles.muted}>{quote.client?.phone}</Text>
            <Text style={styles.muted}>{quote.client?.city}</Text>
          </View>
          <View>
            <Text>Quote: {quote.quoteNumber}</Text>
            <Text style={styles.muted}>Status: {quote.status}</Text>
            <Text style={styles.muted}>
              Event: {quote.event?.type}
              {quote.event?.date ? ` · ${quote.event.date}` : ""}
            </Text>
            {quote.event?.venue ? (
              <Text style={styles.muted}>Venue: {quote.event.venue}</Text>
            ) : null}
          </View>
        </View>

        <Text style={styles.sectionTitle}>LINE ITEMS</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.colDesc}>Description</Text>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={styles.colRate}>Rate</Text>
          <Text style={styles.colAmt}>Amount</Text>
        </View>
        {(quote.lineItems || []).map((item, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.colDesc}>{item.description}</Text>
            <Text style={styles.colQty}>
              {item.qty} {item.unit}
            </Text>
            <Text style={styles.colRate}>{money(item.rate)}</Text>
            <Text style={styles.colAmt}>{money(item.amount)}</Text>
          </View>
        ))}

        <View style={styles.totals}>
          <View style={styles.totalLine}>
            <Text>Subtotal</Text>
            <Text>{money(quote.subtotal)}</Text>
          </View>
          <View style={styles.totalLine}>
            <Text>GST ({quote.gstPercent || settings.gstPercent || 18}%)</Text>
            <Text>{money(quote.gst)}</Text>
          </View>
          <View style={styles.totalLine}>
            <Text>CGST</Text>
            <Text>{money(quote.cgst)}</Text>
          </View>
          <View style={styles.totalLine}>
            <Text>SGST</Text>
            <Text>{money(quote.sgst)}</Text>
          </View>
          <View style={[styles.totalLine, styles.grand]}>
            <Text>Grand Total</Text>
            <Text>{money(quote.grandTotal)}</Text>
          </View>
        </View>

        {quote.notes ? <Text style={styles.notes}>Notes: {quote.notes}</Text> : null}
      </Page>
    </Document>
  );
}
