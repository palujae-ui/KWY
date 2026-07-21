/**
 * 프로필 사진.
 * next.config 에서 images.unoptimized 이므로 next/image 를 쓰지 않고
 * 빌드 전 sharp 로 미리 리사이즈한 파일을 <picture> 로 서빙한다.
 * (원본 2048px/5.7MB → assets/portrait-original.png 에 보관, public 에는 두지 않음)
 */
export default function Portrait({
  size = 720,
  className = "",
}: {
  size?: 720 | 360;
  className?: string;
}) {
  return (
    <picture>
      <source srcSet={`/portrait-${size}.webp`} type="image/webp" />
      <img
        src={`/portrait-${size}.jpg`}
        width={size}
        height={size}
        alt="유경원 교수"
        className={className}
        loading={size === 720 ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
}
