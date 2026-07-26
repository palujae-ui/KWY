"use client";

import { useMemo, useState } from "react";
import {
  publications,
  ALL_TOPICS,
  ALL_TYPES,
  ymNum,
  type PubType,
  type Topic,
} from "@/data/publications";
import PubRow from "@/components/PubRow";

export default function ResearchList() {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [type, setType] = useState<PubType | null>(null);

  const filtered = useMemo(() => {
    return publications
      .filter((p) => (topic ? p.topics.includes(topic) : true))
      .filter((p) => (type ? p.type === type : true))
      .sort((a, b) => ymNum(b.ym) - ymNum(a.ym) || b.id - a.id);
  }, [topic, type]);

  // 모바일 탭 타깃 최소 44px 확보 (데스크톱에서는 기존 높이 유지)
  const chip = (active: boolean) =>
    `inline-flex items-center min-h-11 md:min-h-0 px-4 py-2.5 md:py-1.5 rounded-full border text-sm md:text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-blue-600 border-blue-600 text-white font-semibold shadow-xs"
        : "bg-white border-slate-200/90 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
    }`;

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="num text-xs font-bold uppercase tracking-wider text-slate-400 w-12 shrink-0">
            주제
          </span>
          <button
            type="button"
            onClick={() => setTopic(null)}
            className={chip(topic === null)}
          >
            전체
          </button>
          {ALL_TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(topic === t ? null : t)}
              className={chip(topic === t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="num text-xs font-bold uppercase tracking-wider text-slate-400 w-12 shrink-0">
            유형
          </span>
          <button
            type="button"
            onClick={() => setType(null)}
            className={chip(type === null)}
          >
            전체
          </button>
          {ALL_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(type === t ? null : t)}
              className={chip(type === t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pb-4">
        <p className="num text-sm font-semibold text-slate-600">
          검색 결과 <span className="text-blue-600 font-bold">{filtered.length}</span>편
        </p>
        {(topic || type) && (
          <button
            type="button"
            onClick={() => {
              setTopic(null);
              setType(null);
            }}
            className="inline-flex items-center min-h-11 md:min-h-0 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2.5 md:py-1 rounded-full border border-blue-200/60 transition-colors"
          >
            필터 초기화 ↺
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 py-16 text-center text-slate-500">
          해당 조건의 논문이 없습니다.
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((p, i) => (
            <PubRow key={p.id} pub={p} index={i + 1} />
          ))}
        </ul>
      )}
    </>
  );
}
