import Layout from "@/components/Layout"
import { useRouter } from 'next/router'

export default function EventPage() {
    const router = useRouter();
    console.log(router)

    return (
        <Layout>
            <h1>My event page</h1>
         
        </Layout>
    )
}
