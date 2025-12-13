module sui_homes::treasury;

use sui::balance::Balance;
use sui::coin::Coin;
use sui::sui::SUI;
use sui_homes::apartment::Apartment;

// Treasury is a module used to manage funds and expenses for Sui Homes
public struct Treasury has key, store {
    id: UID,
    balance: Balance<SUI>,
    expenses: vector<Expense>,
}

public struct Expense has copy, drop, store {
    description: vector<u8>,
    amount: u64,
    date: u64,
}

/// Initializes a new Treasury object with a zero balance.
public fun create_treasury(ctx: &mut TxContext, coin: Coin<SUI>): Treasury {
    let treasury = Treasury {
        id: object::new(ctx),
        balance: coin.into_balance(),
        expenses: vector::empty<Expense>(),
    };
    treasury
}

//Getters
//Gets the ID of the Treasury
public fun get_id(treasury: &Treasury): ID {
    treasury.id.to_inner()
}

//Gets the balance of the Treasury
public fun get_balance(treasury: &Treasury): u64 {
    treasury.balance.value()
}

//Gets the list of expenses of the Treasury
public fun get_expenses(treasury: &Treasury): &vector<Expense> {
    &treasury.expenses
}

//Adds an expense to the Treasury and deducts the amount from the balance
public fun add_expense(treasury: &mut Treasury, description: vector<u8>, amount: u64, date: u64) {
    let expense = Expense {
        description,
        amount,
        date,
    };
    vector::push_back(&mut treasury.expenses, expense);
    let split_balance = treasury.balance.split(amount);
    sui::balance::destroy_zero(split_balance);
}

//Deposits an amount to the Treasury balance
public fun deposit(treasury: &mut Treasury, coin: Coin<SUI>) {
    let balance = coin.into_balance();
    treasury.balance.join(balance);
}

//Checks if an apartment is eligible to vote based on fee payment status
public fun is_apartment_eligible_to_vote(apartment: &Apartment): bool {
    apartment.are_fees_paid()
}
