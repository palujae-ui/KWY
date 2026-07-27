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
import {
  education as fallbackEducation,
  career as fallbackCareer,
  type Education,
  type CareerItem,
} from "@/data/career";
import { profile as fallbackProfile } from "@/data/profile";

export type ProfileData = {
  nameKo: string;
  nameEn: string;
  nameHanja: string;
  affiliation: string;
  affiliationEn: string;
  title: string;
  tagline: string;
  intro: string[];
  contact: { email: string; phone: string; office: string };
  researchAreas: { title: string; topic: string; desc: string }[];
};

function tsProfile(): ProfileData {
  return {
    nameKo: fallbackProfile.nameKo,
    nameEn: fallbackProfile.nameEn,
    nameHanja: fallbackProfile.nameHanja,
    affiliation: fallbackProfile.affiliation,
    affiliationEn: fallbackProfile.affiliationEn,
    title: fallbackProfile.title,
    tagline: fallbackProfile.tagline,
    intro: [...fallbackProfile.intro],
    contact: { ...fallbackProfile.contact },
    researchAreas: fallbackProfile.researchAreas.map((a) => ({ ...a })),
  };
}

/**
 * 공개 페이지용 데이터 조회 — anon 키(쿠키 없음) 클라이언트.
 * RLS로 읽기만 가능. DB 오류/빈 결과 시 기존 TS 데이터로 폴백(안전).
 */
// 환경변수가 없으면(예: 빌드 환경 미설정) 클라이언트를 만들지 않는다.
// 모듈 로드 시점에 throw 하면 빌드가 통째로 실패하므로, null 로 두고 각 getX가 폴백한다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const publicDb =
  supabaseUrl && supabaseAnon ? createClient(supabaseUrl, supabaseAnon) : null;

/** 클라이언트를 반환하거나, 환경변수가 없으면 throw → 각 getX의 try/catch가 폴백 데이터를 반환 */
function requireDb() {
  if (!publicDb) throw new Error("Supabase 환경변수 미설정 — 폴백 데이터 사용");
  return publicDb;
}

export async function getColumns(): Promise<Column[]> {
  try {
    const { data, error } = await requireDb()
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
    const { data, error } = await requireDb()
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

export async function getProfile(): Promise<ProfileData> {
  try {
    const { data, error } = await requireDb()
      .from("profile")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (error || !data) return tsProfile();
    return {
      nameKo: data.name_ko ?? fallbackProfile.nameKo,
      nameEn: data.name_en ?? fallbackProfile.nameEn,
      nameHanja: data.name_hanja ?? fallbackProfile.nameHanja,
      affiliation: data.affiliation ?? fallbackProfile.affiliation,
      affiliationEn: data.affiliation_en ?? fallbackProfile.affiliationEn,
      title: data.title ?? fallbackProfile.title,
      tagline: data.tagline ?? fallbackProfile.tagline,
      intro: Array.isArray(data.intro) ? data.intro : [...fallbackProfile.intro],
      contact: {
        email: data.email ?? fallbackProfile.contact.email,
        phone: data.phone ?? fallbackProfile.contact.phone,
        office: data.office ?? fallbackProfile.contact.office,
      },
      researchAreas: Array.isArray(data.research_areas)
        ? data.research_areas
        : fallbackProfile.researchAreas.map((a) => ({ ...a })),
    };
  } catch {
    return tsProfile();
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    const { data, error } = await requireDb()
      .from("education")
      .select("degree, field, school, ym, note")
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackEducation;
    return data.map((r) => ({
      degree: r.degree,
      field: r.field,
      school: r.school,
      ym: r.ym,
      note: r.note ?? undefined,
    }));
  } catch {
    return fallbackEducation;
  }
}

export async function getCareer(): Promise<CareerItem[]> {
  try {
    const { data, error } = await requireDb()
      .from("career")
      .select("role, org, from_period, to_period, is_primary")
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackCareer;
    return data.map((r) => ({
      role: r.role,
      org: r.org,
      from: r.from_period,
      to: r.to_period,
      primary: !!r.is_primary,
    }));
  } catch {
    return fallbackCareer;
  }
}

export async function getMedia(): Promise<MediaAppearance[]> {
  try {
    const { data, error } = await requireDb()
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
    const { data, error } = await requireDb()
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
