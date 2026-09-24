import { EDUCATION, EXPERIENCE, EXPERIENCE_HEAD } from "@/lib/content";

export default function Experience() {
  return (
    <section id="experience" className="layer experience">
      <div className="head">
        <h2 className="title">{EXPERIENCE_HEAD.title}</h2>
        <p className="note">{EXPERIENCE_HEAD.note}</p>
      </div>

      {EXPERIENCE.map((r) => (
        <article key={`${r.company}-${r.role}`} className="roleRow">
          <div className="roleTop">
            <h3 className="roleTitle">
              <a href={r.href} target="_blank" rel="noreferrer">
                {r.company}
              </a>
            </h3>
            <span className="roleName">{r.role}</span>
            <span className="roleDates">{r.dates}</span>
          </div>
          <p className="roleBlurb">{r.blurb}</p>
        </article>
      ))}

      <div className="roleRow education">
        <div className="roleTop">
          <h3 className="roleTitle">
            <a href={EDUCATION.href} target="_blank" rel="noreferrer">
              {EDUCATION.school}
            </a>
          </h3>
          <span className="roleName">{EDUCATION.degree}</span>
          <span className="roleDates">{EDUCATION.label}</span>
        </div>
      </div>
    </section>
  );
}
