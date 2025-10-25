'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Table from "@/components/custom/custom-table";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import CustomFilter from "@/components/custom/custom-filter";
import { FaPlus } from "react-icons/fa6";
import { PiPrinter } from "react-icons/pi";


async function getcategories() {
    const result = await fetch("http://127.0.0.1:8000/api/category/");
    if (!result.ok) {
        throw new Error("There was an error fetching categories");
    }
    return result.json();
}

export default function CategoryListContainer() {
    const [categories, setcategories] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('http://127.0.0.1:8000/api/category/', {
                    method: 'GET',
                    headers: {
                        'X-API-KEY': 'mysecretkey123',
                    },
                });
                const data = await res.json();
                const categories = data?.map((data: any, idx: any) => ({
                    sl: idx + 1,
                    code: data?.id,
                    name: <div className=" px-3 py-1 flex items-center gap-3">
                        <div className="relative h-12 w-12">
                            <Image
                                src={`data:image/png;base64,${data?.image}`}
                                alt={data?.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p>{data?.name}</p>
                    </div>,
                    status: data?.status,
                    createdDate: data?.CreatedOn,
                    createdBy: data?.createdBy,
                    action: <div className="flex justify-end"><FiMoreHorizontal className="text-end" /></div>

                }))
                setcategories(categories);
            } catch (err) {
                setError("Failed to fetch categories");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const columns = [
        {
            title: '#',
            key: 'sl'
        },
        {
            title: 'Code',
            key: 'code'
        },
        {
            title: 'Category Name',
            key: 'name'
        },
        {
            title: 'Status',
            key: 'status'
        },
        {
            title: 'Created On',
            key: 'createDate',
        },
        {
            title: 'Created By',
            key: 'createdBy'
        },
        {
            title: 'Action',
            key: 'action',
            align: 'right'
        }
    ]

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="">
            <div className="">
                <CustomFilter
                    filterProps={[
                        { type: 'search', handleChange: () => { }, value: '' }, { type: 'select', handleChange: () => { }, value: '', options: [{ label: 'label', value: 'value' }] }
                    ]}
                    buttonProps={[
                        {
                            label: <div className="flex gap-2"><FaPlus size={20} /><p>Product</p></div>,
                            handleClick: () => { }
                        },
                        {
                            label: <PiPrinter size={20} />,
                            handleClick: () => { }
                        }
                    ]}
                />
            </div>

            <Table
                data={categories}
                columns={columns} />
        </div>
    );
}
