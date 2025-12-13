//The board module represents a communal board within a building in order to post and view announcements in the Sui Homes ecosystem.
module sui_homes::board;

use sui::clock::Clock;
use sui::object_table::{Self, ObjectTable};

use std::string::String;

public struct Board has key, store {
    id: UID,
    // reviews: ObjectTable<ID, Review>,
    announcements: ObjectTable<ID, Announcement>,
}

public struct Announcement has key, store {
    id: UID,
    message: String,
    timestamp: u64,
}

//Creates a new Board object with a unique identifier and an empty announcement table.
public fun create_board(ctx: &mut TxContext): Board {
    let board = Board {
        id: object::new(ctx),
        announcements: object_table::new(ctx),
    };
    board
}



public fun create_announcement(
    content: String,
    clock: &Clock,    
    ctx: &mut TxContext,
): Announcement {
    let announcement = Announcement {
        id: object::new(ctx),
        message: content,
        timestamp: clock.timestamp_ms(),
    };
    announcement
}


//Posts a new announcement to the Board
public fun post_announcement(
    board: &mut Board,
    announcement: Announcement,
) {
    let id = announcement.id.to_inner();
    board.announcements.add(id, announcement);
}


//Retrieves an announcement from the Board by its ID