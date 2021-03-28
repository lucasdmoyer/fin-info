interface StockData {
    High?: number;
    Low?: number;
    Open?: number;
    Close?: number;
    Volume?: number; 
    Adj Close: number;
simple_returns? : number;
log_returns? : number;
cum_daily_return? : number;
ds? : number; 
 trend : number;
yhat_lower ?: number;
yhat_upper ?: number;
trend_lower ?: number;
trend_upper ?: number;
additive_terms ?: number;
additive_terms_lower ?: number;
additive_terms_upper ?: number;
self_define_cycle ?: number;
self_define_cycle_lower ?: number;
self_define_cycle_upper ?: number;
multiplicative_terms ?: number;
multiplicative_terms_lower ?: number;

multiplicative_terms_upper ?: number;
yhat ?: number;
Date ? : string;
}