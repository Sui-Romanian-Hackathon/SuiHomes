import { useMemo } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface Proposal {
  id: string;
  description: string;
  positive_vote_count: number;
  negative_vote_count: number;
  status: number; // 0 = Active, 1 = Passed, 2 = Rejected
  budget_allocation: number;
  deadline: number; // unix ms
}

// Mock data – replace with on-chain / API data
const proposals: Proposal[] = [
  {
    id: "1",
    description: "Allocate budget for elevator modernization.",
    positive_vote_count: 42,
    negative_vote_count: 8,
    status: 0,
    budget_allocation: 25000,
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: "2",
    description: "Install solar panels on rooftop.",
    positive_vote_count: 60,
    negative_vote_count: 15,
    status: 1,
    budget_allocation: 40000,
    deadline: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: "3",
    description: "Install a new security system.",
    positive_vote_count: 25,
    negative_vote_count: 10,
    status: 0,
    budget_allocation: 15000,
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 5,
  },
];

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleString();
}

function statusLabel(status: number) {
  switch (status) {
    case 0:
      return { text: "Active", color: "bg-blue-500/10 text-blue-400" };
    case 1:
      return { text: "Passed", color: "bg-green-500/10 text-green-400" };
    case 2:
      return { text: "Rejected", color: "bg-red-500/10 text-red-400" };
    default:
      return { text: "Unknown", color: "bg-neutral-500/10 text-neutral-400" };
  }
}

export default function ProposalsPage() {
  const sortedProposals = useMemo(() => {
    return [...proposals].sort((a, b) => b.deadline - a.deadline);
  }, []);

  const handleVote = (proposalId: string, vote: "yes" | "no") => {
    // TODO: Replace with Sui transaction
    console.log(`Vote ${vote} on proposal ${proposalId}`);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Proposals</h1>

        {sortedProposals.length === 0 ? (
          <div className="text-neutral-400 text-center py-20">
            No proposals available
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedProposals.map((proposal) => {
              const status = statusLabel(proposal.status);

              return (
                <div
                  key={proposal.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${status.color}`}
                      >
                        {status.text}
                      </span>

                      <span className="text-sm text-neutral-400">
                        Budget: ${proposal.budget_allocation.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-base leading-relaxed mb-4">
                      {proposal.description}
                    </p>

                    <div className="text-sm text-neutral-400 space-y-1">
                      <div>Deadline: {formatDate(proposal.deadline)}</div>
                      <div className="flex gap-4">
                        <span className="text-green-400">
                          Yes: {proposal.positive_vote_count}
                        </span>
                        <span className="text-red-400">
                          No: {proposal.negative_vote_count}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Voting buttons */}
                  {proposal.status === 0 && (
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => handleVote(proposal.id, "yes")}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600/20 hover:bg-green-600/30 text-green-400 py-2 transition"
                      >
                        <ThumbsUp size={18} />
                        Vote Yes
                      </button>

                      <button
                        onClick={() => handleVote(proposal.id, "no")}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 transition"
                      >
                        <ThumbsDown size={18} />
                        Vote No
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
