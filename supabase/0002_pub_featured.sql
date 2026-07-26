-- publications 에 '대표 연구' 표시용 featured 컬럼 추가 (홈 '대표 연구' 섹션에서 사용)
alter table public.publications add column if not exists featured boolean default false;
