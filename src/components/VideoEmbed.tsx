"use client";

import { useState } from "react";
import type { VideoItem } from "@/data/insights";

/**
 * 유튜브 facade 임베드.
 * 처음엔 썸네일 + 재생 버튼만 렌더 → 클릭 시 그 자리에서 플레이어 로드.
 * - 클릭 전엔 유튜브에 접속하지 않음(개인정보 보호), 페이지도 가벼움
 * - youtube-nocookie.com 사용
 * - startSeconds 지정 시 해당 시점부터 재생
 */
export default function VideoEmbed({ video }: { video: VideoItem }) {
  const [playing, setPlaying] = useState(false);

  const start = video.startSeconds ? `&start=${video.startSeconds}` : "";
  const src = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0${start}`;

  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all overflow-hidden">
      {/* 16:9 영역 */}
      <div className="relative w-full aspect-video bg-slate-900">
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={src}
            title={video.title}
            loading="lazy"
            allow="accelerated-encoder; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${video.title} 재생`}
            className="group absolute inset-0 w-full h-full"
          >
            {/* 썸네일 — 유튜브 CDN(어떤 영상이든 자동 표시). 관리자가 추가한 새 영상도 바로 노출됨. */}
            <img
              src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <span className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
            {/* 재생 버튼 */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600 group-hover:bg-red-700 shadow-lg transition-all group-hover:scale-105">
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>

      {/* 캡션 */}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-xs font-semibold">
            {video.channel}
          </span>
          {video.date && (
            <span className="num text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {video.date}
            </span>
          )}
          {video.relatedTopic && (
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full">
              {video.relatedTopic}
            </span>
          )}
        </div>
        <h3 className="font-bold text-base text-slate-900 leading-snug">
          {video.title}
        </h3>
        {video.note && (
          <p className="text-xs text-slate-500 mt-2">{video.note}</p>
        )}
      </div>
    </article>
  );
}
