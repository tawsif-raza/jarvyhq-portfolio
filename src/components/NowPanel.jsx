// Keep this genuinely current -- update NOW_TEXT and NOW_UPDATED whenever
// what you're actively building changes. A "Now" panel that goes stale is
// worse than not having one; this is content maintenance, not code.
// Grounded directly in the AI Voice Employee entry already published in
// Projects.jsx -- not a separate, unverified claim.
const NOW_TEXT =
  "Training the Qwen 2.5 QLoRA fine-tune for AI Voice Employee — data pipeline and training config are done, model training is next.";
const NOW_UPDATED = "Sep 2026";

export default function NowPanel() {
  return (
    <div className="relative mx-auto max-w-5xl px-6 md:px-16 lg:px-24">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line py-6 font-mono text-[11px] text-dim">
        <span className="flex items-center gap-2 text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          NOW
        </span>
        <span className="max-w-2xl">{NOW_TEXT}</span>
        <span className="text-[#6b6350]">· updated {NOW_UPDATED}</span>
      </div>
    </div>
  );
}
