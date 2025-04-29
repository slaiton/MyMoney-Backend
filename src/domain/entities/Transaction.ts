export interface Transaction {
    id: Number,
    title: String,
    description: String,
    category_id: Number,
    amount: Number,
    note?: String,
    user_create_id: Number,
    payment_type_id: Number,
    saving_id: Number,
    loan_id: Number
}