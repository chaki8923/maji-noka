
import { trpc } from '../../utils/trpc';
import { useSession } from 'next-auth/react';
import { Table } from "flowbite-react";
import Loading from '../_component/loading';
import Link from "next/link";
import { Button } from 'flowbite-react';

export default function Purchase() {
    const { data: session }: any = useSession();
    const deleteMuration = trpc.purchase.deletePurchase.useMutation();

    const { data: purchases } =
        trpc.purchase.getPurchaseByUserId.useQuery({ customerId: session?.user.id });
    // ToDoを削除する処理
    const deletePurchase = async (id: string) => {
        try {
            // deleteTodoエンドポイントを呼び出して指定したIDのToDoを削除
            await deleteMuration.mutateAsync({ id });

            // アラートで削除を通知
            alert("削除しました");
        } catch (error) {
            // エラーハンドリング
            console.error(error);
        }
    };

    if (!purchases) {
        return <Loading />
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>Product name</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>PayTs</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">show</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">delete</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {purchases.map((purchase, index) => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {purchase.item.name}
                            </Table.Cell>
                            <Table.Cell>{purchase.item.price}</Table.Cell>
                            <Table.Cell>{purchase.createdAt}</Table.Cell>
                            <Table.Cell>
                                <Link href={`item/${purchase.item.id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    商品ページへ
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                            <Button color="alert" onClick={() => deletePurchase(purchase.id)} className="w-[180px]" >
                                削除
                            </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}