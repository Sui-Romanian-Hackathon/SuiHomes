//The registry module is used by the users to cast votes for building decisions and manage their apartments within the Sui Homes ecosystem.
//It maintains a registry of apartments and their associated owners.
//if an apartment has paid its fees, it can participate in voting on building matters.
module sui_homes::registry;

use sui::object_table::{Self, ObjectTable};
use sui::clock::Clock;

use std::string::String;

//constants
const VOTING_PERIOD: u64 = 7 * 24 * 60 * 60; // 7 days in seconds
const PROPOSAL_ACTIVE: u8 = 0;
const PROPOSAL_ACCEPTED: u8 = 1;
const PROPOSAL_REJECTED: u8 = 2;


public struct Registry has key, store {
    id: UID,    
    proposals: ObjectTable<ID, Proposal>,

}

public struct Proposal has key, store {
    id: UID,
    description: String,
    positive_vote_count: u64,
    negative_vote_count: u64,
    status: u8,
    budget_allocation: u64,
    deadline: u64,
}


/// Initializes a new Registry object with a unique identifier and an empty proposal table.
/// Returns the newly created Registry object.
public fun create_registry(ctx: &mut TxContext): Registry {
    let registry = Registry {
        id:object::new(ctx),
        proposals: object_table::new(ctx),
    };
    registry
}

//Getters


public fun get_proposals(registry: &Registry): &ObjectTable<ID, Proposal> {
    &registry.proposals
}


//Gets a specific proposal by its ID
public fun get_proposal_by_id(registry: &Registry, id: ID): &Proposal {
    let proposal =&registry.proposals[id];
    proposal
}

//Adds a new proposal to the Registry
public fun add_proposal(
    registry: &mut Registry,
    description: String,
    budget_allocation: u64,
    ctx: &mut TxContext,
    clock: &Clock,
) {
    let proposal = Proposal {
        id: object::new(ctx),
        description,
        positive_vote_count: 0,
        negative_vote_count: 0,
        status: PROPOSAL_ACTIVE,
        budget_allocation,
        deadline: clock.timestamp_ms() + VOTING_PERIOD,
    };
    let id = proposal.id.to_inner();
    registry.proposals.add(id, proposal);
}
//Casts a vote for a specific proposal
public fun cast_vote(
    registry: &mut Registry,
    proposal_id: ID,
    in_favor: bool,
) {
    let proposal = &mut registry.proposals[proposal_id];
    if (in_favor) {
        proposal.positive_vote_count = proposal.positive_vote_count + 1;
    } else {
        proposal.negative_vote_count = proposal.negative_vote_count + 1;
    }
}

//Updates the status of a proposal based on the votes and deadline
public fun update_proposal_status(
    registry: &mut Registry,
    proposal_id: ID,
    clock: &Clock,
) {
    let proposal = &mut registry.proposals[proposal_id];
    let current_time = clock.timestamp_ms();
    if (proposal.status == PROPOSAL_ACTIVE) {
        if (current_time >= proposal.deadline) {
            if (proposal.positive_vote_count > proposal.negative_vote_count) {
                proposal.status = PROPOSAL_ACCEPTED;
            } else {
                proposal.status = PROPOSAL_REJECTED;
            }
        }
    }
}


