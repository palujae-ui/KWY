/**
 * JSON-LD 구조화 데이터 삽입.
 * 검색엔진뿐 아니라 생성형 AI(답변엔진)가 인물·소속·연구를 오해 없이 파싱하도록 하는 목적.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify 결과만 넣는다(사용자 입력 아님).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
