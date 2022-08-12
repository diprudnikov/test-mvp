export function calculateChange(amount) {
    const coins = [100, 50, 20, 10 , 5];
    let change = amount;
    const result = [];
    let index = 0;

    while (change !== 0) {
        const coin = coins[index];
        if (change >= coin) {
            change -= coin;
            result.push(coin);
        } else if (change < coin) index++;
    }

    return result;
}
