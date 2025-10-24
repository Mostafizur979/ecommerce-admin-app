export default function Table({ data, columns } : {data:any, columns:any}) {
    return (
        <div>
            <table className="min-w-full  -gray-300 text-sm bg-white">
                <thead className="">
                    <tr className="border border-gray-300">
                        {columns?.map((column: any, idx: any) => (
                            <td key={idx} className={`px-3 py-2 ${column?.className && column?.className}`}>{column?.title}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item: any, index: any) => (
                        <tr key={index} className={`border border-gray-300 bg-blue-300 ${index % 2 == 0 ? 'bg-white' : 'bg-gray-500'}`}>
                            {columns?.map((column: any, idx: any) => (
                                <td className={`px-3 py-1 ${column?.className && column?.className}`}>{item[column.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}