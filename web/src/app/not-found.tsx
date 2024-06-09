import Image from 'next/image';
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <center>
        <p>指定したページが見つかりません</p>
        <Link href="/">
          トップに戻る
        </Link>
      </center>
    </div>
  )
}