export const DataCurrency = ({ Data }) => {
    return (
        Data.map((curr) => {
            const { currency, exchangeRate, buy, sell } = curr;

            return (
                <tr>
                    <td>{currency}</td>
                    <td>{buy}</td>
                    <td>{exchangeRate}</td>
                    <td>{sell}</td>
                </tr>
            )
        })
    )
}