import { Fragment, type CSSProperties } from "react";
import { CONTACT } from "@/lib/content";
import { doubled } from "@/lib/marquee";

export default function Contact() {
  return (
    <footer id="contact" className="layer contact">
      <div className="contactTop">
        <h2 className="contactTitle">
          {CONTACT.title.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h2>

        <div className="contactAside">
          <p className="contactCard" style={{ margin: 0 }}>
            {CONTACT.blurb}
          </p>
          <a className="pill" href={`mailto:${CONTACT.email}`}>
            {CONTACT.emailLabel}
          </a>
        </div>
      </div>

      <div className="hello" aria-hidden="true">
        <div className="marquee" style={{ "--dur": "30s" } as CSSProperties}>
          {doubled(CONTACT.hello).map(({ item, key }) => (
            <span key={key}>{item}</span>
          ))}
        </div>
      </div>

      <div className="colophon">
        <div className="colophonLinks">
          {CONTACT.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
        <span>{CONTACT.colophon}</span>
      </div>
    </footer>
  );
}
