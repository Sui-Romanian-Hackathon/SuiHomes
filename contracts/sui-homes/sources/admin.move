module sui_homes::admin;


use sui::tx_context::{sender};

public struct Admin has key {
    id: UID,
}

public struct AdminCap has key, store {
    id: UID,
}

fun init(ctx: &mut TxContext) {
    let admin_cap = AdminCap {
        id: object::new(ctx),
    };
    transfer::transfer(admin_cap, sender(ctx));
}

/// Adds a new admin
public fun setup_admin(ctx: &mut TxContext) {
    let admin = Admin {
        id: object::new(ctx),
    };
    transfer::transfer(admin, sender(ctx));
}

/// Adds a new admin
public fun add_admin(_: &Admin, recipient: address, ctx: &mut TxContext) {
    let new_admin = Admin {
        id: object::new(ctx)
    };
    transfer::transfer(new_admin, recipient);
}

/// Removes an admin///
public fun remove_admin(admin: Admin) {
    let Admin { id } = admin;
    object::delete(id);
}
