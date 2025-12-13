//Building module encapsulates the logic for managing buildings within the Sui Homes ecosystem.
//It interacts with other modules such as Registry, Board, and Treasury to facilitate building operations,
//including proposal management, voting, and fund allocation.
module sui_homes::building;

use sui::object_table::ObjectTable;

use sui_homes::apartment::Apartment;
use sui_homes::board::Board;
use sui_homes::registry::Registry;
use sui_homes::treasury::Treasury;

public struct Building has key, store {
    id: UID,
    registry: Registry,
    board: Board,
    treasury: Treasury,
    apartments: ObjectTable<ID, Apartment>,
}

/// Initializes a new Building object with associated Registry, Board, and Treasury.
public fun create_building(
    ctx: &mut TxContext,
    registry: Registry,
    board: Board,
    treasury: Treasury,
    apartments: ObjectTable<ID, Apartment>,
): Building {
    let building = Building {
        id: object::new(ctx),
        registry,
        board,
        treasury,
        apartments,
    };
    building
}

//Getters
//Gets the ID of the Building
public fun get_id(building: &Building): ID {
    building.id.to_inner()
}

//Gets the Registry associated with the Building
public fun get_registry(building: &Building): &Registry {
    &building.registry
}

//Gets the Board associated with the Building
public fun get_board(building: &Building): &Board {
    &building.board
}

//Gets the Treasury associated with the Building
public fun get_treasury(building: &Building): &Treasury {
    &building.treasury
}

//Gets the apartments in the Building
public fun get_apartments(building: &Building): &ObjectTable<ID, Apartment> {
    &building.apartments
}

//Adds a new apartment to the Building's apartment table
public fun add_apartment(building: &mut Building, apartment: Apartment) {
    let id = apartment.get_id();
    building.apartments.add(id, apartment);
}

//Removes an apartment from the Building's apartment table
public fun remove_apartment(building: &mut Building, apartment_id: ID) {
    building.apartments.remove(apartment_id).delete_apartment();
}

//Checks if an apartment is eligible to vote based on fee payment status
public fun is_apartment_eligible_to_vote(apartment: &Apartment): bool {
    apartment.are_fees_paid()
}
