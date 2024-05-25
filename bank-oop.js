class Customer {
    constructor(firstName, lastName, address, phoneNumber) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._address = address;
        this._phoneNumber = phoneNumber;
    }
    set firstName(firstName) {
        this._firstName = firstName;
    }
    get firstName() {
        return this._firstName;
    }
    set lastName(lastName) {
        this._lastName = lastName;
    }
    get lastName() {
        return this._lastName;
    }
    set address(address) {
        this._address = address;
    }
    get address() {
        return this._address;
    }
    set phoneNumber(phoneNumber) {
        this._phoneNumber = phoneNumber;
    }
    get phoneNumber() {
        return this._phoneNumber;
    }
}

class Account {
    constructor(owner, active = true, balance = 0.00) {
        this._owner = owner;
        this._active = active;
        this._balance = balance;
    }
    set accountNumber(number) {
        this._accountNumber = number;
    }
    get accountNumber() {
        return this._accountNumber;
    }
    set owner(name) {
        this._owner = name;
    }
    get owner() {
        return this._owner;
    }
    set active(yes) {
        this._active = yes;
    }
    get active() {
        return this._active;
    }
    set balance(number) {
        this._balance = number;
    }
    get balance() {
        return this._balance;
    }
}

class Bank {
    constructor(name, address) {
        this.name = name;
        this.address = address;
        this.customers = {};
        this.accounts = {};
    }

    registerCustomer(firstName, lastName, address, phoneNumber) {
        if (!(phoneNumber in this.customers)) {
            this.customers[phoneNumber] = new Customer(firstName, lastName, address, phoneNumber);
        }
    }

    createAccount(customer) {
        if (!(customer.phoneNumber in this.accounts)) {
            let account = new Account(customer);
            this.accounts[customer.phoneNumber] = account;
            return account;
        } else {
            return null;
        }
    }

    debitAccount(account, amount) {
        if (account === null) return false;
        if (account.balance >= amount) {
            account.balance -= amount;
            return true;
        } else {
            return false;
        }
    }

    creditAccount(account, amount) {
        if (account === null) return false;
        account.balance += amount;
        return true;
    }

    giveLoan(account, amount) {
        return this.creditAccount(account, amount);
    }
}

let bank = new Bank("Skye Bank", "123 Main St");
bank.registerCustomer("Basirat", "Usman", "Main Street", "08166666");
let customer = bank.customers["08166666"];
let newAccountCreated = bank.createAccount(customer);
bank.creditAccount(newAccountCreated, 1000);
console.log(bank.debitAccount(newAccountCreated, 100));
