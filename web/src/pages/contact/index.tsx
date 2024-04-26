import { useRef, FormEvent, useState } from "react";
import { Toast } from 'flowbite-react';
import { HiCheck } from "react-icons/hi";

function Contact() {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const [isSuccess, setIsSuccess] = useState<Boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data = {
            name: nameRef.current?.value ?? "",
            email: emailRef.current?.value ?? "",
            subject: subjectRef.current?.value ?? "",
            message: messageRef.current?.value ?? "",
        };
        console.log("data", data);

        await fetch("/api/sendmail", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.status === 200) {
                setIsSuccess(true);
                nameRef.current!.value = ""
                emailRef.current!.value = ""
                subjectRef.current!.value = ""
                messageRef.current!.value = ""
                console.log("メース送信成功");
            }
        });
    };

    const closeModal = (event: React.MouseEvent<HTMLSpanElement>) => {
        setIsSuccess(false)
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            {isSuccess ?
                <Toast className='fixed top-2/4 left-1/3 z-50 py-9'>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">メールを送信しました</div>
                    <Toast.Toggle onClick={closeModal} />
                </Toast> : null

            }
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl mb-4 text-gray-800 text-center text-bold">お問い合わせ</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            件名
                        </label>
                        <input
                            type="text"
                            className="form-control text-gray-800 w-full"
                            id="subject"
                            required
                            ref={subjectRef}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            名前
                        </label>
                        <input
                            type="text"
                            className="form-control text-gray-800 w-full"
                            id="name"
                            required
                            ref={nameRef}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            メールアドレス
                        </label>
                        <input
                            type="email"
                            className="form-control text-gray-800 w-full"
                            id="name"
                            required
                            ref={emailRef}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            内容
                        </label>
                        <textarea
                            className="form-control text-gray-800 w-full"
                            id="name"
                            required
                            ref={messageRef}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                    >
                        送信
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact;

