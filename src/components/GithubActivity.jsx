import githubActivity from "../data/github-activity.json";

// Renders build-time-fetched GitHub data (see scripts/fetch-github-activity.mjs).
// Deliberately never fetches client-side: keeps this at zero runtime API
// calls / zero rate-limit exposure for visitors, and means there's nothing
// here to fail loudly in the browser -- worst case is the honest
// "unavailable" fallback below, never a fabricated number.
function relativeTime(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function GithubActivity() {
  const { available, publicRepos, recentRepos } = githubActivity;

  return (
    <div className="mx-auto max-w-5xl px-6 pb-20 md:px-16 lg:px-24">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <div className="flex items-center gap-3 font-mono text-[11px] text-[#6b6350]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span>
            {available && typeof publicRepos === "number"
              ? `${publicRepos} public repos on GitHub`
              : "Recent work on GitHub"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {available && recentRepos.length > 0
            ? recentRepos.map((r) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[11px] text-dim transition hover:text-accent"
                >
                  {r.name}
                  <span className="text-[#6b6350]"> · {relativeTime(r.pushedAt)}</span>
                </a>
              ))
            : null}
          <a
            href="https://github.com/tawsif-raza"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] text-dim transition hover:text-accent"
          >
            github.com/tawsif-raza ↗
          </a>
        </div>
      </div>
    </div>
  );
}
