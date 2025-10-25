export default function Table({ data, columns }: { data: any, columns: any }) {
    return (
        <div className="bg-white shadow-sm">
            <table className="min-w-full text-[14px] bg-white">
                <thead className="">
                    <tr className="border border-gray-200 bg-gray-200">
                        {columns?.map((column: any, idx: any) => (
                            <td
                                key={idx}
                                style={{
                                    width: column?.width,
                                    textAlign: column?.align
                                }}
                                className="px-3 py-2 font-semibold">
                                {column?.title}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item: any, index: any) => (
                        <tr key={index} className={`border border-gray-200 ${index % 2 == 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            {columns?.map((column: any, idx: any) => (
                                <td
                                    key={idx}
                                    style={{
                                        width: column?.width,
                                        textAlign: column?.align
                                    }}
                                    className="px-3">
                                    {item[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}