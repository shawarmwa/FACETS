"use client";

import jsPDF from "jspdf";

type Props = {
  title: string;
  lines: string[];
};

export default function ExportReportButton({ title, lines }: Props) {
  function downloadReport() {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text(title, 14, 20);
    pdf.setFontSize(11);

    lines.forEach((line, index) => {
      pdf.text(line, 14, 35 + index * 8);
    });

    pdf.save("faculty-evaluation-report.pdf");
  }

  return (
    <button onClick={downloadReport} className="rounded bg-emerald-600 px-4 py-2 text-white">
      Export PDF Report
    </button>
  );
}
