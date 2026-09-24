/**
 * A fixed-height image well on a tint background. Until the client supplies a
 * real image the tint plus a mono hint stands in for it.
 */
export default function Frame({
  className,
  tint,
  src,
  alt,
  hint,
}: {
  className?: string;
  tint: string;
  src?: string;
  alt?: string;
  hint: string;
}) {
  return (
    <div
      className={className ? `frame ${className}` : "frame"}
      style={{ backgroundColor: tint }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- client art is dropped in at any ratio
        <img src={src} alt={alt ?? ""} loading="lazy" />
      ) : (
        <span className="framePlaceholder" aria-hidden="true">
          {hint}
        </span>
      )}
    </div>
  );
}
