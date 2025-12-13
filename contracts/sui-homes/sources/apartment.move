//The apartment module represents an individual apartment within a building in order to participate in the Sui Homes ecosystem.
//An apartment can cast votes, pay fees, see new announcements, and more.
module sui_homes::apartment;



/// A struct representing an Apartment with a unique identifier and an address.
public struct Apartment has key, store {
    id: UID,
    owner: address,
    number: u64,
    has_fees_paid: bool,
}

/// Initializes a new Apartment object with the given owner.
public fun create_apartment(owner: address, ctx: &mut TxContext): Apartment {
    let apartment = Apartment {
        id: object::new(ctx),
        owner: owner,
        number: 0,
        has_fees_paid: false,
    };
    apartment
}

//Getters

//Gets the ID of the Home
public fun get_id(home: &Apartment): ID {
    home.id.to_inner()
}

//Gets the owner of the Apartment
public fun get_owner(apartment: &Apartment): address {
    apartment.owner
}

//Gets the number of the Apartment
public fun get_number(apartment: &Apartment): u64 {
    apartment.number
}

//Checks if the fees for the Apartment have been paid
public fun are_fees_paid(apartment: &Apartment): bool {
    apartment.has_fees_paid
}


public fun delete_apartment(apartment: Apartment) {
    let Apartment{
        id, owner:_,number:_, has_fees_paid:_
    }= apartment;
    object::delete(id);
}