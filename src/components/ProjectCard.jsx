import Magnetic from "./Magnetic";

const STATUS_CLASSES = {
  live: "status-badge--live",
  progress: "status-badge--progress",
  planning: "status-badge--planning",
};

const STATUS_LABELS = {
  live: "Live",
  progress: "In Progress",
  planning: "Planning",
};

export default function ProjectCard({ project, index, featured = false }) {
  const { title, category, status, statusLabel, problem, approach, outcome, stack, link, image } = project;
  const stackItems = stack.split(", ").map((s) => s.trim());

  const inner = (
    <div className={`glass-card group overflow-hidden ${featured ? "" : "flex gap-5"}`}>
      {/* Image */}
      {featured && image && (
        <div className="project-card-img">
          <img src={image} alt={`${title} preview`} loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className={`p-5 ${featured ? "pt-4" : "py-4"}`}>
        {/* Header */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-accent-dim">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-lg font-medium text-paper transition-colors group-hover:text-accent">
              {title}
              {link && (
                <span className="ml-2 text-sm text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                  ↗
                </span>
              )}
            </h3>
          </div>
          <span className={`status-badge ${STATUS_CLASSES[status]}`}>
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                status === "live" ? "bg-[#4ade80]" : status === "progress" ? "bg-accent" : "bg-dim"
              }`}
            />
            {STATUS_LABELS[status]}
          </span>
        </div>

        {/* Category */}
        <span className="mb-3 inline-block font-mono text-[10px] uppercase tracking-wider text-[#6b6350]">
          {category}
        </span>

        {/* Description */}
        {featured ? (
          <div className="space-y-1.5 text-[13px] leading-relaxed text-dim">
            <p><span className="font-mono text-[10px] uppercase text-[#6b6350]">Problem </span>{problem}</p>
            <p><span className="font-mono text-[10px] uppercase text-[#6b6350]">Built </span>{approach}</p>
            <p><span className="font-mono text-[10px] uppercase text-[#6b6350]">Result </span>{outcome}</p>
          </div>
        ) : (
          <p className="text-[13px] leading-relaxed text-dim">{problem}</p>
        )}

        {/* Tech Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {stackItems.map((tech) => (
            <span key={tech} className="tech-pill">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <Magnetic>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          data-cursor="View"
          className="block"
        >
          {inner}
        </a>
      </Magnetic>
    );
  }

  return inner;
}
