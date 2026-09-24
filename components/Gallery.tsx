import type { CSSProperties } from "react";
import Frame from "./Frame";
import { ART, GALLERY_HEAD, TINTS } from "@/lib/content";
import { doubled } from "@/lib/marquee";

export default function Gallery() {
  return (
    <section id="gallery" className="layer gallery">
      <div className="head headRail">
        <h2 className="title">{GALLERY_HEAD.title}</h2>
        <p className="note">{GALLERY_HEAD.note}</p>
      </div>

      <div className="rail">
        <div className="marquee" style={{ "--dur": "60s" } as CSSProperties}>
          {doubled(ART).map(({ item, key, index, duplicate }) => (
            <figure
              key={key}
              className="card galleryCard"
              aria-hidden={duplicate || undefined}
              style={{ margin: 0 }}
            >
              <Frame
                className="galleryFrame"
                tint={TINTS[index % TINTS.length]}
                src={item.src}
                alt={item.meta}
                hint={GALLERY_HEAD.hint}
              />
              <figcaption className="caption">
                <span>{item.no}</span>
                <span>{item.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
