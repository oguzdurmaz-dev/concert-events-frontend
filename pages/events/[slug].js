import Layout from "../../components/Layout"
import { useRouter } from 'next/router'


export default function EventPage() {
    const router = useRouter();
    console.log(router)

   const clickHandler=()=>{
     
       localStorage.clear()
      
   

    }

    return (
        <Layout>
            <h1>My event page</h1>
      
            <button onClick={()=>clickHandler()}>bas</button>
        </Layout>
    )
}
