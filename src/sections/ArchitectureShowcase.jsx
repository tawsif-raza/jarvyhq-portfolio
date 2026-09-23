import { useState } from "react";
import SectionLabel from "../components/SectionLabel";
import RevealText from "../components/RevealText";

const ARCHITECTURES = [
  {
    id: "voice-employee",
    name: "AI Voice Employee",
    category: "Agentic / Fine-Tuned LLM",
    description:
      "A domain-fine-tuned assistant architecture operating on LangGraph state machines with persistent checkpointer and human-in-the-loop validation.",
    nodes: [
      {
        id: "ingest",
        label: "FastAPI Ingestion",
        type: "Gateway",
        tech: "FastAPI, Pydantic v2",
        execution: "Asynchronous / Non-blocking",
        role: "Validates incoming payload schemas, authenticates caller, and initializes state dictionary with unique session thread ID.",
        fallback: "Rejects malformed payloads with 422; circuit breaker prevents cascading downstream errors.",
      },
      {
        id: "router",
        label: "LangGraph Router",
        type: "Orchestrator",
        tech: "LangGraph, Python 3.11",
        execution: "State Machine Traversal",
        role: "Evaluates intent and state context to determine whether to branch into direct answer, tool invocation, or escalation subgraphs.",
        fallback: "Routes to a conservative clarification node if intent routing is ambiguous.",
      },
      {
        id: "model",
        label: "Qwen 2.5 (QLoRA)",
        type: "Inference Engine",
        tech: "Qwen 2.5 0.5B, LoRA adapter, vLLM",
        execution: "Local GPU Inference (LoRA)",
        role: "Generates domain-grounded responses fine-tuned on curated company interactions. Adheres strictly to system instructions.",
        fallback: "Falls back to cached responses or secondary base model if local GPU endpoint times out.",
      },
      {
        id: "db",
        label: "PostgreSQL State Checkpoint",
        type: "Persistence",
        tech: "PostgreSQL, SQLAlchemy, asyncpg",
        execution: "Async Connection Pool",
        role: "Stores thread conversation history, state snapshots, and rollback checkpoints for multi-turn sessions.",
        fallback: "In-memory LRU cache maintains read state during database connection pool recovery.",
      },
      {
        id: "gate",
        label: "Human Review Gate",
        type: "Safety Boundary",
        tech: "LangGraph Interrupt, Webhook",
        execution: "Asynchronous Interrupt",
        role: "Pauses graph execution whenever high-stakes actions are triggered, awaiting explicit human approval before committing changes.",
        fallback: "Halts automated transmission until manual review is confirmed.",
      },
    ],
  },
  {
    id: "outbound-engine",
    name: "AI Outbound Engine",
    category: "Autonomous Workflow",
    description:
      "A resilient lead prospecting and contextual personalization pipeline running unattended on n8n with Groq acceleration and Gmail draft gates.",
    nodes: [
      {
        id: "trigger",
        label: "Trigger & Ingestion",
        type: "Scheduler",
        tech: "n8n Cron, Webhooks",
        execution: "Scheduled Cron / Webhook",
        role: "Runs scheduled prospecting queries across Apollo API matching defined ICP criteria (industry, head count, location).",
        fallback: "Logs execution state; exponential backoff on third-party API rate limits.",
      },
      {
        id: "enrich",
        label: "Enrichment & Dedupe",
        type: "Data Processing",
        tech: "n8n Data Tables, Fuzzy Matching",
        execution: "In-Memory Deduplication",
        role: "Enriches company telemetry, scrubs existing CRM contacts, and discards leads contacted within the retention window.",
        fallback: "Skips duplicates silently and records an audit trace in data store.",
      },
      {
        id: "reason",
        label: "Groq Llama 3 Reasoning",
        type: "LLM Copy Generator",
        tech: "Groq Cloud API, Llama 3 70B",
        execution: "Streaming Cloud Inference",
        role: "Analyzes company value proposition and crafts customized, concise outreach angles matching the prospect's role.",
        fallback: "Retries with 8B model if 70B model capacity threshold is reached.",
      },
      {
        id: "quality",
        label: "Quality & Tone Gate",
        type: "Guardrail",
        tech: "Regex & Heuristic Filter",
        execution: "Deterministic Heuristic",
        role: "Evaluates copy for banned spam keywords, length constraints (max 120 words), and valid variable substitutions.",
        fallback: "Flags drafts failing scoring for manual review rather than queuing for email creation.",
      },
      {
        id: "draft",
        label: "Gmail Draft Creator",
        type: "Output API",
        tech: "Google Workspace Gmail API",
        execution: "Authenticated REST Call",
        role: "Creates completed draft emails inside Gmail for human review before any outbound send occurs. Zero blind auto-sending.",
        fallback: "Stores generated copy in fallback CSV if Google OAuth token requires refresh.",
      },
    ],
  },
];

export default function ArchitectureShowcase() {
  const [selectedArchIndex, setSelectedArchIndex] = useState(0);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);

  const currentArch = ARCHITECTURES[selectedArchIndex];
  const currentNode = currentArch.nodes[selectedNodeIndex] || currentArch.nodes[0];

  const handleArchChange = (index) => {
    setSelectedArchIndex(index);
    setSelectedNodeIndex(0);
  };

  return (
    <section
      id="architecture"
      aria-label="AI System Architectures"
      className="reading-scrim reading-scrim--center relative mx-auto max-w-5xl overflow-hidden px-6 py-20 md:px-16 lg:px-24"
    >
      <SectionLabel number="ARCH" title="SYSTEM ARCHITECTURE" />

      <RevealText
        text="Interactive blueprints of systems currently in production."
        className="font-display mb-4 max-w-2xl text-3xl font-medium leading-tight text-paper md:text-4xl"
      />

      <p className="mb-10 max-w-xl text-[15px] leading-relaxed text-dim">
        Click any node in the pipeline below to inspect its operational role,
        tech stack, execution mode, and fault-tolerance safeguards.
      </p>

      {/* Architecture Toggle Tabs */}
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Architecture blueprints">
        {ARCHITECTURES.map((arch, idx) => {
          const isSelected = selectedArchIndex === idx;
          return (
            <button
              key={arch.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => handleArchChange(idx)}
              className={`filter-tab ${
                isSelected ? "filter-tab--active font-medium" : ""
              }`}
            >
              {arch.name}
              <span className="ml-2 text-[10px] text-accent-dim">
                [{arch.category}]
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Architecture Inspector Card */}
      <div className="glass-card p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-line/60 pb-4">
          <div>
            <h3 className="font-display text-xl font-medium text-paper">
              {currentArch.name}
            </h3>
            <p className="mt-1 text-xs text-dim max-w-lg">
              {currentArch.description}
            </p>
          </div>
          <span className="font-mono text-[10px] text-accent uppercase tracking-wider">
            {currentArch.nodes.length} Stages · Interactive Schematic
          </span>
        </div>

        {/* Pipeline Step Navigator */}
        <div className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-5 sm:gap-2">
          {currentArch.nodes.map((node, idx) => {
            const isSelected = selectedNodeIndex === idx;
            return (
              <button
                key={node.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedNodeIndex(idx)}
                className={`relative flex flex-col rounded-md border p-3 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-accent/80 bg-surface/90 shadow-[0_0_15px_rgba(201,138,59,0.1)]"
                    : "border-line/60 bg-surface/30 hover:border-line hover:bg-surface/60"
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className={isSelected ? "text-accent font-semibold" : "text-[#6b6350]"}>
                    0{idx + 1}
                  </span>
                  <span className="text-[#6b6350] truncate">{node.type}</span>
                </div>
                <div className="mt-2 truncate font-mono text-[11px] font-medium text-paper">
                  {node.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Node Inspector Details */}
        <div className="rounded-lg border border-line/50 bg-[#0d0c0b] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/40 pb-3 font-mono">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm font-medium text-paper">{currentNode.label}</span>
              <span className="text-xs text-[#6b6350]">({currentNode.type})</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-dim">
                Mode: <span className="text-accent">{currentNode.execution}</span>
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#6b6350] block mb-1">
                System Role & Execution
              </span>
              <p className="text-[13px] leading-relaxed text-dim">
                {currentNode.role}
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent-dim block mb-1">
                Fault Tolerance & Error Boundary
              </span>
              <p className="text-[13px] leading-relaxed text-dim">
                {currentNode.fallback}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-line/30 pt-3 font-mono text-[11px]">
            <span className="text-[#6b6350] uppercase text-[10px]">Stack:</span>
            <span className="text-accent/90">{currentNode.tech}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
