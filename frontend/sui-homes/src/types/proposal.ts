interface Proposal {
    id: string; 
    description: string; 
    positive_vote_count: number; 
    negative_vote_count: number; 
    status: number; 
    budget_allocation: number; 
    deadline: number; 
}
export type { Proposal };