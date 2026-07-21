"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print mt-6 px-5 py-2.5 border border-border rounded-md text-[0.88rem] text-fg-2 hover:border-accent hover:text-accent transition-colors duration-200"
    >
      인쇄 / PDF 저장
    </button>
  );
}
