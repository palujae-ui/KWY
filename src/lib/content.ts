import { createClient } from "@supabase/supabase-js";
import {
  columns as fallbackColumns,
  videos as fallbackVideos,
  mediaAppearances as fallbackMedia,
  type Column,
  type VideoItem,
  type MediaAppearance,
} from "@/data/insights";
import {
  publications as fallbackPubs,
  featuredIds,
  type Publication,
  type PubType,
  type Topic,
} from "@/data/publications";

/**
 * 공개 페이지용 데이터 조회 — anon 키(쿠키 없음) 클라이언트.
 * RLS로 읽기만 가능. DB 오류/빈 결과 시 기존 TS 데이터로 폴백(안전).
 */
const publicDb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getColumns(): Promise<Column[]> {
  try {
    const { data, error } = await publicDb
      .from("columns")
      .select("title, outlet, date, url")
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackColumns;
    return data as Column[];
  } catch {
    return fallbackColumns;
  }
}

export async function getPublications(): Promise<Publication[]> {
  try {
    const { data, error } = await publicDb
      .from("publications")
      .select("id, title, venue, ym, type, topics, award, featured")
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) {
      return fallbackPubs.map((p) => ({ ...p, featured: featuredIds.includes(p.id) }));
    }
    return data.map((r) => ({
      id: r.id as number,
      title: r.title,
      venue: r.venue,
      ym: r.ym,
      type: r.type as PubType,
      topics: (Array.isArray(r.topics) ? r.topics : []) as Topic[],
      award: r.award ?? undefined,
      featured: !!r.featured,
    }));
  } catch {
    return fallbackPubs.map((p) => ({ ...p, featured: featuredIds.includes(p.id) }));
  }
}

export async function getMedia(): Promise<MediaAppearance[]> {
  try {
    const { data, error } = await publicDb
      .from("media_appearances")
      .select("headline, outlet, reporter, date, url, context, quotes, related_topic")
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackMedia;
    return data.map((r) => ({
      headline: r.headline,
      outlet: r.outlet,
      reporter: r.reporter ?? undefined,
      date: r.date,
      url: r.url,
      context: r.context,
      quotes: Array.isArray(r.quotes) ? (r.quotes as string[]) : [],
      relatedTopic: r.related_topic ?? undefined,
    }));
  } catch {
    return fallbackMedia;
  }
}

export async function getVideos(): Promise<VideoItem[]> {
  try {
    const { data, error } = await publicDb
      .from("videos")
      .select("youtube_id, title, channel, date, start_seconds, note, related_topic")
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackVideos;
    return data.map((r) => ({
      youtubeId: r.youtube_id,
      title: r.title,
      channel: r.channel,
      date: r.date ?? undefined,
      startSeconds: r.start_seconds ?? undefined,
      note: r.note ?? undefined,
      relatedTopic: r.related_topic ?? undefined,
    }));
  } catch {
    return fallbackVideos;
  }
}
