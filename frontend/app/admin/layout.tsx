'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
//
// export default function  adminLayout({children}: {
//     children: React.ReactNode
// }) {
//     const router = useRouter();
//
//     useEffect(()=>{
//         const token = localStorage.getItem("loginToken");
//         if (!token) {
//             router.push("/login");
//         }
//     },[router]);
//     return <>{children}</>;
// }

export default function adminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
