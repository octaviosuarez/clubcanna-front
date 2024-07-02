import { capitalize } from "../../utils/functions"

const List = ({ columns, data }) => {
    return (
        <div className="w-full overflow-x-auto rounded-sm">
            <table className="min-w-full border border-gray-200 rounded-md">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th className="px-4 py-2 border-b" key={column}>{capitalize(column)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            {columns.map((column) => (
                                <td className="px-4 py-2 text-center border-b" key={column}>{row[column]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default List