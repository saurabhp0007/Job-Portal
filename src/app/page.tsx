import Banner from "@/components/home/Banner";
import RecentJob from "@/components/home/RecentJob";
import TrustUs from "@/components/home/TrustUs";
import Feature from "@/components/shared/feature";
import Category from "@/components/shared/Category";
import Container from "@/components/shared/Container";



export default function Home() {

  return (

    <main className=" mt-16">
      <Container>
        {/* banner start here */}
        <Banner />

        {/* category start here */}
        <Category />

        {/* recent job state here */}

        <RecentJob />

        {/* feature state here*/}
        <Feature />
      </Container>


      {/* trust us state here */}
      <TrustUs />
    </main>
  )
}
